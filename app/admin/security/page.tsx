'use client';

import React from 'react';
import { StatsCard } from '@/components/admin/StatsCard';
import { SecurityTable } from '@/components/admin/SecurityTable';
import { mockSecurityScore } from '@/lib/mock/statistics';
import { mockSecurityLogs } from '@/lib/mock/securityLogs';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  AlertTriangle,
  KeyRound,
  FileText,
  CheckCircle2,
  Cpu,
} from 'lucide-react';

export default function AdminSecurityPage() {
  const sec = mockSecurityScore;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4" />
            Technology & Information Security (TIS) Console
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Zero-Trust Governance & Security Audit Ledger
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Real-time threat monitoring, brute-force mitigation, tamper-evident audit logs, and forensic DRM tracking.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/25">
            <ShieldCheck className="w-4 h-4" />
            <span>Zero-Trust RBAC: Enforced</span>
          </div>
        </div>
      </div>

      {/* Security Metrics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* Security Score */}
        <div className="p-5 rounded-2xl bg-zinc-900/50 border border-white/5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400">Security Score</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500 text-black">
              {sec.grade}
            </span>
          </div>
          <div className="mt-3">
            <h3 className="text-3xl font-bold font-mono text-white">
              {sec.score}<span className="text-sm text-zinc-500">/100</span>
            </h3>
            <span className="text-[11px] text-emerald-400 font-semibold">Optimal Security Posture</span>
          </div>
        </div>

        <StatsCard
          title="Failed Login Attempts"
          value={sec.failedLoginsToday}
          subtitle="Rate limited via token bucket"
          icon={<AlertTriangle className="w-5 h-5 text-amber-400" />}
        />
        <StatsCard
          title="Suspicious Sessions"
          value={sec.suspiciousSessions}
          subtitle="1 Tor node challenged"
          icon={<Lock className="w-5 h-5 text-orange-400" />}
          color="text-orange-400 bg-orange-500/10 border-orange-500/20"
        />
        <StatsCard
          title="Blocked Exploits"
          value={sec.blockedRequestsCount}
          subtitle="SQLi & XSS sanitized"
          icon={<ShieldAlert className="w-5 h-5 text-rose-400" />}
          color="text-rose-400 bg-rose-500/10 border-rose-500/20"
        />
        <StatsCard
          title="Active Secure Sessions"
          value={sec.activeSecureSessions}
          subtitle="Watermarked playback tokens"
          icon={<KeyRound className="w-5 h-5 text-purple-400" />}
          color="text-purple-400 bg-purple-500/10 border-purple-500/20"
        />
      </div>

      {/* Security Controls Checklist Banner (Section 24) */}
      <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/5 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              TIS Security Controls & Defensive Mechanisms
            </h3>
          </div>
          <span className="text-[11px] font-mono text-zinc-400">
            6 of 6 Core Controls Verified Active
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <p className="font-semibold text-zinc-200">HTTPS / TLS 1.3</p>
              <p className="text-[10px] text-zinc-500">HSTS Preload</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <p className="font-semibold text-zinc-200">Argon2 / Bcrypt</p>
              <p className="text-[10px] text-zinc-500">Salted & Peppered</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <p className="font-semibold text-zinc-200">Zero-Trust RBAC</p>
              <p className="text-[10px] text-zinc-500">Server Authorization</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <p className="font-semibold text-zinc-200">Dynamic Watermark</p>
              <p className="text-[10px] text-zinc-500">Forensic Attribution</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <p className="font-semibold text-zinc-200">HttpOnly Cookies</p>
              <p className="text-[10px] text-zinc-500">SameSite=Strict</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <p className="font-semibold text-zinc-200">WAF Rate Limiting</p>
              <p className="text-[10px] text-zinc-500">Token Bucket Rule</p>
            </div>
          </div>
        </div>
      </div>

      {/* Security Audit Log Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-400" />
            Comprehensive Security & Audit Trail
          </h3>
          <span className="text-xs text-zinc-500 font-mono">
            Showing latest 30 immutable security records
          </span>
        </div>

        <SecurityTable initialLogs={mockSecurityLogs} />
      </div>
    </div>
  );
}
