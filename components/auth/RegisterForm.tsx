'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { GoogleLoginButton } from './GoogleLoginButton';
import { User as UserIcon, Mail, Lock, UserPlus, Eye, EyeOff, CheckCircle2 } from 'lucide-react';

export function RegisterForm() {
  const router = useRouter();
  const { register } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Password strength calculation
  const calculateStrength = (pass: string) => {
    let score = 0;
    if (pass.length >= 6) score++;
    if (pass.length >= 8) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass) || /[A-Z]/.test(pass)) score++;

    if (score <= 1) return { label: 'Weak', color: 'bg-rose-500', width: 'w-1/4', text: 'text-rose-400' };
    if (score === 2) return { label: 'Fair', color: 'bg-amber-500', width: 'w-2/4', text: 'text-amber-400' };
    if (score === 3) return { label: 'Good', color: 'bg-blue-500', width: 'w-3/4', text: 'text-blue-400' };
    return { label: 'Strong', color: 'bg-emerald-500', width: 'w-full', text: 'text-emerald-400' };
  };

  const strength = calculateStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!agreeTerms) {
      setError('You must accept the terms of service and security policy');
      return;
    }

    setLoading(true);

    const result = await register({
      fullName,
      email,
      password,
      confirmPassword,
      agreeTerms,
    });

    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.error || 'Registration failed. Please check your details.');
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
        <h2 className="text-xl font-bold text-white tracking-tight">Create Viewer Account</h2>
        <p className="text-xs text-zinc-400">
          Register to explore and request verified access to protected media assets
        </p>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div>
          <label className="block text-xs font-medium text-zinc-300 mb-1">Full Name</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
              <UserIcon className="w-4 h-4" />
            </div>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-900/90 border border-white/10 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500 transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-300 mb-1">Email Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="rahul@example.com"
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-900/90 border border-white/10 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500 transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-300 mb-1">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 8 chars, 1 uppercase, 1 symbol"
              className="w-full pl-10 pr-10 py-2 rounded-xl bg-zinc-900/90 border border-white/10 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500 transition font-mono"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-500 hover:text-zinc-300 cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Password strength meter */}
          {password && (
            <div className="mt-2 space-y-1">
              <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                <div className={`h-full ${strength.color} ${strength.width} transition-all duration-300`} />
              </div>
              <div className="flex justify-between items-center text-[10px]">
                <span className="text-zinc-500">Password strength:</span>
                <span className={`font-semibold ${strength.text}`}>{strength.label}</span>
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-300 mb-1">Confirm Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-type password"
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-900/90 border border-white/10 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500 transition font-mono"
            />
          </div>
        </div>

        <div className="flex items-start gap-2 pt-1">
          <input
            type="checkbox"
            id="terms"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="mt-0.5 rounded border-white/20 bg-zinc-900 text-amber-500 focus:ring-amber-500 cursor-pointer"
          />
          <label htmlFor="terms" className="text-[11px] text-zinc-400 select-none">
            I agree to the <span className="text-zinc-200">Terms of Service</span>, <span className="text-zinc-200">Privacy Policy</span>, and consent to dynamic forensic watermarking during video playback.
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-amber-500 text-black hover:bg-amber-400 transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      {/* Divider */}
      <div className="relative flex items-center justify-center">
        <div className="border-t border-white/10 w-full" />
        <span className="bg-[#0e121a] px-3 text-[11px] text-zinc-500 uppercase tracking-wider font-mono">
          OR
        </span>
      </div>

      <GoogleLoginButton />

      <p className="text-center text-xs text-zinc-400">
        Already have an account?{' '}
        <Link href="/login" className="text-amber-400 font-medium hover:underline">
          Sign in here
        </Link>
      </p>
    </div>
  );
}
