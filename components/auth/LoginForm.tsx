'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { GoogleLoginButton } from './GoogleLoginButton';
import { Mail, Lock, LogIn, Eye, EyeOff, ShieldCheck } from 'lucide-react';

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('aadithyan@creatorstudio.dev');
  const [password, setPassword] = useState('Admin@12345');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const success = await login({ email, password });
    if (success) {
      if (email.includes('admin') || email.includes('aadithyan')) {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    } else {
      setError('Invalid email or password. Please verify your credentials.');
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md p-8 rounded-3xl glass-dropdown border border-white/10 shadow-2xl space-y-6">
      {/* Header */}
      <div className="text-center space-y-1">
        <div className="relative w-14 h-14 rounded-full overflow-hidden border border-purple-500/40 ring-2 ring-purple-500/20 mx-auto mb-3 shadow-lg shadow-purple-500/25 bg-black">
          <Image
            src="/images/logo.jpeg"
            alt="NEUTRAL_FX Logo"
            fill
            className="object-cover"
            priority
          />
        </div>
        <h2 className="text-xl font-bold text-white tracking-tight">Sign In to Neutral_fx</h2>
        <p className="text-xs text-zinc-400">
          Enter your credentials to access protected video streams
        </p>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
          {error}
        </div>
      )}



      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-zinc-300 mb-1.5">Email Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900/90 border border-white/10 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500 transition"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-medium text-zinc-300">Password</label>
            <button
              type="button"
              onClick={() => alert('Password reset link will be sent to registered email.')}
              className="text-[11px] text-amber-400 hover:underline cursor-pointer"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-zinc-900/90 border border-white/10 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500 transition font-mono"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-500 hover:text-zinc-300 cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-amber-500 text-black hover:bg-amber-400 transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {loading ? 'Authenticating...' : 'Sign In'}
        </button>
      </form>

      {/* Divider */}
      <div className="relative flex items-center justify-center">
        <div className="border-t border-white/10 w-full" />
        <span className="bg-[#0e121a] px-3 text-[11px] text-zinc-500 uppercase tracking-wider font-mono">
          OR
        </span>
      </div>

      {/* Google OAuth Button */}
      <GoogleLoginButton />

      {/* Footer */}
      <p className="text-center text-xs text-zinc-400">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-amber-400 font-medium hover:underline">
          Register here
        </Link>
      </p>
    </div>
  );
}
