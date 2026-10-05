'use client';

import React, { useState } from 'react';
import { AccessRequest, RequestStatus } from '@/types';
import { Badge } from '@/components/common/Badge';
import { RequestReviewModal } from './RequestReviewModal';
import { requestsApi } from '@/lib/api/requests';
import { Search, Filter, ShieldCheck, Eye, CheckCircle2, Clock } from 'lucide-react';

interface RequestTableProps {
  initialRequests: AccessRequest[];
}

export function RequestTable({ initialRequests }: RequestTableProps) {
  const [requests, setRequests] = useState<AccessRequest[]>(initialRequests);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | RequestStatus>('ALL');
  const [selectedRequest, setSelectedRequest] = useState<AccessRequest | null>(null);

  const filtered = requests.filter((r) => {
    const matchesSearch =
      r.user.name.toLowerCase().includes(search.toLowerCase()) ||
      r.user.email.toLowerCase().includes(search.toLowerCase()) ||
      r.videoTitle.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleActionComplete = async (requestId: string, status: RequestStatus, rejectionReason?: string) => {
    const updated = await requestsApi.updateRequestStatus(requestId, status, 'Aadithyan A.S.', rejectionReason);
    setRequests((prev) => prev.map((r) => (r.id === requestId ? updated : r)));
  };

  return (
    <div className="space-y-4">
      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by user or video..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-zinc-900/80 border border-white/10 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500 transition"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {(['ALL', 'PENDING', 'APPROVED', 'REJECTED', 'EXPIRED'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                statusFilter === st
                  ? 'bg-amber-500 text-black font-semibold'
                  : 'bg-zinc-900/60 text-zinc-400 hover:text-white border border-white/5'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Requests Table */}
      <div className="rounded-2xl border border-white/5 overflow-hidden bg-zinc-900/40 backdrop-blur-md shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/5 bg-zinc-950/60 text-zinc-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-3.5 px-4">User</th>
                <th className="py-3.5 px-4">Requested Video</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Requested Date</th>
                <th className="py-3.5 px-4">Risk Indicator</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-zinc-500">
                    No access requests found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((req) => (
                  <tr
                    key={req.id}
                    className="hover:bg-white/[0.02] transition cursor-pointer"
                    onClick={() => setSelectedRequest(req)}
                  >
                    {/* User */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={
                            req.user.image ||
                            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'
                          }
                          alt={req.user.name}
                          className="w-8 h-8 rounded-full object-cover border border-white/10"
                        />
                        <div>
                          <p className="font-semibold text-zinc-200">{req.user.name}</p>
                          <p className="text-[11px] text-zinc-500 font-mono">{req.user.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Video */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="flex items-center gap-2">
                        <img
                          src={req.videoThumbnail}
                          alt={req.videoTitle}
                          className="w-10 h-7 rounded object-cover border border-white/10 shrink-0"
                        />
                        <span className="font-medium text-zinc-300 truncate">{req.videoTitle}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <Badge status={req.status} />
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-zinc-400 font-mono text-[11px]">
                      {new Date(req.requestedAt).toLocaleDateString()}
                    </td>

                    {/* Risk */}
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <ShieldCheck className="w-3 h-3" />
                        {req.riskScore || 'LOW'}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedRequest(req);
                        }}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/10 text-amber-400 hover:bg-amber-500 hover:text-black transition border border-amber-500/20 cursor-pointer"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal */}
      <RequestReviewModal
        request={selectedRequest}
        isOpen={!!selectedRequest}
        onClose={() => setSelectedRequest(null)}
        onActionComplete={handleActionComplete}
      />
    </div>
  );
}
