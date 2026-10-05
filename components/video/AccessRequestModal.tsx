'use client';

import React, { useState } from 'react';
import { Video } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { requestsApi } from '@/lib/api/requests';
import { toast } from 'sonner';
import { Lock, X, Shield, Send, AlertCircle } from 'lucide-react';

interface AccessRequestModalProps {
  video: Video;
  isOpen: boolean;
  onClose: () => void;
  onRequestSubmitted: () => void;
}

export function AccessRequestModal({
  video,
  isOpen,
  onClose,
  onRequestSubmitted,
}: AccessRequestModalProps) {
  const { user } = useAuth();
  const [reason, setReason] = useState('');
  const [useCase, setUseCase] = useState('academic');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason || reason.trim().length < 15) {
      setError('Please provide at least 15 characters describing your purpose.');
      return;
    }

    if (!user) {
      toast.error('Please sign in first');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      await requestsApi.submitRequest({
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        userImage: user.image,
        videoId: video.id,
        videoTitle: video.title,
        videoThumbnail: video.thumbnailUrl,
        reason: `[${useCase.toUpperCase()} USE] ${reason.trim()}`,
      });

      toast.success('Request submitted successfully! The creator has been notified.');
      onRequestSubmitted();
      onClose();
    } catch {
      toast.error('Failed to submit access request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in-0">
      <div className="relative w-full max-w-lg rounded-2xl glass-dropdown border border-amber-500/30 p-6 shadow-2xl animate-in zoom-in-95">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Request Video Access Grant
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Secure credentials review for protected media stream
            </p>
          </div>
        </div>

        {/* Video Preview Card */}
        <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 flex items-center gap-3 mb-5">
          <img
            src={video.thumbnailUrl}
            alt={video.title}
            className="w-16 h-10 object-cover rounded-lg border border-white/10"
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-semibold text-zinc-100 truncate">{video.title}</h4>
            <p className="text-[11px] text-zinc-400">{video.categoryName} • {video.duration}</p>
          </div>
        </div>

        {/* Request Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Intended Purpose / Evaluation Scope
            </label>
            <select
              value={useCase}
              onChange={(e) => setUseCase(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
            >
              <option value="academic">Academic / Technical Research (FTII / University)</option>
              <option value="commercial">Commercial Licensing / Brand Campaign Review</option>
              <option value="festival">Film Festival Curation / Panorama Screener</option>
              <option value="post-production">Color Grading / Sound Design Reference</option>
              <option value="other">Other Professional Evaluation</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-300 mb-1.5">
              Detailed Reason for Access
            </label>
            <textarea
              rows={4}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Explain how you intend to utilize this creative asset, your organization/role, and timeframe required..."
              className="w-full px-3 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-zinc-200 focus:outline-none focus:border-amber-500 placeholder:text-zinc-600 resize-none"
            />
            <span className="text-[10px] text-zinc-400 mt-1 block">
              Minimum 15 characters. All requests are logged in the TIS security audit ledger.
            </span>
          </div>

          {/* Forensic Notice */}
          <div className="p-3 rounded-xl bg-amber-500/[0.05] border border-amber-500/15 text-[11px] text-zinc-400 flex items-start gap-2">
            <Shield className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
            <span>
              If approved, stream playback is watermarked with your identity (<strong className="text-zinc-300">{user?.name}</strong>) for copyright protection and forensic verification.
            </span>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/5 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-amber-500 text-black hover:bg-amber-400 transition shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              {isSubmitting ? 'Submitting...' : 'Send Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
