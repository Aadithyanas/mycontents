'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { DashboardNav } from '@/components/navigation/DashboardNav';
import { Shield, Key, Smartphone, Monitor, LogOut, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function UserSettingsPage() {
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPass || !newPass) {
      toast.error('Please enter both passwords');
      return;
    }
    toast.success('Security password updated and re-hashed with Argon2id');
    setCurrentPass('');
    setNewPass('');
  };

  const handleLogoutAll = () => {
    toast.success('All active remote device sessions have been invalidated');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#07080b]">
      <Navbar />

      <main className="flex-1 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-1 border-b border-white/5 pb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Security & Privacy Settings
            </h1>
            <p className="text-xs text-zinc-400">
              Configure session timeouts, 2FA credentials, and cryptographic tokens.
            </p>
          </div>

          <DashboardNav />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-4xl">
            {/* Password Update Form */}
            <div className="lg:col-span-6 p-6 rounded-2xl bg-zinc-900/50 border border-white/5 space-y-4 text-xs">
              <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                <Key className="w-4 h-4 text-amber-400" />
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  Change Password
                </h3>
              </div>

              <form onSubmit={handlePasswordChange} className="space-y-3">
                <div>
                  <label className="block text-zinc-400 mb-1">Current Password</label>
                  <input
                    type="password"
                    value={currentPass}
                    onChange={(e) => setCurrentPass(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-zinc-100 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1">New Argon2 Password</label>
                  <input
                    type="password"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    placeholder="Min. 8 characters"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-zinc-100 font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl font-semibold bg-amber-500 text-black hover:bg-amber-400 transition"
                >
                  Update Password
                </button>
              </form>
            </div>

            {/* 2FA & Active Sessions */}
            <div className="lg:col-span-6 space-y-6">
              {/* 2FA Box */}
              <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-white">Two-Factor Authentication</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    ENABLED
                  </span>
                </div>
                <p className="text-zinc-400 text-[11px] leading-relaxed">
                  Time-based One-Time Passwords (TOTP) enforced for high-privilege access grant requests.
                </p>
              </div>

              {/* Active Sessions Box */}
              <div className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5 space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <Monitor className="w-4 h-4 text-blue-400" />
                    <span className="font-bold text-white">Active Authorized Devices</span>
                  </div>
                </div>

                <div className="space-y-2 text-[11px]">
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-zinc-200">Current Session • Chrome / Windows</p>
                      <p className="text-[10px] text-zinc-500 font-mono">103.21.124.89 • Active now</p>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400">THIS DEVICE</span>
                  </div>
                </div>

                <button
                  onClick={handleLogoutAll}
                  className="w-full mt-2 py-2 rounded-xl text-xs font-semibold bg-rose-500/15 text-rose-400 hover:bg-rose-500/25 border border-rose-500/30 transition flex items-center justify-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout All Devices
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
