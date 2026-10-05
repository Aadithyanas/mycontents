'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { DashboardNav } from '@/components/navigation/DashboardNav';
import { useAuth } from '@/context/AuthContext';
import { User, Mail, Shield, Building, Calendar, Edit3 } from 'lucide-react';
import { toast } from 'sonner';

export default function UserProfilePage() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || 'Viewer');
  const [title, setTitle] = useState(user?.title || 'Brand Director');
  const [department, setDepartment] = useState(user?.department || 'External Agency');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile details updated successfully');
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#07080b]">
      <Navbar />

      <main className="flex-1 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-1 border-b border-white/5 pb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              My Profile & Credentials
            </h1>
            <p className="text-xs text-zinc-400">
              Manage your verified identity used for DRM playback watermarking and requests.
            </p>
          </div>

          <DashboardNav />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-4xl">
            {/* Identity Card */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-zinc-900/50 border border-white/5 space-y-4 text-center">
              <div className="w-20 h-20 rounded-full bg-amber-500 text-black font-bold text-2xl flex items-center justify-center mx-auto shadow-xl shadow-amber-500/20">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div>
                <h3 className="text-base font-bold text-white">{user?.name}</h3>
                <p className="text-xs text-zinc-400">{user?.email}</p>
                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Shield className="w-3.5 h-3.5" />
                  Role: {user?.role}
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 text-[11px] text-zinc-500 text-left space-y-2">
                <div className="flex justify-between">
                  <span>User Identifier:</span>
                  <span className="font-mono text-zinc-300">{user?.id}</span>
                </div>
                <div className="flex justify-between">
                  <span>Account State:</span>
                  <span className="text-emerald-400 font-semibold">Active & Verified</span>
                </div>
              </div>
            </div>

            {/* Profile Form */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSave} className="p-6 rounded-2xl bg-zinc-900/50 border border-white/5 space-y-4 text-xs">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Personal Information
                </h3>

                <div>
                  <label className="block text-zinc-400 font-medium mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 font-medium mb-1">Professional Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 font-medium mb-1">Organization / Department</label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl font-semibold bg-amber-500 text-black hover:bg-amber-400 transition"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
