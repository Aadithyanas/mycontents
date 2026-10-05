import React from 'react';
import { RequestTable } from '@/components/admin/RequestTable';
import { mockAccessRequests } from '@/lib/mock/accessRequests';
import { KeyRound, ShieldCheck } from 'lucide-react';

export default function AdminRequestsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-white/5 pb-6">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold uppercase tracking-wider">
          <KeyRound className="w-4 h-4" />
          Access Authorization Queue
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
          Protected Content Access Requests
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Review incoming screener requests, evaluate user risk assessment scores, and provision temporary 7-day cryptographic DRM tokens.
        </p>
      </div>

      <RequestTable initialRequests={mockAccessRequests} />
    </div>
  );
}
