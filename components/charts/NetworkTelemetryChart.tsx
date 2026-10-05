'use client';

import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';
import { mockNetworkTimeSeries } from '@/lib/mock/statistics';

export function NetworkTelemetryChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-64 w-full bg-zinc-900/30 rounded-xl animate-pulse" />;
  }

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={mockNetworkTimeSeries} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis
            dataKey="time"
            stroke="#71717a"
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
          />
          <YAxis
            yAxisId="left"
            stroke="#71717a"
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#71717a"
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
            tickFormatter={(v) => `${v}ms`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0d1117',
              borderColor: 'rgba(255,255,255,0.1)',
              borderRadius: '12px',
              fontSize: '11px',
              color: '#fff',
            }}
          />
          <Legend wrapperStyle={{ fontSize: '11px', color: '#a1a1aa' }} />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="rpm"
            name="Req/Min (RPM)"
            stroke="#06b6d4"
            strokeWidth={2}
            dot={{ r: 3, fill: '#06b6d4' }}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="bandwidthMbps"
            name="Bandwidth (Mbps)"
            stroke="#f59e0b"
            strokeWidth={2}
            dot={{ r: 3, fill: '#f59e0b' }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="latencyMs"
            name="Latency (ms)"
            stroke="#10b981"
            strokeWidth={2}
            strokeDasharray="4 4"
            dot={{ r: 3, fill: '#10b981' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
