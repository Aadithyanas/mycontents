import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Film, ArrowLeft, Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-[#07080b]">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 text-center">
        <div className="max-w-md w-full p-8 rounded-3xl glass-dropdown border border-white/10 space-y-5 shadow-2xl">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border border-purple-500/40 ring-2 ring-purple-500/20 mx-auto shadow-xl shadow-purple-500/25 bg-black">
            <Image
              src="/images/logo.jpeg"
              alt="NEUTRAL_FX Logo"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-mono text-amber-400 font-bold tracking-wider">
              ERROR 404
            </span>
            <h1 className="text-2xl font-bold text-white tracking-tight">Frame Missing</h1>
            <p className="text-xs text-zinc-400 leading-relaxed">
              The creative sequence or secure endpoint you requested does not exist in the vault archives.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-semibold bg-amber-500 text-black hover:bg-amber-400 transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Return Home
            </Link>
            <Link
              href="/videos"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-medium bg-zinc-900 text-zinc-300 hover:text-white border border-white/10 transition flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4" />
              Browse Videos
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
