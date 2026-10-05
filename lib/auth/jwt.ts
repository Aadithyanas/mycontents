import { SignJWT, jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode(
  process.env.AUTH_SECRET || 'dev-insecure-secret-key-32-chars-long-minimum-prod-use-openssl'
);

export interface TokenPayload {
  userId: string;
  email: string;
  name: string;
  role: 'GUEST' | 'USER' | 'CREATOR' | 'ADMIN';
  image?: string;
}

export async function signToken(payload: TokenPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(SECRET_KEY);
}

export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload as unknown as TokenPayload;
  } catch {
    return null;
  }
}
