'use client';

import React, { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { mockViewsOverTime } from '@/lib/mock/statistics';

export function ViewsChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-64 w-full bg-zinc-900/30 rounded-xl animate-pulse" />;
  }

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={mockViewsOverTime} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="viewColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="visitorColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis
            dataKey="date"
            stroke="#71717a"
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
          />
          <YAxis
            stroke="#71717a"
            fontSize={11}
            tickLine={false}
            axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
            tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`}
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
          <Area
            type="monotone"
            dataKey="views"
            name="Stream Views"
            stroke="#f59e0b"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#viewColor)"
          />
          <Area
            type="monotone"
            dataKey="uniqueVisitors"
            name="Unique Viewers"
            stroke="#3b82f6"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#visitorColor)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
