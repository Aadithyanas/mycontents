import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { registerSchema } from '@/lib/auth/validation';
import { signToken } from '@/lib/auth/jwt';
import { mockUsers } from '@/lib/mock/users';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = registerSchema.safeParse(body);

    if (!validated.success) {
      const errorMsg = Object.values(validated.error.flatten().fieldErrors).flat().join('. ');
      return NextResponse.json(
        { error: errorMsg || 'Validation failed', details: validated.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { fullName, email, password } = validated.data;

    // 1. Check if user already exists in DB or mock list
    let existingInDb = false;
    try {
      const dbFound = await prisma.user.findUnique({
        where: { email: email.toLowerCase() },
      });
      if (dbFound) existingInDb = true;
    } catch (e) {
      console.warn('Prisma check failed, falling back:', e);
    }

    const existingMock = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existingInDb || existingMock) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 });
    }

    // Hash password with bcryptjs (salt rounds 10)
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    let createdId = `usr-${Date.now().toString().slice(-4)}`;
    try {
      const dbCreated = await prisma.user.create({
        data: {
          name: fullName,
          email: email.toLowerCase(),
          passwordHash,
          role: 'USER',
          title: 'Registered Viewer',
          department: 'External Reviewer',
        },
      });
      createdId = dbCreated.id;
    } catch (dbCreateErr) {
      console.warn('Could not insert to Prisma directly:', dbCreateErr);
    }

    const newUser = {
      id: createdId,
      name: fullName,
      email: email.toLowerCase(),
      role: 'USER' as const,
      title: 'Registered Viewer',
      department: 'External Reviewer',
      createdAt: new Date().toISOString(),
    };

    // Add to in-memory mock users list for live session sync
    mockUsers.push(newUser);

    // Sign JWT
    const token = await signToken({
      userId: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    });

    const response = NextResponse.json(
      {
        message: 'Account created successfully',
        user: newUser,
      },
      { status: 201 }
    );

    // Set HTTP-only secure cookie
    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
