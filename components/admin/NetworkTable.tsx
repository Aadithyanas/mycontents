'use client';

import React, { useState } from 'react';
import { NetworkLog } from '@/types';
import { Search, Globe, Shield, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

interface NetworkTableProps {
  initialLogs: NetworkLog[];
}

export function NetworkTable({ initialLogs }: NetworkTableProps) {
  const [logs, setLogs] = useState<NetworkLog[]>(initialLogs);
  const [search, setSearch] = useState('');
  const [methodFilter, setMethodFilter] = useState<string>('ALL');

  const filtered = logs.filter((log) => {
    const matchesSearch =
      log.endpoint.toLowerCase().includes(search.toLowerCase()) ||
      log.ipAddress.toLowerCase().includes(search.toLowerCase()) ||
      log.region.toLowerCase().includes(search.toLowerCase()) ||
      log.userAgent.toLowerCase().includes(search.toLowerCase());

    const matchesMethod = methodFilter === 'ALL' || log.method === methodFilter;
    return matchesSearch && matchesMethod;
  });

  const handleSimulatePacket = () => {
    const endpoints = [
      '/api/videos/stream/chunk_088.m4s',
      '/api/videos/vid-05/manifest.mpd',
      '/api/auth/session',
      '/api/access-requests',
    ];
    const newLog: NetworkLog = {
      id: `net-${Date.now().toString().slice(-4)}`,
      ipAddress: `103.21.${Math.floor(Math.random() * 200)}.${Math.floor(Math.random() * 200)}`,
      endpoint: endpoints[Math.floor(Math.random() * endpoints.length)],
      method: 'GET',
      status: 206,
      responseTimeMs: Math.floor(Math.random() * 40) + 20,
      bytes: 2097152,
      timestamp: new Date().toISOString(),
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/130.0.0.0',
      region: 'IN-MAH (Mumbai)',
      protocol: 'HTTP/3 (QUIC)',
      tlsVersion: 'TLSv1.3',
    };
    setLogs([newLog, ...logs.slice(0, 49)]);
    toast.info(`ACN Packet Received: ${newLog.endpoint} (${newLog.responseTimeMs}ms)`);
  };

  const getStatusBadge = (status: number) => {
    if (status >= 200 && status < 300) {
      return (
        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          {status} {status === 206 ? 'PARTIAL' : 'OK'}
        </span>
      );
    }
    if (status === 429) {
      return (
        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-orange-500/10 text-orange-400 border border-orange-500/20">
          429 RATE LIMIT
        </span>
      );
    }
    if (status >= 400 && status < 500) {
      return (
        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
          {status} DENIED
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-zinc-700 text-zinc-300">
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search endpoint, IP, region, or agent..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-zinc-900/80 border border-white/10 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500 transition"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            {['ALL', 'GET', 'POST', 'OPTIONS'].map((m) => (
              <button
                key={m}
                onClick={() => setMethodFilter(m)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition cursor-pointer ${
                  methodFilter === m
                    ? 'bg-cyan-500 text-black font-semibold'
                    : 'bg-zinc-900/60 text-zinc-400 hover:text-white border border-white/5'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          <button
            onClick={handleSimulatePacket}
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-cyan-500/15 text-cyan-400 hover:bg-cyan-500/25 border border-cyan-500/30 transition flex items-center gap-1.5 cursor-pointer ml-auto"
            title="Simulate incoming HTTP/3 QUIC packet for academic demo"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Inject Live Packet
          </button>
        </div>
      </div>

      {/* Network Stream Table */}
      <div className="rounded-2xl border border-white/5 overflow-hidden bg-zinc-900/40 backdrop-blur-md shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/5 bg-zinc-950/60 text-zinc-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Method & Endpoint</th>
                <th className="py-3 px-4">Origin IP & Region</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Latency</th>
                <th className="py-3 px-4">Protocol & Cipher</th>
                <th className="py-3 px-4 text-right">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono text-[11px]">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-white/[0.02] transition">
                  {/* Method & Endpoint */}
                  <td className="py-3 px-4 max-w-xs">
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300 font-bold text-[10px]">
                        {log.method}
                      </span>
                      <span className="text-zinc-200 truncate">{log.endpoint}</span>
                    </div>
                  </td>

                  {/* Origin */}
                  <td className="py-3 px-4">
                    <div className="flex flex-col">
                      <span className="text-zinc-300 font-semibold">{log.ipAddress}</span>
                      <span className="text-[10px] text-zinc-500">{log.region}</span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-3 px-4">{getStatusBadge(log.status)}</td>

                  {/* Latency */}
                  <td className="py-3 px-4">
                    <span
                      className={`font-semibold ${
                        log.responseTimeMs < 50
                          ? 'text-emerald-400'
                          : log.responseTimeMs < 100
                          ? 'text-amber-400'
                          : 'text-rose-400'
                      }`}
                    >
                      {log.responseTimeMs}ms
                    </span>
                  </td>

                  {/* Protocol */}
                  <td className="py-3 px-4 text-[10px]">
                    <div className="text-cyan-400">{log.protocol}</div>
                    <div className="text-zinc-500">{log.tlsVersion}</div>
                  </td>

                  {/* Time */}
                  <td className="py-3 px-4 text-right text-zinc-400 text-[10px]">
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
