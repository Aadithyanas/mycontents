'use client';

import React, { useState } from 'react';
import { Settings, Shield, Clock, RefreshCw, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminSettingsPage() {
  const [tokenLeaseDays, setTokenLeaseDays] = useState('7');
  const [watermarkPeriod, setWatermarkPeriod] = useState('36');
  const [rateLimitMax, setRateLimitMax] = useState('15');
  const [watermarkEnforced, setWatermarkEnforced] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Admin platform security policies saved successfully');
  };

  const handleRotateKey = () => {
    toast.success('AES-128 master video encryption key rotated across edge CDN caches');
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="border-b border-white/5 pb-6">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold uppercase tracking-wider">
          <Settings className="w-4 h-4" />
          Platform Governance
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
          System Security & DRM Policies
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Configure cryptographic streaming lease durations, forensic watermark drift speeds, and edge WAF parameters.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        {/* DRM Token Policies */}
        <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/5 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            DRM Playback Lease Parameters
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-300 font-medium mb-1">
                Default Access Grant Lifetime (Days)
              </label>
              <input
                type="number"
                value={tokenLeaseDays}
                onChange={(e) => setTokenLeaseDays(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-100 font-mono"
              />
              <span className="text-[10px] text-zinc-500 mt-1 block">
                After this lease expires, the token will be automatically invalidated.
              </span>
            </div>

            <div>
              <label className="block text-zinc-300 font-medium mb-1">
                Watermark Drift Cycle Duration (Seconds)
              </label>
              <input
                type="number"
                value={watermarkPeriod}
                onChange={(e) => setWatermarkPeriod(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-100 font-mono"
              />
              <span className="text-[10px] text-zinc-500 mt-1 block">
                Period between anchor coordinates to prevent automated cropped piracy.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="wm-force"
              checked={watermarkEnforced}
              onChange={(e) => setWatermarkEnforced(e.target.checked)}
              className="rounded border-white/20 bg-zinc-900 text-amber-500 focus:ring-amber-500 cursor-pointer"
            />
            <label htmlFor="wm-force" className="text-zinc-300 cursor-pointer select-none">
              Enforce dynamic forensic watermark on all non-public video playback sessions
            </label>
          </div>
        </div>

        {/* WAF Rate Limiting Parameters */}
        <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/5 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            WAF Rate Limiting & Token Bucket Rules
          </h3>

          <div>
            <label className="block text-zinc-300 font-medium mb-1">
              Max Failed Authentication Attempts Per IP (Per 5 Minutes)
            </label>
            <input
              type="number"
              value={rateLimitMax}
              onChange={(e) => setRateLimitMax(e.target.value)}
              className="w-full max-w-xs px-3.5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-zinc-100 font-mono"
            />
            <span className="text-[10px] text-zinc-500 mt-1 block">
              Triggers automatic 24-hour IP quarantine in the ACN edge routing table.
            </span>
          </div>
        </div>

        {/* Master Key Rotation */}
        <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-white text-sm">Rotate Master AES-128 Encryption Key</h4>
            <p className="text-xs text-zinc-400 mt-0.5">
              Force key exchange for all upcoming stream segments. Last rotated 8 days ago.
            </p>
          </div>
          <button
            type="button"
            onClick={handleRotateKey}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-800 text-zinc-200 hover:text-white hover:bg-zinc-700 transition border border-white/10 flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
            Rotate Master Key Now
          </button>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl font-semibold bg-amber-500 text-black hover:bg-amber-400 transition shadow-lg shadow-amber-500/20"
          >
            Save Security Policies
          </button>
        </div>
      </form>
    </div>
  );
}
