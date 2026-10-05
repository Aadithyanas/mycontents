'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { mockUsers } from '@/lib/mock/users';
import {
  ShieldCheck,
  UserCheck,
  Eye,
  ChevronDown,
  Check,
  User as UserIcon,
  Crown,
  Users as UsersGroupIcon,
} from 'lucide-react';

export function RoleSwitcher() {
  const { role, switchDemoUser, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // Key user personas to demonstrate multi-user login
  const adminUser = mockUsers.find((u) => u.role === 'ADMIN') || mockUsers[0];
  const demoUsers = [
    {
      id: 'usr-client-4',
      name: 'Priya Patel',
      title: 'Brand Creative Director',
      badge: 'Client / Agency',
      desc: 'Submits commercial screener requests; views approved 4K streams with dynamic forensic watermarking.',
    },
    {
      id: 'usr-reviewer-5',
      name: 'Vikram Sen',
      title: 'Film Festival Curator',
      badge: 'Festival Jury',
      desc: 'Independent festival screener reviewer; pending and approved indie film access passes.',
    },
    {
      id: 'usr-student-6',
      name: 'Divya Krishnan',
      title: 'Cinematography Scholar (FTII)',
      badge: 'Academic / Student',
      desc: 'Academic researcher studying anamorphic lens characteristics and behind-the-scenes passes.',
    },
    {
      id: 'usr-reviewer-2',
      name: 'Rahul Sharma',
      title: 'Senior VFX Artist & Industry Reviewer',
      badge: 'Industry Reviewer',
      desc: 'Technical collaborator evaluating motion graphics pipelines and visual effects breakdowns.',
    },
  ];

  const getButtonLabel = () => {
    if (role === 'ADMIN') {
      return (
        <span className="flex items-center gap-1.5 text-amber-400">
          <Crown className="w-3.5 h-3.5" />
          <span className="font-semibold">Admin (Aadithyan A.S.)</span>
        </span>
      );
    }
    if (role === 'USER') {
      return (
        <span className="flex items-center gap-1.5 text-blue-400">
          <UserCheck className="w-3.5 h-3.5" />
          <span>User: <strong className="font-semibold">{user?.name || 'Registered User'}</strong></span>
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1.5 text-zinc-400">
        <Eye className="w-3.5 h-3.5" />
        <span>Guest (Public Visitor)</span>
      </span>
    );
  };

  const getButtonBorder = () => {
    if (role === 'ADMIN') return 'border-amber-500/40 bg-amber-500/10 hover:border-amber-500/60';
    if (role === 'USER') return 'border-blue-500/40 bg-blue-500/10 hover:border-blue-500/60';
    return 'border-zinc-700 bg-zinc-900/60 hover:border-zinc-600';
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 cursor-pointer shadow-sm ${getButtonBorder()}`}
        title="Identity & RBAC Role Switcher"
      >
        {getButtonLabel()}
        <ChevronDown className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-84 sm:w-96 rounded-2xl glass-dropdown p-3 shadow-2xl z-50 animate-in fade-in-0 zoom-in-95 border border-white/10 bg-zinc-950/95 backdrop-blur-xl">
            {/* Header */}
            <div className="px-2 py-2 border-b border-white/10 mb-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                  Identity & Role Switcher
                </span>
                <span className="text-[10px] text-zinc-400 font-mono">RBAC + Multi-User</span>
              </div>
              <p className="text-xs text-zinc-300 mt-1 leading-snug">
                <strong className="text-amber-300 font-semibold">Aadithyan A.S.</strong> is the sole Creator & Admin. Multiple users can log in as clients/viewers to access his protected work.
              </p>
            </div>

            <div className="max-h-[70vh] overflow-y-auto space-y-3 pr-1">
              {/* SECTION 1: SOLE CREATOR & ADMIN */}
              <div>
                <div className="px-2 pb-1 text-[10px] uppercase font-semibold text-amber-400/80 tracking-wider flex items-center gap-1.5">
                  <Crown className="w-3 h-3 text-amber-400" />
                  Portfolio Creator & Admin
                </div>
                <button
                  onClick={() => {
                    switchDemoUser(adminUser.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl transition flex items-start gap-2.5 cursor-pointer border ${
                    role === 'ADMIN'
                      ? 'bg-amber-500/10 border-amber-500/40 text-amber-100 shadow-sm'
                      : 'hover:bg-zinc-800/50 border-white/5 text-zinc-300'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-white">{adminUser.name}</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono font-semibold">
                          OWNER / ADMIN
                        </span>
                      </div>
                      {role === 'ADMIN' && <Check className="w-4 h-4 text-amber-400" />}
                    </div>
                    <p className="text-[11px] text-amber-200/70 font-medium mt-0.5">
                      {adminUser.title}
                    </p>
                    <p className="text-[10px] text-zinc-400 mt-1 leading-tight">
                      Full administrative control, video management, access request approvals, ACN network telemetry & TIS audit security logs.
                    </p>
                  </div>
                </button>
              </div>

              {/* SECTION 2: MULTIPLE REGISTERED USERS */}
              <div>
                <div className="px-2 pb-1 text-[10px] uppercase font-semibold text-blue-400/80 tracking-wider flex items-center gap-1.5">
                  <UsersGroupIcon className="w-3 h-3 text-blue-400" />
                  Multiple Users (Login as Different Viewers)
                </div>
                <div className="space-y-1.5">
                  {demoUsers.map((u) => {
                    const isSelected = role === 'USER' && user?.id === u.id;
                    return (
                      <button
                        key={u.id}
                        onClick={() => {
                          switchDemoUser(u.id);
                          setIsOpen(false);
                        }}
                        className={`w-full text-left p-2.5 rounded-xl transition flex items-start gap-2.5 cursor-pointer border ${
                          isSelected
                            ? 'bg-blue-500/10 border-blue-500/40 text-blue-100 shadow-sm'
                            : 'hover:bg-zinc-800/50 border-white/5 text-zinc-300'
                        }`}
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                          <UserIcon className="w-4 h-4 text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-semibold text-zinc-100">{u.name}</span>
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300 font-mono">
                                {u.badge}
                              </span>
                            </div>
                            {isSelected && <Check className="w-4 h-4 text-blue-400" />}
                          </div>
                          <p className="text-[11px] text-zinc-400 mt-0.5">{u.title}</p>
                          <p className="text-[10px] text-zinc-400 mt-1 leading-tight line-clamp-2">
                            {u.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 3: PUBLIC VISITOR (GUEST) */}
              <div>
                <div className="px-2 pb-1 text-[10px] uppercase font-semibold text-zinc-400 tracking-wider flex items-center gap-1.5">
                  <Eye className="w-3 h-3 text-zinc-400" />
                  Unauthenticated Visitor
                </div>
                <button
                  onClick={() => {
                    switchDemoUser('GUEST');
                    setIsOpen(false);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl transition flex items-start gap-2.5 cursor-pointer border ${
                    role === 'GUEST'
                      ? 'bg-zinc-800 border-white/20 text-white shadow-sm'
                      : 'hover:bg-zinc-800/40 border-white/5 text-zinc-400'
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-zinc-800/80 border border-zinc-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Eye className="w-4 h-4 text-zinc-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-zinc-200">Public Visitor (Guest)</span>
                      {role === 'GUEST' && <Check className="w-4 h-4 text-zinc-300" />}
                    </div>
                    <p className="text-[10px] text-zinc-400 mt-1 leading-tight">
                      Browse public portfolio reels freely; sees security lock overlays on protected videos prompting login or access request.
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Active Session Info */}
            <div className="mt-3 pt-2.5 border-t border-white/10 px-2 flex items-center justify-between text-[11px]">
              <div className="text-zinc-400 truncate">
                Active: <span className="font-semibold text-zinc-200">{user?.name || 'Guest'}</span>
                {user?.email && <span className="text-[10px] text-zinc-400 ml-1">({user.email})</span>}
              </div>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                {role}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

