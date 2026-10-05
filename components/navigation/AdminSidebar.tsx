'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Film,
  KeyRound,
  Users,
  Network,
  ShieldAlert,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export function AdminSidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    { href: '/admin', label: 'Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { href: '/admin/videos', label: 'Videos Management', icon: <Film className="w-4 h-4" /> },
    { href: '/admin/requests', label: 'Access Requests', icon: <KeyRound className="w-4 h-4" />, badge: '5' },
    { href: '/admin/users', label: 'Users & Roles', icon: <Users className="w-4 h-4" /> },
    { href: '/admin/network', label: 'Network Monitor (ACN)', icon: <Network className="w-4 h-4" /> },
    { href: '/admin/security', label: 'Security & Audit (TIS)', icon: <ShieldAlert className="w-4 h-4" /> },
    { href: '/admin/settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <aside
      className={`h-[calc(100vh-4rem)] sticky top-16 bg-[#07080c] border-r border-white/5 transition-all duration-300 flex flex-col justify-between z-30 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Top Section */}
      <div className="p-3 space-y-4">
        {/* Toggle Collapse Button */}
        <div className="flex items-center justify-between px-2 pt-1">
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-semibold">
                Admin Console
              </span>
              <span className="text-xs font-bold text-white tracking-tight">Governance Portal</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition ml-auto"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                  active
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                } ${collapsed ? 'justify-center' : ''}`}
              >
                <div className="shrink-0">{item.icon}</div>
                {!collapsed && (
                  <div className="flex-1 flex items-center justify-between">
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-black text-[10px] font-bold">
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="p-3 border-t border-white/5 space-y-2">
        <Link
          href="/"
          target="_blank"
          className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-zinc-400 hover:text-white hover:bg-white/5 transition ${
            collapsed ? 'justify-center' : ''
          }`}
          title="Open Public Site in New Tab"
        >
          <ExternalLink className="w-4 h-4 shrink-0" />
          {!collapsed && <span>View Public Site</span>}
        </Link>

        {user && (
          <div
            className={`flex items-center gap-2.5 p-2 rounded-xl bg-zinc-900/60 border border-white/5 ${
              collapsed ? 'justify-center' : ''
            }`}
          >
            <div className="w-7 h-7 rounded-full bg-amber-500 flex items-center justify-center font-bold text-black text-xs shrink-0">
              {user.name.charAt(0)}
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-zinc-200 truncate">{user.name}</p>
                <p className="text-[10px] text-amber-400 font-mono capitalize">{user.role}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
