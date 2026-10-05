'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Lock } from 'lucide-react';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#07080b] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-amber-500/20 border-t-amber-500 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#07080b] flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 rounded-3xl glass-dropdown border border-white/10 text-center space-y-4 shadow-2xl">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mx-auto flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Authentication Required</h2>
          <p className="text-xs text-zinc-400 leading-relaxed">
            You must be signed in to view your dashboard, access tokens, and watermarked streams.
          </p>
          <div className="pt-2">
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-xs font-semibold bg-amber-500 text-black hover:bg-amber-400 transition shadow-lg shadow-amber-500/20"
            >
              Sign In to Your Account
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
