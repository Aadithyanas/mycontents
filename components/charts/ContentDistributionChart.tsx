'use client';

import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { mockContentDistribution } from '@/lib/mock/statistics';

export function ContentDistributionChart() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-64 w-full bg-zinc-900/30 rounded-xl animate-pulse" />;
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full h-52">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={mockContentDistribution}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={78}
              paddingAngle={4}
              dataKey="value"
            >
              {mockContentDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="#07080b" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip
              formatter={(val) => [`${val}%`, 'Proportion']}
              contentStyle={{
                backgroundColor: '#0d1117',
                borderColor: 'rgba(255,255,255,0.1)',
                borderRadius: '12px',
                fontSize: '11px',
                color: '#fff',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Custom Legend */}
      <div className="grid grid-cols-2 gap-2 w-full mt-2 pt-2 border-t border-white/5">
        {mockContentDistribution.map((item) => (
          <div key={item.name} className="flex items-center gap-2 text-[11px]">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-zinc-400 truncate">{item.name}</span>
            <span className="font-mono font-semibold text-zinc-200 ml-auto">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
