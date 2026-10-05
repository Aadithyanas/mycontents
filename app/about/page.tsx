import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { mockUsers } from '@/lib/mock/users';
import {
  Film,
  Camera,
  Layers,
  Sparkles,
  Award,
  Calendar,
  Compass,
  ArrowRight,
  Mail,
  Shield,
  Monitor,
  Cpu,
} from 'lucide-react';

export default function AboutPage() {
  const creator = mockUsers[0]; // Aadithyan A.S.

  const timeline = [
    {
      year: '2024 - Present',
      role: 'Creative Director & Founder',
      company: 'Neutral_fx Studio • Mumbai & Kochi',
      description: 'Directing national automotive commercials, 8K natural history expeditions, and architecting Zero-Trust screener distribution pipelines.',
    },
    {
      year: '2021 - 2024',
      role: 'Senior Commercial Cinematographer',
      company: 'SouthLight Motion Media',
      description: 'Operated ARRI LF and Phantom Flex high-speed cameras on 40+ national brand campaigns across automotive, sports, and consumer luxury brands.',
    },
    {
      year: '2018 - 2021',
      role: 'Lead Colorist & Post-Production Supervisor',
      company: 'Chroma Visual Labs',
      description: 'Conformed ACEScg color workflows and Dolby Vision HDR masters for independent regional theatrical features and streaming originals.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#07080b]">
      <Navbar />

      <main className="flex-1 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Hero Profile Block */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left 5 cols: Image & Quick Credentials */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                <img
                  src={creator.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800'}
                  alt={creator.name}
                  className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 space-y-1">
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-500 text-black font-bold">
                    Primary Creator
                  </span>
                  <h2 className="text-2xl font-bold text-white tracking-tight">{creator.name}</h2>
                  <p className="text-xs text-zinc-300">
                    Digital Creator • Video Editor • Motion Designer • Cinematographer
                  </p>
                </div>
              </div>
            </div>

            {/* Right 7 cols: Bio & Philosophy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider font-semibold">
                  <Film className="w-4 h-4" />
                  Creator Biography & Director Profile
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  Storytelling forged with cinematic glass and secure media technology.
                </h1>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed">
                Aadithyan A.S. is an Indian filmmaker, cinematographer, and digital media engineer with over 8 years of production experience across feature films, automotive commercials, and high-altitude visual documentaries.
              </p>

              <p className="text-sm text-zinc-400 leading-relaxed">
                Driven by an obsession with anamorphic optical imperfections, tactile light textures, and technological security, he established Neutral_fx to showcase unreleased master cuts, confidential brand treatments, and festival screeners under Zero-Trust cryptographic governance.
              </p>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/5">
                <div className="p-3.5 rounded-2xl bg-zinc-900/50 border border-white/5">
                  <div className="text-2xl font-bold font-mono text-white">8+</div>
                  <div className="text-xs text-zinc-400 mt-0.5">Years Experience</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-zinc-900/50 border border-white/5">
                  <div className="text-2xl font-bold font-mono text-amber-400">120+</div>
                  <div className="text-xs text-zinc-400 mt-0.5">Commercial Works</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-zinc-900/50 border border-white/5">
                  <div className="text-2xl font-bold font-mono text-white">22</div>
                  <div className="text-xs text-zinc-400 mt-0.5">Master Videos</div>
                </div>
                <div className="p-3.5 rounded-2xl bg-zinc-900/50 border border-white/5">
                  <div className="text-2xl font-bold font-mono text-emerald-400">14</div>
                  <div className="text-xs text-zinc-400 mt-0.5">Festival Screenings</div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <Link
                  href="/contact"
                  className="px-6 py-3 rounded-xl text-xs font-semibold bg-amber-500 text-black hover:bg-amber-400 transition shadow-lg shadow-amber-500/20 flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Initiate Project Inquiry
                </Link>
                <Link
                  href="/videos"
                  className="px-6 py-3 rounded-xl text-xs font-semibold bg-zinc-900 text-zinc-200 hover:bg-zinc-800 border border-white/10 transition"
                >
                  Explore Video Archive
                </Link>
              </div>
            </div>
          </div>

          {/* Technical Suite & Hardware */}
          <div className="p-8 rounded-3xl bg-zinc-950/60 border border-white/5 space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider font-semibold">
                Engineering & Production Suite
              </span>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Camera Arsenal & Post-Production Pipeline
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-zinc-900/40 border border-white/5 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold">
                  <Camera className="w-4 h-4" />
                  Camera Systems
                </div>
                <ul className="text-xs text-zinc-400 space-y-1.5 font-mono">
                  <li>• ARRI Alexa Mini LF Large Format</li>
                  <li>• RED V-Raptor 8K VV Anamorphic</li>
                  <li>• Phantom Flex 4K (1000fps High Speed)</li>
                  <li>• Sony FX6 / FX3 Cinema Line</li>
                  <li>• DJI Inspire 3 X9-8K Aerial Cinema</li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-900/40 border border-white/5 space-y-3">
                <div className="flex items-center gap-2 text-blue-400 text-sm font-semibold">
                  <Monitor className="w-4 h-4" />
                  Post-Production Software
                </div>
                <ul className="text-xs text-zinc-400 space-y-1.5 font-mono">
                  <li>• DaVinci Resolve Studio 19 (Advanced Panels)</li>
                  <li>• Adobe Premiere Pro & After Effects</li>
                  <li>• Foundry Nuke Compositing Suite</li>
                  <li>• SideFX Houdini & Blender 4.3</li>
                  <li>• Pro Tools Ultimate (Dolby Atmos Suite)</li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-zinc-900/40 border border-white/5 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                  <Shield className="w-4 h-4" />
                  Security & Network Stack
                </div>
                <ul className="text-xs text-zinc-400 space-y-1.5 font-mono">
                  <li>• Next.js 16 + React 19 App Architecture</li>
                  <li>• Dynamic Moving Watermarking Engine</li>
                  <li>• HTTP/3 QUIC & TLS 1.3 Streaming</li>
                  <li>• Argon2id & Encrypted JWT Cookies</li>
                  <li>• PostgreSQL & Prisma ORM Data Schema</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Timeline Experience */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white tracking-tight">Professional Journey</h2>
            <div className="space-y-4">
              {timeline.map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-zinc-900/40 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-amber-400 font-semibold">{item.year}</span>
                    <h3 className="text-base font-bold text-white">{item.role}</h3>
                    <p className="text-xs text-zinc-400">{item.company}</p>
                    <p className="text-xs text-zinc-400 mt-2 max-w-2xl leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
