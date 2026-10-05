'use client';

import React from 'react';
import Link from 'next/link';
import { StatsCard } from '@/components/admin/StatsCard';
import { ViewsChart } from '@/components/charts/ViewsChart';
import { ContentDistributionChart } from '@/components/charts/ContentDistributionChart';
import { UserActivityChart } from '@/components/charts/UserActivityChart';
import { mockAdminStats } from '@/lib/mock/statistics';
import {
  Film,
  Globe,
  Lock,
  Users,
  KeyRound,
  Activity,
  Eye,
  ShieldAlert,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export default function AdminOverviewPage() {
  const stats = mockAdminStats;

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <span className="text-xs font-mono text-amber-400 font-semibold uppercase tracking-wider">
            Enterprise Governance Console
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            System Overview & Stream Telemetry
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Monitoring active cryptographic playback leases, video distribution, and threat vectors.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/requests"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500 text-black hover:bg-amber-400 transition shadow-lg shadow-amber-500/20 flex items-center gap-2"
          >
            <KeyRound className="w-3.5 h-3.5" />
            Review Requests (5 Pending)
          </Link>
        </div>
      </div>

      {/* 8 Stats Metrics (Section 17) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard
          title="Total Master Videos"
          value={stats.totalVideos}
          subtitle="4K & 8K Cinema Works"
          icon={<Film className="w-5 h-5 text-amber-400" />}
          trend="+3 this month"
        />
        <StatsCard
          title="Public Discovery"
          value={stats.publicVideos}
          subtitle="Unrestricted streams"
          icon={<Globe className="w-5 h-5 text-emerald-400" />}
          color="text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
        />
        <StatsCard
          title="Protected Videos"
          value={stats.protectedVideos}
          subtitle="Token DRM & Watermarked"
          icon={<Lock className="w-5 h-5 text-amber-400" />}
          color="text-amber-400 bg-amber-500/10 border-amber-500/20"
        />
        <StatsCard
          title="Registered Users"
          value={stats.totalUsers.toLocaleString()}
          subtitle="Viewers & Reviewers"
          icon={<Users className="w-5 h-5 text-blue-400" />}
          color="text-blue-400 bg-blue-500/10 border-blue-500/20"
          trend="+18% growth"
        />
        <StatsCard
          title="Pending Access Requests"
          value={stats.pendingRequests}
          subtitle="Awaiting manual review"
          icon={<KeyRound className="w-5 h-5 text-amber-400" />}
          color="text-amber-400 bg-amber-500/10 border-amber-500/20"
        />
        <StatsCard
          title="Active Video Streams"
          value={stats.activeSessions}
          subtitle="Concurrent playback leases"
          icon={<Activity className="w-5 h-5 text-cyan-400" />}
          color="text-cyan-400 bg-cyan-500/10 border-cyan-500/20"
        />
        <StatsCard
          title="Today's Stream Views"
          value={stats.todaysViews.toLocaleString()}
          subtitle="Bandwidth: 86.7 GB"
          icon={<Eye className="w-5 h-5 text-indigo-400" />}
          color="text-indigo-400 bg-indigo-500/10 border-indigo-500/20"
          trend="+12% today"
        />
        <StatsCard
          title="Security Events Today"
          value={stats.securityEventsToday}
          subtitle="0 Critical Breaches"
          icon={<ShieldAlert className="w-5 h-5 text-rose-400" />}
          color="text-rose-400 bg-rose-500/10 border-rose-500/20"
          trend="WAF Active"
        />
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 cols: Views Over Time Chart */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-zinc-900/40 border border-white/5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Video Views & Unique Visitors Over Time
              </h3>
              <p className="text-xs text-zinc-400">7-Day Aggregated Stream Telemetry</p>
            </div>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              +24.6% Avg
            </span>
          </div>

          <ViewsChart />
        </div>

        {/* Right 4 cols: Content Distribution Donut Chart */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-zinc-900/40 border border-white/5 space-y-4 shadow-xl flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Content Tier Distribution
            </h3>
            <p className="text-xs text-zinc-400">Access Policy Breakdown</p>
          </div>

          <ContentDistributionChart />
        </div>
      </div>

      {/* Hourly User Activity Chart & Quick Gateway */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 p-6 rounded-2xl bg-zinc-900/40 border border-white/5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                User Traffic & Authentication Activity by Hour
              </h3>
              <p className="text-xs text-zinc-400">
                Correlating API requests against successful authentication logins
              </p>
            </div>
          </div>

          <UserActivityChart />
        </div>

        {/* Quick Links / Academic Modules */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-zinc-900/40 border border-white/5 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Academic Curricular Modules
            </h3>
            <p className="text-xs text-zinc-400">Direct shortcuts to specialized monitors</p>
          </div>

          <div className="space-y-3">
            <Link
              href="/admin/network"
              className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 hover:border-cyan-500/40 transition flex items-center justify-between block group"
            >
              <div>
                <span className="text-xs font-bold text-cyan-300 block">ACN Network Monitor</span>
                <span className="text-[11px] text-zinc-400">HTTP/3 QUIC, TLS 1.3, Latency</span>
              </div>
              <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/admin/security"
              className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 hover:border-amber-500/40 transition flex items-center justify-between block group"
            >
              <div>
                <span className="text-xs font-bold text-amber-300 block">TIS Security Ledger</span>
                <span className="text-[11px] text-zinc-400">Audit logs, brute-force WAF, score 96/100</span>
              </div>
              <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/admin/requests"
              className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:border-emerald-500/40 transition flex items-center justify-between block group"
            >
              <div>
                <span className="text-xs font-bold text-emerald-300 block">Access Request Gate</span>
                <span className="text-[11px] text-zinc-400">Review, approve, or reject user tokens</span>
              </div>
              <ArrowRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="pt-2 text-[10px] text-zinc-500 font-mono text-center">
            System Health: Operational • 99.98% SLA
          </div>
        </div>
      </div>
    </div>
  );
}
