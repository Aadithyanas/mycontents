'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
  color?: string;
}

export function StatsCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendUp = true,
  color = 'text-amber-400 bg-amber-500/10 border-amber-500/20',
}: StatsCardProps) {
  return (
    <div className="rounded-2xl bg-zinc-900/50 border border-white/5 p-5 shadow-lg flex flex-col justify-between hover:border-white/10 transition group">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-zinc-400">{title}</span>
        <div className={`p-2.5 rounded-xl border ${color} transition-transform group-hover:scale-105`}>
          {icon}
        </div>
      </div>

      <div className="mt-3">
        <h3 className="text-2xl font-bold tracking-tight text-white font-mono">{value}</h3>
        {(subtitle || trend) && (
          <div className="flex items-center gap-2 mt-1 text-[11px]">
            {trend && (
              <span className={`font-semibold ${trendUp ? 'text-emerald-400' : 'text-rose-400'}`}>
                {trend}
              </span>
            )}
            {subtitle && <span className="text-zinc-500">{subtitle}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
