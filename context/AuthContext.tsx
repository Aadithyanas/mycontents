'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, Role } from '@/types';
import { authApi } from '@/lib/api/auth';
import { mockUsers } from '@/lib/mock/users';
import { LoginInput, RegisterInput } from '@/lib/auth/validation';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  role: Role;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginInput) => Promise<boolean>;
  register: (data: RegisterInput) => Promise<{ success: boolean; error?: string }>;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => Promise<void>;
  switchDemoRole: (role: Role) => void;
  switchDemoUser: (userIdOrRole: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role>('GUEST');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Initialize from session cookie if present
  useEffect(() => {
    async function checkSession() {
      try {
        const session = await authApi.getSession();
        if (session.authenticated && session.user) {
          setUser(session.user);
          setRole(session.role);
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error('Session init error:', err);
      }
    }
    checkSession();
  }, []);

  const login = useCallback(async (data: LoginInput): Promise<boolean> => {
    setIsLoading(true);
    try {
      const res = await authApi.login(data);
      setUser(res.user);
      setRole(res.user.role);
      setIsAuthenticated(true);
      toast.success(`Welcome back, ${res.user.name}!`);
      return true;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid credentials';
      toast.error(msg);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (data: RegisterInput): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    try {
      const res = await authApi.register(data);
      setUser(res.user);
      setRole(res.user.role);
      setIsAuthenticated(true);
      toast.success(`Account registered successfully. Welcome, ${res.user.name}!`);
      return { success: true };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Registration failed';
      toast.error(msg);
      return { success: false, error: msg };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loginWithGoogle = useCallback(async (): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate Google OAuth OpenID Connect callback delay
      await new Promise((r) => setTimeout(r, 600));

      const googleUser: User = {
        id: 'usr-google-demo',
        name: 'Aadithyan (Google)',
        email: 'aadithyan.media@gmail.com',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
        role: 'USER',
        title: 'Google OAuth Verified Viewer',
        department: 'External Media Partner',
        createdAt: new Date().toISOString(),
      };

      setUser(googleUser);
      setRole('USER');
      setIsAuthenticated(true);
      toast.success('Successfully authenticated via Google OpenID Connect');
      return true;
    } catch {
      toast.error('Google authentication failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // ignore
    }
    setUser(null);
    setRole('GUEST');
    setIsAuthenticated(false);
    toast.info('You have been signed out');

    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path.startsWith('/dashboard') || path.startsWith('/admin')) {
        window.location.href = '/login';
      }
    }
  }, []);

  const switchDemoUser = useCallback((userIdOrRole: string) => {
    if (userIdOrRole === 'GUEST' || userIdOrRole === 'guest') {
      setUser(null);
      setRole('GUEST');
      setIsAuthenticated(false);
      toast.info('Switched to Guest mode (Unauthenticated Visitor)');
      return;
    }

    if (userIdOrRole === 'ADMIN' || userIdOrRole === 'usr-admin-1') {
      const adminUser = mockUsers.find((u) => u.role === 'ADMIN') || mockUsers[0];
      setUser(adminUser);
      setRole('ADMIN');
      setIsAuthenticated(true);
      toast.success(`Active Login: Portfolio Creator & Admin (${adminUser.name})`);
      return;
    }

    const targetUser = mockUsers.find((u) => u.id === userIdOrRole || u.email === userIdOrRole);
    if (targetUser) {
      setUser(targetUser);
      setRole(targetUser.role);
      setIsAuthenticated(true);
      toast.success(`Active Login: ${targetUser.name} (${targetUser.role})`);
    } else {
      const defaultUser = mockUsers.find((u) => u.role === 'USER') || mockUsers[1];
      setUser(defaultUser);
      setRole('USER');
      setIsAuthenticated(true);
      toast.success(`Active Login: ${defaultUser.name} (USER)`);
    }
  }, []);

  const switchDemoRole = useCallback((newRole: Role) => {
    if (newRole === 'GUEST') {
      switchDemoUser('GUEST');
    } else if (newRole === 'ADMIN') {
      switchDemoUser('ADMIN');
    } else {
      const standardUser = mockUsers.find((u) => u.role === 'USER') || mockUsers[1];
      switchDemoUser(standardUser.id);
    }
  }, [switchDemoUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated,
        isLoading,
        login,
        register,
        loginWithGoogle,
        logout,
        switchDemoRole,
        switchDemoUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
