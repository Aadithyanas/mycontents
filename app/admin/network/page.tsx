'use client';

import React from 'react';
import { StatsCard } from '@/components/admin/StatsCard';
import { NetworkTelemetryChart } from '@/components/charts/NetworkTelemetryChart';
import { NetworkTable } from '@/components/admin/NetworkTable';
import { mockNetworkMetrics } from '@/lib/mock/statistics';
import { mockNetworkLogs } from '@/lib/mock/networkLogs';
import {
  Network,
  Activity,
  Zap,
  Clock,
  Wifi,
  AlertTriangle,
  Radio,
  Server,
} from 'lucide-react';

export default function AdminNetworkPage() {
  const metrics = mockNetworkMetrics;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
            <Network className="w-4 h-4" />
            Advanced Computer Networks (ACN) Telemetry
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Real-Time Network & Edge Streaming Telemetry
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Monitoring HTTP/3 (QUIC) datagrams, TLS 1.3 handshakes, Adaptive Bitrate chunk distribution, and latency.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono border border-cyan-500/30">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            HTTP/3 QUIC Edge Active
          </span>
        </div>
      </div>

      {/* Top 6 ACN Telemetry Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatsCard
          title="Active Users"
          value={metrics.activeUsers}
          subtitle="Concurrent clients"
          icon={<Activity className="w-4 h-4 text-cyan-400" />}
          color="text-cyan-400 bg-cyan-500/10 border-cyan-500/20"
        />
        <StatsCard
          title="Active Video Streams"
          value={metrics.activeVideoStreams}
          subtitle="HLS / DASH pipes"
          icon={<Radio className="w-4 h-4 text-emerald-400" />}
          color="text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
        />
        <StatsCard
          title="API Requests / Min"
          value={metrics.requestsPerMinute}
          subtitle="Throughput RPM"
          icon={<Zap className="w-4 h-4 text-amber-400" />}
        />
        <StatsCard
          title="Average Latency"
          value={`${metrics.averageResponseTimeMs}ms`}
          subtitle="Round-trip time (RTT)"
          icon={<Clock className="w-4 h-4 text-indigo-400" />}
          color="text-indigo-400 bg-indigo-500/10 border-indigo-500/20"
        />
        <StatsCard
          title="Egress Bandwidth"
          value={`${metrics.bandwidthMbps} Mbps`}
          subtitle="Edge CDN egress"
          icon={<Wifi className="w-4 h-4 text-blue-400" />}
          color="text-blue-400 bg-blue-500/10 border-blue-500/20"
        />
        <StatsCard
          title="Packet Loss"
          value={`${metrics.packetLossPercent}%`}
          subtitle="Cache Hit: 94.8%"
          icon={<Server className="w-4 h-4 text-emerald-400" />}
          color="text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
        />
      </div>

      {/* Time Series Telemetry Chart */}
      <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/5 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Network Throughput, RPM & Latency Time-Series
            </h3>
            <p className="text-xs text-zinc-400">
              Correlated metrics capturing edge server response latency versus active video throughput
            </p>
          </div>
          <span className="text-[11px] font-mono text-zinc-400">
            Window: Last 60 Minutes (5-min intervals)
          </span>
        </div>

        <NetworkTelemetryChart />
      </div>

      {/* Network Request Stream Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <Server className="w-4 h-4 text-cyan-400" />
            Live Network Edge Request Stream (HTTP/2 & HTTP/3 QUIC)
          </h3>
          <span className="text-xs text-zinc-500 font-mono">
            Showing latest 30 protocol datagrams
          </span>
        </div>

        <NetworkTable initialLogs={mockNetworkLogs} />
      </div>
    </div>
  );
}
