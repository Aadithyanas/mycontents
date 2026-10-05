'use client';

import React from 'react';
import Link from 'next/link';
import { Video, AccessRequest } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { Lock, ShieldAlert, KeyRound, Clock, XCircle, LogIn, Send } from 'lucide-react';

interface LockedVideoProps {
  video: Video;
  onRequestAccess: () => void;
  userRequest?: AccessRequest | null;
}

export function LockedVideo({ video, onRequestAccess, userRequest }: LockedVideoProps) {
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-[#090A0F] border border-amber-500/20 shadow-2xl flex flex-col items-center justify-center p-6 text-center">
      {/* Blurred background thumbnail for cinematic ambience */}
      <img
        src={video.thumbnailUrl}
        alt={video.title}
        className="absolute inset-0 w-full h-full object-cover filter blur-xl scale-105 opacity-20 pointer-events-none"
      />

      {/* Dark overlay grid */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      {/* Locked State Container */}
      <div className="relative z-10 max-w-md w-full flex flex-col items-center space-y-4">
        {/* Lock Icon */}
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-xl shadow-amber-500/10 animate-pulse">
          <Lock className="w-8 h-8" />
        </div>

        {/* Lock Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-400 text-xs font-mono font-semibold tracking-wider border border-amber-500/30">
            <ShieldAlert className="w-3.5 h-3.5" />
            PROTECTED CREATOR CONTENT
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight pt-1">
            Access Authorization Required
          </h2>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
            This asset is subject to creator confidentiality and client distribution agreements. An approved access grant is required for streaming.
          </p>
        </div>

        {/* Dynamic State Based on Authentication & Request Status */}
        <div className="pt-2 w-full flex flex-col items-center">
          {!isAuthenticated ? (
            <div className="space-y-3 w-full max-w-xs">
              <Link
                href="/login"
                className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-amber-500 text-black hover:bg-amber-400 transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                Sign In to Request Access
              </Link>
              <p className="text-[11px] text-zinc-400">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="text-amber-400 hover:underline">
                  Register here
                </Link>
              </p>
            </div>
          ) : userRequest?.status === 'PENDING' ? (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center space-y-2 w-full">
              <div className="flex items-center justify-center gap-2 text-amber-400 font-semibold text-xs">
                <Clock className="w-4 h-4 animate-spin" />
                Access Request Pending Review
              </div>
              <p className="text-[11px] text-zinc-400 leading-normal">
                Your request was submitted on{' '}
                <strong className="text-zinc-300">
                  {new Date(userRequest.requestedAt).toLocaleDateString()}
                </strong>
                . The creator will review your intended use case shortly.
              </p>
            </div>
          ) : userRequest?.status === 'REJECTED' ? (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-center space-y-2 w-full">
              <div className="flex items-center justify-center gap-2 text-rose-400 font-semibold text-xs">
                <XCircle className="w-4 h-4" />
                Access Request Declined
              </div>
              <p className="text-[11px] text-zinc-400 leading-normal">
                {userRequest.rejectionReason || 'Access restricted under creative rights policy.'}
              </p>
            </div>
          ) : (
            <button
              onClick={onRequestAccess}
              className="py-3 px-6 rounded-xl text-xs font-semibold bg-gradient-to-r from-amber-500 to-amber-400 text-black hover:brightness-110 transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <Send className="w-4 h-4" />
              Request Access to Watch
            </button>
          )}
        </div>

        {/* Security / TIS Policy Tag */}
        <div className="pt-4 border-t border-white/5 w-full flex items-center justify-center gap-3 text-[10px] text-zinc-400 font-mono">
          <span>POLICY: Zero-Trust RBAC</span>
          <span>•</span>
          <span>TOKEN: TLSv1.3 HMAC</span>
          <span>•</span>
          <span>WATERMARK: Mandatory</span>
        </div>
      </div>
    </div>
  );
}
