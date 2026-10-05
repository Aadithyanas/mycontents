'use client';

import React, { useState } from 'react';
import { AccessRequest, RequestStatus } from '@/types';
import { Badge } from '@/components/common/Badge';
import { toast } from 'sonner';
import {
  X,
  User,
  Film,
  Calendar,
  ShieldAlert,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
} from 'lucide-react';

interface RequestReviewModalProps {
  request: AccessRequest | null;
  isOpen: boolean;
  onClose: () => void;
  onActionComplete: (requestId: string, status: RequestStatus, rejectionReason?: string) => void;
}

export function RequestReviewModal({
  request,
  isOpen,
  onClose,
  onActionComplete,
}: RequestReviewModalProps) {
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [processing, setProcessing] = useState(false);

  if (!isOpen || !request) return null;

  const handleApprove = async () => {
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 200));
    onActionComplete(request.id, 'APPROVED');
    toast.success(`Access granted to ${request.user.name} for 7 days.`);
    setProcessing(false);
    onClose();
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      toast.error('Please specify a rejection reason for compliance records.');
      return;
    }
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 200));
    onActionComplete(request.id, 'REJECTED', rejectionReason);
    toast.error(`Access request rejected.`);
    setProcessing(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in-0">
      <div className="relative w-full max-w-xl rounded-2xl glass-dropdown border border-amber-500/30 p-6 shadow-2xl animate-in zoom-in-95 space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Review Access Request
              </h3>
              <p className="text-xs text-zinc-400 font-mono">ID: {request.id}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User & Video Split Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* User Profile Box */}
          <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/5 space-y-2">
            <span className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">
              Requesting Identity
            </span>
            <div className="flex items-center gap-2.5 pt-1">
              {request.user.image ? (
                <img
                  src={request.user.image}
                  alt={request.user.name}
                  className="w-10 h-10 rounded-full object-cover border border-white/10"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                  <User className="w-5 h-5" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-zinc-100 truncate">{request.user.name}</p>
                <p className="text-zinc-400 text-[11px] truncate">{request.user.email}</p>
                <span className="inline-block mt-0.5 text-[10px] font-mono text-amber-400">
                  Role: {request.user.role}
                </span>
              </div>
            </div>
            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-400">
              <span>Past Requests:</span>
              <strong className="text-zinc-200">{request.previousRequestsCount || 1}</strong>
            </div>
          </div>

          {/* Video Box */}
          <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/5 space-y-2">
            <span className="text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">
              Requested Asset
            </span>
            <div className="flex items-center gap-2.5 pt-1">
              <img
                src={request.videoThumbnail}
                alt={request.videoTitle}
                className="w-14 h-10 rounded-lg object-cover border border-white/10 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-zinc-100 truncate">{request.videoTitle}</p>
                <p className="text-zinc-400 text-[11px]">Protected Master Video</p>
                <Badge status={request.status} className="mt-1" />
              </div>
            </div>
            <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-400">
              <span>Risk Assessment:</span>
              <span className="font-bold text-emerald-400 font-mono">
                {request.riskScore || 'LOW'}
              </span>
            </div>
          </div>
        </div>

        {/* Reason Box */}
        <div className="p-4 rounded-xl bg-zinc-900/40 border border-white/5 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-zinc-300">Stated Purpose & Reason</span>
            <div className="flex items-center gap-1 text-[11px] text-zinc-500">
              <Calendar className="w-3 h-3" />
              {new Date(request.requestedAt).toLocaleString()}
            </div>
          </div>
          <p className="text-xs text-zinc-300 leading-relaxed bg-black/30 p-3 rounded-lg border border-white/5">
            &ldquo;{request.reason}&rdquo;
          </p>
        </div>

        {/* Rejection Form view if toggled */}
        {showRejectForm ? (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 space-y-3">
            <div className="flex items-center gap-2 text-rose-300 text-xs font-semibold">
              <AlertTriangle className="w-4 h-4" />
              Specify Mandatory Rejection Reason
            </div>
            <textarea
              rows={2}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="e.g. Active commercial NDA, licensing embargo, or incomplete credentials..."
              className="w-full p-2.5 rounded-lg bg-zinc-900 border border-white/10 text-xs text-zinc-100 focus:outline-none focus:border-rose-500"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowRejectForm(false)}
                className="px-3 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReject}
                disabled={processing}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-rose-600 text-white hover:bg-rose-500 transition"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        ) : (
          /* Normal Action Bar */
          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs text-zinc-400 hover:text-white hover:bg-white/5 transition"
            >
              Close
            </button>

            {request.status === 'PENDING' ? (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowRejectForm(true)}
                  disabled={processing}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-rose-500/15 text-rose-400 hover:bg-rose-500/25 border border-rose-500/30 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  Reject Request
                </button>
                <button
                  type="button"
                  onClick={handleApprove}
                  disabled={processing}
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-emerald-500 text-black hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckCircle className="w-3.5 h-3.5" />
                  Approve (Issue 7-Day Token)
                </button>
              </div>
            ) : (
              <div className="text-xs text-zinc-400 font-mono">
                Already reviewed as{' '}
                <strong className={request.status === 'APPROVED' ? 'text-emerald-400' : 'text-rose-400'}>
                  {request.status}
                </strong>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
