'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ShieldCheck, Lock, Mail, ArrowRight, ArrowLeft, KeyRound, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, role, logout } = useAuth();

  const [email, setEmail] = useState('aadithyan@creatorstudio.dev');
  const [password, setPassword] = useState('Admin@12345');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const success = await login({ email, password });

    if (success) {
      // Check if user is actually admin
      if (email.toLowerCase() === 'aadithyan@creatorstudio.dev' || role === 'ADMIN') {
        toast.success('Administrator authenticated successfully');
        router.push('/admin');
      } else {
        await logout();
        setError('Access denied. This login portal is strictly reserved for the platform administrator.');
      }
    } else {
      setError('Invalid administrator credentials. Please check your email and password.');
    }

    setLoading(false);
  };

  const handleAutofill = () => {
    setEmail('aadithyan@creatorstudio.dev');
    setPassword('Admin@12345');
    toast.info('Admin credentials auto-filled');
  };

  return (
    <div className="min-h-screen bg-[#07080b] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3 relative z-10">
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-purple-500/50 ring-4 ring-purple-500/20 mx-auto shadow-2xl shadow-purple-500/30 bg-black">
          <Image
            src="/images/logo.jpeg"
            alt="NEUTRAL_FX Logo"
            fill
            className="object-cover"
            priority
          />
        </div>
        <span className="text-[11px] font-mono font-bold tracking-widest text-amber-400 uppercase px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20">
          URL-Based Administrator Portal
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Administrator Sign In
        </h1>
        <p className="text-xs text-zinc-400 max-w-sm mx-auto">
          Dedicated access portal for platform administrator and content owner <strong className="text-zinc-200">Aadithyan A.S.</strong>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="p-8 rounded-3xl glass-dropdown border border-white/10 shadow-2xl space-y-6">
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
              {error}
            </div>
          )}

          {/* Quick Autofill Helper for convenience */}
          <div className="p-3.5 rounded-xl bg-zinc-900/70 border border-amber-500/20 text-xs flex items-center justify-between gap-2">
            <div>
              <div className="font-semibold text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Default Admin Credentials
              </div>
              <div className="text-[11px] text-zinc-400 mt-0.5 font-mono">
                aadithyan@creatorstudio.dev
              </div>
            </div>
            <button
              type="button"
              onClick={handleAutofill}
              className="px-2.5 py-1.5 rounded-lg text-[11px] font-semibold bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 transition cursor-pointer"
            >
              Autofill
            </button>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-zinc-300 font-medium mb-1.5">
                Administrator Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@creatorstudio.dev"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500 transition text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-zinc-300 font-medium mb-1.5">
                Administrator Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator password"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white placeholder:text-zinc-600 focus:outline-none focus:border-amber-500 transition text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 px-4 rounded-xl font-bold bg-amber-500 text-black hover:bg-amber-400 transition shadow-lg shadow-amber-500/20 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer text-xs"
            >
              {loading ? 'Authenticating...' : 'Sign In as Administrator'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 hover:text-white transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Public Website
            </Link>
            <Link href="/login" className="hover:text-amber-400 transition">
              Standard User Login &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
