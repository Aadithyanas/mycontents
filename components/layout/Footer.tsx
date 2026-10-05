import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Film, Shield, Network, Cpu, Lock, Terminal, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-[#050608] text-zinc-400 text-xs">
      {/* Engineering Pillars Banner */}
      <div className="border-b border-white/5 py-6 bg-zinc-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-zinc-200 font-semibold text-xs">Web Technology</h4>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  Next.js App Router, React 19, TypeScript, Tailwind CSS, and Framer Motion micro-interactions.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Network className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-zinc-200 font-semibold text-xs">Advanced Computer Networks (ACN)</h4>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  HTTP/3 QUIC, TLS 1.3 streaming chunks, ABR bitrates, network latency, and throughput telemetry.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-zinc-200 font-semibold text-xs">Technology & Information Security (TIS)</h4>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  RBAC gatekeeping, temporary token access, Argon2/Bcrypt, and dynamic forensic traceability watermarking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Mission */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-purple-500/40 ring-1 ring-purple-500/20 flex-shrink-0 bg-black">
                <Image
                  src="/images/logo.jpeg"
                  alt="NEUTRAL_FX Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white text-sm tracking-tight flex items-center gap-1">
                  NEUTRAL<span className="text-purple-400 font-extrabold">.FX7</span>
                </span>
                <span className="text-[9px] text-zinc-400 font-mono tracking-widest uppercase">
                  EDIT • EXPRESS • IMPACT
                </span>
              </div>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Secure digital portfolio and protected media streaming system built for cinematic filmmakers, clients, and verified viewers.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                System Operational
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">TLS 1.3 AES-GCM</span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h5 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider mb-3">Explore</h5>
            <ul className="space-y-2">
              <li><Link href="/videos" className="hover:text-amber-400 transition">Video Discovery Library</Link></li>
              <li><Link href="/categories" className="hover:text-amber-400 transition">Portfolio Categories</Link></li>
              <li><Link href="/about" className="hover:text-amber-400 transition">About Aadithyan A.S.</Link></li>
              <li><Link href="/contact" className="hover:text-amber-400 transition">Inquiry & Collaboration</Link></li>
            </ul>
          </div>

          {/* Security & Access */}
          <div>
            <h5 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider mb-3">Security & Governance</h5>
            <ul className="space-y-2">
              <li><Link href="/admin/security" className="hover:text-amber-400 transition">Security Audit Logs</Link></li>
              <li><Link href="/admin/network" className="hover:text-amber-400 transition">ACN Network Telemetry</Link></li>
              <li><Link href="/dashboard/requests" className="hover:text-amber-400 transition">Access Request Gateway</Link></li>
              <li><Link href="/admin/login" className="hover:text-amber-400 transition text-amber-400/90 font-medium">Administrator Login (/admin/login)</Link></li>
            </ul>
          </div>

          {/* Forensic Watermark Notice */}
          <div className="p-4 rounded-xl bg-amber-500/[0.04] border border-amber-500/10 space-y-2">
            <div className="flex items-center gap-1.5 text-amber-400 font-medium text-xs">
              <Lock className="w-3.5 h-3.5" />
              Forensic Traceability Notice
            </div>
            <p className="text-[11px] text-zinc-400 leading-normal">
              Protected videos stream with client-bound dynamic watermarking displaying viewer credentials and cryptographic session tokens. Used for copyright deterrence and forensic leak attribution.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[11px] text-zinc-400">
            © {new Date().getFullYear()} Neutral_fx Media Platform. Academic Project Demonstration (Web Tech + ACN + TIS).
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-zinc-400 font-mono">Lead Creator: Aadithyan A.S.</span>
            <span className="text-zinc-700">•</span>
            <span className="text-zinc-400 font-mono">Next.js 16 + React 19</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
