'use client';

import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from 'recharts';
import { mockUserActivity } from '@/lib/mock/statistics';

export function UserActivityChart() {
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
        <BarChart data={mockUserActivity} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis
            dataKey="hour"
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
          <Bar dataKey="streamRequests" name="Stream Requests" fill="#f59e0b" radius={[4, 4, 0, 0]} />
          <Bar dataKey="authLogins" name="Auth Logins" fill="#10b981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
