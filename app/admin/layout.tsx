'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { AdminSidebar } from '@/components/navigation/AdminSidebar';
import { useAuth } from '@/context/AuthContext';
import { ShieldAlert, ArrowLeft, KeyRound, Sparkles } from 'lucide-react';

import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { role } = useAuth();

  // Allow unauthenticated or non-admin to view /admin/login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // Route Gatekeeper / RBAC: Enforce Administrator Login
  if (role !== 'ADMIN') {
    return (
      <div className="flex flex-col min-h-screen bg-[#07080b]">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-md w-full p-8 rounded-3xl glass-dropdown border border-amber-500/30 text-center space-y-5 shadow-2xl animate-in fade-in-0">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mx-auto flex items-center justify-center">
              <KeyRound className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-amber-400 font-bold tracking-wider uppercase">
                ADMINISTRATOR ACCESS ONLY
              </span>
              <h2 className="text-2xl font-bold text-white tracking-tight">Admin Authentication Required</h2>
              <p className="text-xs text-zinc-400 leading-relaxed">
                This portal is strictly reserved for the platform owner (Aadithyan A.S.). Please log in using your administrator credentials.
              </p>
            </div>

            <div className="pt-2 space-y-3">
              <Link
                href="/admin/login"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold bg-amber-500 text-black hover:bg-amber-400 transition shadow-lg shadow-amber-500/20"
              >
                <KeyRound className="w-4 h-4" />
                Go to Administrator Login (/admin/login)
              </Link>

              <div>
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Return to Public Catalog
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#07080b]">
      <Navbar />
      <div className="flex-1 flex">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 max-w-[1600px] mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
