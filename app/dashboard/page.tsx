'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { DashboardNav } from '@/components/navigation/DashboardNav';
import { StatsCard } from '@/components/admin/StatsCard';
import { VideoCard } from '@/components/video/VideoCard';
import { Badge } from '@/components/common/Badge';
import { useAuth } from '@/context/AuthContext';
import { requestsApi } from '@/lib/api/requests';
import { videosApi } from '@/lib/api/videos';
import { AccessRequest, Video } from '@/types';
import {
  Film,
  KeyRound,
  PlayCircle,
  Clock,
  Shield,
  ArrowRight,
  CheckCircle2,
  Lock,
} from 'lucide-react';

export default function UserDashboardPage() {
  const { user } = useAuth();
  const [userRequests, setUserRequests] = useState<AccessRequest[]>([]);
  const [approvedVideos, setApprovedVideos] = useState<Video[]>([]);
  const [allVideos, setAllVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!user) return;
      setLoading(true);
      const reqs = await requestsApi.getUserRequests(user.id);
      setUserRequests(reqs);

      const vids = await videosApi.getVideos();
      setAllVideos(vids);

      // Find videos user has approved requests for
      const approvedIds = reqs.filter((r) => r.status === 'APPROVED').map((r) => r.videoId);
      const approved = vids.filter((v) => approvedIds.includes(v.id));
      setApprovedVideos(approved);

      setLoading(false);
    }
    loadData();
  }, [user]);

  const pendingCount = userRequests.filter((r) => r.status === 'PENDING').length;
  const approvedCount = userRequests.filter((r) => r.status === 'APPROVED').length;

  return (
    <div className="flex flex-col min-h-screen bg-[#07080b]">
      <Navbar />

      <main className="flex-1 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Welcome Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold uppercase tracking-wider">
                <Shield className="w-3.5 h-3.5" />
                Verified Viewer Portal
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
                Welcome back, {user?.name || 'Viewer'}
              </h1>
              <p className="text-xs text-zinc-400 mt-1">
                Manage your temporary access tokens, reviewed requests, and approved streaming sessions.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/videos"
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500 text-black hover:bg-amber-400 transition shadow-lg shadow-amber-500/20"
              >
                Browse Video Catalog
              </Link>
            </div>
          </div>

          {/* Horizontal Navigation */}
          <DashboardNav />

          {/* Metric Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              title="Catalog Videos Available"
              value={allVideos.length}
              subtitle="Master works in archive"
              icon={<Film className="w-5 h-5 text-amber-400" />}
            />
            <StatsCard
              title="Access Requests Submitted"
              value={userRequests.length}
              subtitle={`${pendingCount} awaiting approval`}
              icon={<KeyRound className="w-5 h-5 text-blue-400" />}
              color="text-blue-400 bg-blue-500/10 border-blue-500/20"
            />
            <StatsCard
              title="Approved Media Grants"
              value={approvedCount}
              subtitle="Active DRM playback leases"
              icon={<CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              color="text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
            />
            <StatsCard
              title="Active Secure Session"
              value="VS-82A91X"
              subtitle="TLS 1.3 • Watermarked"
              icon={<Clock className="w-5 h-5 text-purple-400" />}
              color="text-purple-400 bg-purple-500/10 border-purple-500/20"
            />
          </div>

          {/* Content Split: Approved Content & Recent Requests */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 7 cols: Approved Videos */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                  <PlayCircle className="w-5 h-5 text-emerald-400" />
                  Your Approved Stream Grants
                </h3>
                <Link
                  href="/dashboard/videos"
                  className="text-xs text-amber-400 hover:underline flex items-center gap-1"
                >
                  View All ({approvedVideos.length}) <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {approvedVideos.length === 0 ? (
                <div className="p-8 rounded-2xl bg-zinc-900/40 border border-white/5 text-center space-y-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 text-zinc-500 flex items-center justify-center mx-auto">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-semibold text-zinc-300">No Approved Grants Yet</h4>
                  <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                    Browse the video library and submit access requests for protected master cuts.
                  </p>
                  <Link
                    href="/videos"
                    className="inline-block px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-800 text-white hover:bg-zinc-700 transition"
                  >
                    Explore Protected Content
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {approvedVideos.slice(0, 4).map((v) => (
                    <VideoCard key={v.id} video={v} />
                  ))}
                </div>
              )}
            </div>

            {/* Right 5 cols: Recent Request Statuses */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                  <KeyRound className="w-5 h-5 text-amber-400" />
                  Recent Access Requests
                </h3>
                <Link
                  href="/dashboard/requests"
                  className="text-xs text-amber-400 hover:underline flex items-center gap-1"
                >
                  View History <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/40 border border-white/5 space-y-3">
                {userRequests.length === 0 ? (
                  <p className="text-xs text-zinc-500 py-6 text-center">
                    You have not submitted any access requests yet.
                  </p>
                ) : (
                  userRequests.slice(0, 5).map((req) => (
                    <div
                      key={req.id}
                      className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/videos/${req.videoId}`}
                          className="font-semibold text-xs text-zinc-200 hover:text-amber-400 transition truncate block"
                        >
                          {req.videoTitle}
                        </Link>
                        <span className="text-[10px] text-zinc-500 font-mono">
                          {new Date(req.requestedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <Badge status={req.status} />
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
