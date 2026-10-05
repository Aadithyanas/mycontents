'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  Film,
  Compass,
  Layers,
  Info,
  Mail,
  Shield,
  LayoutDashboard,
  LogOut,
  LogIn,
  UserPlus,
  Menu,
  X,
  Lock,
} from 'lucide-react';

export function Navbar() {
  const pathname = usePathname();
  const { user, isAuthenticated, role, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home', icon: <Film className="w-4 h-4" /> },
    { href: '/videos', label: 'Video Library', icon: <Compass className="w-4 h-4" /> },
    { href: '/categories', label: 'Categories', icon: <Layers className="w-4 h-4" /> },
    { href: '/about', label: 'About', icon: <Info className="w-4 h-4" /> },
    { href: '/contact', label: 'Contact', icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-white/5 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-purple-500/40 ring-2 ring-purple-500/20 shadow-lg shadow-purple-500/25 group-hover:scale-105 group-hover:ring-purple-400/40 transition-all duration-300 flex-shrink-0 bg-black">
              <Image
                src="/images/logo.jpeg"
                alt="NEUTRAL_FX Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-white flex items-center gap-1 group-hover:text-purple-200 transition-colors">
                NEUTRAL<span className="text-purple-400 font-extrabold">.FX7</span>
              </span>
              <span className="text-[9px] text-zinc-400 tracking-widest uppercase font-semibold font-mono">
                EDIT • EXPRESS • IMPACT
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${active
                    ? 'text-amber-400 bg-amber-400/10'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-2 pl-2">
                {role === 'ADMIN' ? (
                  <Link
                    href="/admin"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-amber-500 text-black hover:bg-amber-400 transition shadow-lg shadow-amber-500/20"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    Admin Panel
                  </Link>
                ) : (
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-zinc-800 text-white hover:bg-zinc-700 border border-white/10 transition"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-amber-400" />
                    Dashboard
                  </Link>
                )}

                <span className="text-xs text-zinc-300 px-2 font-medium">
                  {user?.name}
                </span>

                <button
                  onClick={() => logout()}
                  title="Sign out"
                  className="p-2 text-zinc-400 hover:text-rose-400 hover:bg-white/5 rounded-xl transition cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 pl-2">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/5 transition"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-amber-500 text-black hover:bg-amber-400 transition shadow-lg shadow-amber-500/20"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  Register
                </Link>
                <Link
                  href="/admin/login"
                  title="Administrator Login"
                  className="p-2 text-zinc-500 hover:text-amber-400 hover:bg-white/5 rounded-xl transition"
                >
                  <Lock className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/5 bg-[#090A0F]/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 animate-in fade-in-0 slide-in-from-top-4">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium ${pathname === link.href
                  ? 'text-amber-400 bg-amber-400/10'
                  : 'text-zinc-300 hover:bg-white/5'
                  }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-white/5 space-y-2">
            {isAuthenticated ? (
              <>
                {role === 'ADMIN' ? (
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold bg-amber-500 text-black"
                  >
                    <Shield className="w-4 h-4" />
                    Admin Control Center
                  </Link>
                ) : (
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-medium bg-zinc-800 text-white border border-white/10"
                  >
                    <LayoutDashboard className="w-4 h-4 text-amber-400" />
                    User Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 w-full py-2 rounded-xl text-sm text-rose-400 hover:bg-rose-500/10"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out ({user?.name})
                </button>
              </>
            ) : (
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-medium bg-zinc-800 text-white border border-white/10"
                  >
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-semibold bg-amber-500 text-black"
                  >
                    <UserPlus className="w-4 h-4" />
                    Register
                  </Link>
                </div>
                <Link
                  href="/admin/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2 rounded-xl text-xs font-mono text-amber-400/80 hover:text-amber-300 hover:bg-amber-500/10 border border-amber-500/20"
                >
                  <Lock className="w-3.5 h-3.5" />
                  Administrator Portal (/admin/login)
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
