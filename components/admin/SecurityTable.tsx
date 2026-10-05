'use client';

import React, { useState } from 'react';
import { SecurityLog, SeverityLevel, AuditAction } from '@/types';
import { Badge } from '@/components/common/Badge';
import { Search, ShieldAlert, ShieldCheck, AlertTriangle, Filter, Plus } from 'lucide-react';
import { toast } from 'sonner';

interface SecurityTableProps {
  initialLogs: SecurityLog[];
}

export function SecurityTable({ initialLogs }: SecurityTableProps) {
  const [logs, setLogs] = useState<SecurityLog[]>(initialLogs);
  const [search, setSearch] = useState('');
  const [severityFilter, setSeverityFilter] = useState<'ALL' | SeverityLevel>('ALL');
  const [actionFilter, setActionFilter] = useState<'ALL' | AuditAction>('ALL');

  const filtered = logs.filter((l) => {
    const matchesSearch =
      l.event.toLowerCase().includes(search.toLowerCase()) ||
      l.ipAddress.toLowerCase().includes(search.toLowerCase()) ||
      l.userName?.toLowerCase().includes(search.toLowerCase()) ||
      l.details?.toLowerCase().includes(search.toLowerCase());

    const matchesSeverity = severityFilter === 'ALL' || l.severity === severityFilter;
    const matchesAction = actionFilter === 'ALL' || l.action === actionFilter;

    return matchesSearch && matchesSeverity && matchesAction;
  });

  const handleSimulateAttack = () => {
    const attacks = [
      {
        event: 'Brute force credential stuffing blocked by rate limiter',
        severity: 'CRITICAL' as SeverityLevel,
        status: 'BLOCKED' as const,
        action: 'SECURITY_EVENT' as AuditAction,
        details: '20 rapid password attempts on /api/auth/login. IP temporarily blacklisted.',
      },
      {
        event: 'Unauthorized request to protected video stream /api/videos/vid-05',
        severity: 'HIGH' as SeverityLevel,
        status: 'BLOCKED' as const,
        action: 'SECURITY_EVENT' as AuditAction,
        details: 'Missing valid HMAC token or expired lease session.',
      },
      {
        event: 'Admin privilege escalation verified for session token',
        severity: 'INFO' as SeverityLevel,
        status: 'SUCCESS' as const,
        action: 'LOGIN' as AuditAction,
        details: 'Multi-factor cryptographic claim validated with Argon2id signature.',
      },
    ];

    const chosen = attacks[Math.floor(Math.random() * attacks.length)];
    const newLog: SecurityLog = {
      id: `sec-${Date.now().toString().slice(-4)}`,
      ipAddress: `198.51.${Math.floor(Math.random() * 200)}.${Math.floor(Math.random() * 200)}`,
      userAgent: 'Automated Security Probe / WAF Agent',
      timestamp: new Date().toISOString(),
      ...chosen,
    };

    setLogs([newLog, ...logs.slice(0, 49)]);
    toast.warning(`Security Event Logged: ${newLog.event}`);
  };

  return (
    <div className="space-y-4">
      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search event, user, IP, or details..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-zinc-900/80 border border-white/10 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500 transition"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          {/* Severity Badges */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            {(['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'INFO'] as const).map((sev) => (
              <button
                key={sev}
                onClick={() => setSeverityFilter(sev)}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-mono font-medium transition cursor-pointer ${
                  severityFilter === sev
                    ? 'bg-amber-500 text-black font-semibold'
                    : 'bg-zinc-900/60 text-zinc-400 hover:text-white border border-white/5'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>

          <button
            onClick={handleSimulateAttack}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-rose-500/15 text-rose-400 hover:bg-rose-500/25 border border-rose-500/30 transition flex items-center gap-1.5 cursor-pointer ml-auto whitespace-nowrap"
            title="Trigger simulated security event for demonstration"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            Trigger Security Probe
          </button>
        </div>
      </div>

      {/* Security Audit Table */}
      <div className="rounded-2xl border border-white/5 overflow-hidden bg-zinc-900/40 backdrop-blur-md shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/5 bg-zinc-950/60 text-zinc-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Severity</th>
                <th className="py-3 px-4">Audit Action & Event</th>
                <th className="py-3 px-4">User Identity</th>
                <th className="py-3 px-4">Client IP</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-white/[0.02] transition">
                  {/* Severity */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <Badge severity={log.severity} />
                  </td>

                  {/* Event & Details */}
                  <td className="py-3.5 px-4 max-w-md">
                    <div className="font-semibold text-zinc-200">{log.event}</div>
                    {log.details && (
                      <p className="text-[11px] text-zinc-400 mt-0.5 line-clamp-2 leading-relaxed">
                        {log.details}
                      </p>
                    )}
                  </td>

                  {/* User */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {log.userName ? (
                      <div>
                        <span className="font-semibold text-zinc-300">{log.userName}</span>
                        <div className="text-[10px] font-mono text-zinc-500">{log.userId}</div>
                      </div>
                    ) : (
                      <span className="text-zinc-500 font-mono text-[11px]">Unauthenticated</span>
                    )}
                  </td>

                  {/* IP */}
                  <td className="py-3.5 px-4 font-mono text-zinc-400 text-[11px] whitespace-nowrap">
                    {log.ipAddress}
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        log.status === 'SUCCESS'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : log.status === 'BLOCKED'
                          ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>

                  {/* Timestamp */}
                  <td className="py-3.5 px-4 text-right text-zinc-400 font-mono text-[11px] whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
