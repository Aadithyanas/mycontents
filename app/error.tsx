'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled runtime error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#07080b] flex items-center justify-center p-4 text-center">
      <div className="max-w-md w-full p-8 rounded-3xl glass-dropdown border border-rose-500/20 space-y-5 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 mx-auto flex items-center justify-center">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-mono text-rose-400 font-bold tracking-wider">
            RUNTIME EXCEPTION
          </span>
          <h2 className="text-xl font-bold text-white tracking-tight">System Encountered An Error</h2>
          <p className="text-xs text-zinc-400 leading-relaxed">
            {error.message || 'An unexpected streaming or session exception occurred.'}
          </p>
        </div>

        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-amber-500 text-black hover:bg-amber-400 transition flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
          >
            <RefreshCw className="w-4 h-4" />
            Retry Request
          </button>
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl text-xs font-medium bg-zinc-900 text-zinc-300 hover:text-white border border-white/10 transition flex items-center gap-2"
          >
            <Home className="w-4 h-4" />
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
