import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth/jwt';
import { securityApi } from '@/lib/api/security';

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('auth_token')?.value;
    const clientIp = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const userAgent = request.headers.get('user-agent') || 'Browser Client';

    if (token) {
      const payload = await verifyToken(token);
      if (payload) {
        await securityApi.logEvent({
          userId: payload.userId,
          userName: payload.name,
          ipAddress: clientIp,
          userAgent,
          action: 'LOGOUT',
          event: `User ${payload.name} explicitly logged out`,
          severity: 'INFO',
          status: 'SUCCESS',
          details: 'Session token invalidated and cookie cleared',
        });
      }
    }

    const response = NextResponse.json({ message: 'Logged out successfully' });

    // Clear auth cookie
    response.cookies.set({
      name: 'auth_token',
      value: '',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
