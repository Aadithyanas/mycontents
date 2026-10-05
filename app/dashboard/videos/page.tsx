'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { DashboardNav } from '@/components/navigation/DashboardNav';
import { VideoGrid } from '@/components/video/VideoGrid';
import { useAuth } from '@/context/AuthContext';
import { requestsApi } from '@/lib/api/requests';
import { videosApi } from '@/lib/api/videos';
import { Video } from '@/types';
import { PlayCircle, ShieldCheck, Lock } from 'lucide-react';

export default function ApprovedVideosPage() {
  const { user } = useAuth();
  const [approvedVideos, setApprovedVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadApproved() {
      if (!user) return;
      setLoading(true);
      const reqs = await requestsApi.getUserRequests(user.id);
      const approvedIds = reqs.filter((r) => r.status === 'APPROVED').map((r) => r.videoId);

      const all = await videosApi.getVideos();
      const approved = all.filter((v) => approvedIds.includes(v.id));
      setApprovedVideos(approved);
      setLoading(false);
    }
    loadApproved();
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen bg-[#07080b]">
      <Navbar />

      <main className="flex-1 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="space-y-1 border-b border-white/5 pb-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              Cryptographic DRM Access Grants
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Approved Content & Streaming Leases
            </h1>
            <p className="text-xs text-zinc-400">
              Protected videos granted to your account for evaluation with dynamic forensic watermarking.
            </p>
          </div>

          <DashboardNav />

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="aspect-video bg-zinc-900 rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : approvedVideos.length === 0 ? (
            <div className="p-12 rounded-3xl bg-zinc-900/40 border border-white/5 text-center space-y-4 max-w-lg mx-auto">
              <div className="w-12 h-12 rounded-full bg-zinc-800 text-zinc-500 flex items-center justify-center mx-auto">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">No Approved Content Yet</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                When an administrator approves your access request, the protected master cuts will appear here with active forensic playback tokens.
              </p>
              <Link
                href="/videos"
                className="inline-block px-5 py-2.5 rounded-xl text-xs font-semibold bg-amber-500 text-black hover:bg-amber-400 transition"
              >
                Browse Video Catalog
              </Link>
            </div>
          ) : (
            <VideoGrid videos={approvedVideos} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
