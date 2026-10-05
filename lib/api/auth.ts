import { User, Role } from '@/types';
import { LoginInput, RegisterInput } from '@/lib/auth/validation';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  role: Role;
  loading: boolean;
}

export const authApi = {
  async getSession(): Promise<{ user: User | null; authenticated: boolean; role: Role }> {
    try {
      const res = await fetch('/api/auth/session', { cache: 'no-store' });
      if (!res.ok) throw new Error('Session fetch failed');
      return await res.json();
    } catch {
      return { user: null, authenticated: false, role: 'GUEST' };
    }
  },

  async login(data: LoginInput): Promise<{ user: User }> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.error || 'Login failed');
    }
    return result;
  },

  async register(data: RegisterInput): Promise<{ user: User }> {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.error || 'Registration failed');
    }
    return result;
  },

  async logout(): Promise<void> {
    await fetch('/api/auth/logout', { method: 'POST' });
  },
};
