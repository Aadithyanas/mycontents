import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { VideoGrid } from '@/components/video/VideoGrid';
import { mockVideos } from '@/lib/mock/videos';
import { mockCategories } from '@/lib/mock/categories';
import { mockUsers } from '@/lib/mock/users';
import {
  Play,
  Shield,
  Lock,
  Network,
  Cpu,
  Sparkles,
  ArrowRight,
  Eye,
  Award,
  Video as VideoIcon,
  CheckCircle2,
  Sliders,
} from 'lucide-react';

export default function HomePage() {
  const creator = mockUsers[0]; // Aadithyan A.S.
  const featuredVideos = mockVideos.filter((v) => v.featured).slice(0, 4);
  const latestVideos = mockVideos.slice(0, 8);

  return (
    <div className="flex flex-col min-h-screen bg-[#07080b]">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-32 border-b border-white/5">
          {/* Subtle Ambient Light Gradients */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-amber-500/15 via-purple-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />
          <div className="absolute top-10 right-10 w-72 h-72 bg-blue-500/10 blur-3xl pointer-events-none rounded-full" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono tracking-wider uppercase font-semibold">
                <Shield className="w-3.5 h-3.5" />
                ACN & TIS Protected Media Platform
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08]">
                CREATIVE WORK. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
                  SECURELY PRESENTED.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                A digital portfolio and protected media platform for showcasing cinematic, commercial, and narrative film work with Zero-Trust RBAC and dynamic forensic watermarking.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
                <Link
                  href="/videos"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-xs bg-amber-500 text-black hover:bg-amber-400 transition shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-black group-hover:scale-110 transition-transform" />
                  Explore Work
                </Link>
                <Link
                  href="/about"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-xs bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 border border-white/10 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  View Creator Profile
                  <ArrowRight className="w-4 h-4 text-zinc-400" />
                </Link>
              </div>

              {/* Hero Stats Ribbon */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-12 max-w-3xl mx-auto border-t border-white/5 text-center">
                <div className="p-3">
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-white">8K / 4K</div>
                  <div className="text-xs text-zinc-500 mt-0.5">Anamorphic Master</div>
                </div>
                <div className="p-3">
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-amber-400">120+</div>
                  <div className="text-xs text-zinc-500 mt-0.5">Commercials & Films</div>
                </div>
                <div className="p-3">
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-white">TLS 1.3</div>
                  <div className="text-xs text-zinc-500 mt-0.5">HTTP/3 QUIC Delivery</div>
                </div>
                <div className="p-3">
                  <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400">Dynamic</div>
                  <div className="text-xs text-zinc-500 mt-0.5">Forensic Watermarking</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CREATOR PROFILE HIGHLIGHT SECTION (Section 8) */}
        <section className="py-20 border-b border-white/5 bg-zinc-950/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Creator Photo / Visual */}
              <div className="lg:col-span-5 relative">
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                  <img
                    src={creator.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800'}
                    alt={creator.name}
                    className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 space-y-1">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-500 text-black font-bold">
                      Director & Cinematographer
                    </span>
                    <h3 className="text-xl font-bold text-white tracking-tight">{creator.name}</h3>
                    <p className="text-xs text-zinc-300">
                      Based in Mumbai & Kerala • Available for worldwide commercial direction
                    </p>
                  </div>
                </div>
              </div>

              {/* Creator Bio & Stats */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider font-semibold">
                    <Sparkles className="w-3.5 h-3.5" />
                    Creative Direction & Visual Engineering
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                    Crafting cinematic narratives with technical precision.
                  </h2>
                  <p className="text-sm text-zinc-400 leading-relaxed pt-1">
                    Specializing in high-altitude 8K natural history, automotive commercial cinematography, and narrative short films. This platform demonstrates a secure media vault architecture designed for festival screener distribution and confidential client cuts.
                  </p>
                </div>

                {/* Core Competencies Pills */}
                <div>
                  <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2.5">
                    Creative Specializations
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Anamorphic 4K/8K Cinematography',
                      'DaVinci Resolve ACEScg Colorist',
                      'Phantom Flex 4K High-Speed at 1000fps',
                      'FPV Drone Cinematography',
                      'Dolby Atmos Sound Mixing',
                      'Nuke & Houdini VFX Pipeline',
                      'Zero-Trust DRM Token Gateways',
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/5 text-xs text-zinc-300 font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Software / Tools */}
                <div>
                  <h4 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2.5">
                    Production Hardware & Suite
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'ARRI Alexa Mini LF',
                      'RED V-Raptor 8K VV',
                      'Cooke Anamorphic /i Prime Lenses',
                      'DJI Inspire 3 (X9-8K Air)',
                      'DaVinci Resolve Studio 19',
                      'Blender 4.3 & Unreal Engine 5.5',
                    ].map((tool) => (
                      <span
                        key={tool}
                        className="px-3 py-1.5 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-amber-300 font-mono"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Creator Stats */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5">
                  <div>
                    <span className="block text-2xl font-bold font-mono text-white">8+</span>
                    <span className="text-xs text-zinc-500">Years in Industry</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-bold font-mono text-white">22</span>
                    <span className="text-xs text-zinc-500">Portfolio Works</span>
                  </div>
                  <div>
                    <span className="block text-2xl font-bold font-mono text-amber-400">14</span>
                    <span className="text-xs text-zinc-500">Festival Selections</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED PROJECTS CAROUSEL / GRID */}
        <section className="py-20 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-amber-400 uppercase tracking-wider font-semibold">
                  Curated Showcase
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                  Featured Masterworks
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                  High-profile automotive commercials, award-winning indie shorts, and 8K expeditions.
                </p>
              </div>

              <Link
                href="/videos"
                className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition"
              >
                View Full Library ({mockVideos.length} Videos)
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <VideoGrid videos={featuredVideos} />
          </div>
        </section>

        {/* CATEGORIES GRID SECTION */}
        <section className="py-20 border-b border-white/5 bg-zinc-950/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider font-semibold">
                Creative Domains
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Explore by Category
              </h2>
              <p className="text-xs text-zinc-400">
                Browse creative archives across commercial film, aerial cinematography, and narrative cinema.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockCategories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/videos?category=${cat.id}`}
                  className="p-6 rounded-2xl bg-zinc-900/60 border border-white/5 hover:border-amber-500/30 hover:bg-zinc-900 transition group flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-amber-400">
                        {cat.videoCount} WORKS
                      </span>
                      <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="font-bold text-base text-zinc-100 group-hover:text-white transition">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* LATEST VIDEO DISCOVERY SECTION */}
        <section className="py-20 border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono text-amber-400 uppercase tracking-wider font-semibold">
                  Recent Releases
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
                  Latest Video Library
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Public discovery reels and protected client cuts available for access request.
                </p>
              </div>

              <Link
                href="/videos"
                className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition"
              >
                Browse All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <VideoGrid videos={latestVideos} />
          </div>
        </section>

        {/* CALL TO ACTION SECTION */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent pointer-events-none" />
          <div className="max-w-4xl mx-auto px-4 text-center space-y-6 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-amber-500 text-black flex items-center justify-center mx-auto shadow-2xl shadow-amber-500/30">
              <Lock className="w-7 h-7" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Require Screener Access for Commercial or Festival Review?
            </h2>
            <p className="text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
              Register an account to request time-bounded access tokens for protected master files. All stream sessions feature dynamic forensic traceability.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/register"
                className="w-full sm:w-auto px-7 py-3 rounded-xl font-semibold text-xs bg-amber-500 text-black hover:bg-amber-400 transition shadow-lg shadow-amber-500/20"
              >
                Register for Access
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-7 py-3 rounded-xl font-semibold text-xs bg-zinc-900 text-zinc-200 hover:bg-zinc-800 border border-white/10 transition"
              >
                Contact Production Team
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
