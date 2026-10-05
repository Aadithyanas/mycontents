import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';
import { mockUsers } from '@/lib/mock/users';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json({
        authenticated: false,
        user: null,
        role: 'GUEST',
      });
    }

    const payload = await verifyToken(token);

    if (!payload) {
      return NextResponse.json({
        authenticated: false,
        user: null,
        role: 'GUEST',
      });
    }

    const user = mockUsers.find((u) => u.id === payload.userId) || {
      id: payload.userId,
      name: payload.name,
      email: payload.email,
      role: payload.role,
      image: payload.image,
    };

    return NextResponse.json({
      authenticated: true,
      user,
      role: user.role,
    });
  } catch (error) {
    console.error('Session verification error:', error);
    return NextResponse.json({ authenticated: false, user: null, role: 'GUEST' });
  }
}
