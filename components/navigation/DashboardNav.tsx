'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, KeyRound, PlayCircle, User, Settings } from 'lucide-react';

export function DashboardNav() {
  const pathname = usePathname();

  const tabs = [
    { href: '/dashboard', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { href: '/dashboard/requests', label: 'My Access Requests', icon: <KeyRound className="w-4 h-4" /> },
    { href: '/dashboard/videos', label: 'Approved Content', icon: <PlayCircle className="w-4 h-4" /> },
    { href: '/dashboard/profile', label: 'My Profile', icon: <User className="w-4 h-4" /> },
    { href: '/dashboard/settings', label: 'Security & Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-white/5 scrollbar-none">
      {tabs.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
              active
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab.icon}
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
