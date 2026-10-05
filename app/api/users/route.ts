import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { mockUsers } from '@/lib/mock/users';
import { User } from '@/types';

// GET /api/users - Fetch all users dynamically from Render Cloud DB (fallback to mock)
export async function GET() {
  try {
    const dbUsers = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        title: true,
        bio: true,
        department: true,
        createdAt: true,
      },
    });

    if (dbUsers && dbUsers.length > 0) {
      const formatted: User[] = dbUsers.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        image: u.image || undefined,
        role: u.role as any,
        title: u.title || 'Viewer',
        bio: u.bio || undefined,
        department: u.department || undefined,
        createdAt: u.createdAt.toISOString(),
      }));
      return NextResponse.json({ users: formatted });
    }
  } catch (err) {
    console.warn('Prisma users fetch failed, falling back to mock:', err);
  }

  return NextResponse.json({ users: mockUsers });
}

// POST /api/users - Add a new dynamic user to Render PostgreSQL
// Note: Aadithyan A.S. is the SOLE ADMIN. All newly added users are locked to role: 'USER'.
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, title, department } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check if user already exists in PostgreSQL
    let existingUser = null;
    try {
      existingUser = await prisma.user.findUnique({
        where: { email: cleanEmail },
      });
    } catch (err) {
      console.warn('Prisma check failed:', err);
    }

    if (existingUser || mockUsers.some((u) => u.email.toLowerCase() === cleanEmail)) {
      return NextResponse.json(
        { error: 'A user with this email address already exists' },
        { status: 409 }
      );
    }

    // Hash password with bcrypt
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    let createdUser: User | null = null;

    try {
      const dbCreated = await prisma.user.create({
        data: {
          name: name.trim(),
          email: cleanEmail,
          passwordHash,
          role: 'USER', // Sole admin is Aadithyan A.S. All other users are USER (viewers/clients)
          title: title?.trim() || 'Viewer & Client',
          department: department?.trim() || 'External Registered Viewer',
        },
      });

      createdUser = {
        id: dbCreated.id,
        name: dbCreated.name,
        email: dbCreated.email,
        role: 'USER',
        title: dbCreated.title || 'Viewer & Client',
        department: dbCreated.department || undefined,
        createdAt: dbCreated.createdAt.toISOString(),
      };
    } catch (dbErr) {
      console.warn('Failed to insert directly to Prisma DB:', dbErr);
    }

    if (!createdUser) {
      createdUser = {
        id: `usr-${Date.now().toString().slice(-4)}`,
        name: name.trim(),
        email: cleanEmail,
        role: 'USER',
        title: title?.trim() || 'Viewer & Client',
        department: department?.trim() || 'External Registered Viewer',
        createdAt: new Date().toISOString(),
      };
    }

    // Sync in-memory mockUsers so the demo switcher updates immediately
    mockUsers.unshift(createdUser);

    return NextResponse.json(
      {
        message: 'User created successfully in database',
        user: createdUser,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create user error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while creating the user' },
      { status: 500 }
    );
  }
}

// DELETE /api/users?id=... - Delete user from PostgreSQL (prevents deleting sole admin)
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Protect sole Admin Aadithyan A.S.
    if (id === 'usr-admin-1') {
      return NextResponse.json(
        { error: 'Cannot delete the sole Platform Creator and Administrator account' },
        { status: 403 }
      );
    }

    try {
      const user = await prisma.user.findUnique({ where: { id } });
      if (user?.role === 'ADMIN' || user?.email === 'aadithyan@creatorstudio.dev') {
        return NextResponse.json(
          { error: 'Cannot delete the platform Administrator' },
          { status: 403 }
        );
      }

      await prisma.user.delete({
        where: { id },
      });
    } catch (dbErr) {
      console.warn('Prisma delete failed:', dbErr);
    }

    // Also remove from in-memory mockUsers
    const idx = mockUsers.findIndex((u) => u.id === id);
    if (idx !== -1) {
      mockUsers.splice(idx, 1);
    }

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
