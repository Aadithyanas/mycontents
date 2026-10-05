'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { DashboardNav } from '@/components/navigation/DashboardNav';
import { Badge } from '@/components/common/Badge';
import { useAuth } from '@/context/AuthContext';
import { requestsApi } from '@/lib/api/requests';
import { AccessRequest } from '@/types';
import { KeyRound, Play, Clock, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export default function UserRequestsPage() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<AccessRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRequests() {
      if (!user) return;
      setLoading(true);
      const res = await requestsApi.getUserRequests(user.id);
      setRequests(res);
      setLoading(false);
    }
    loadRequests();
  }, [user]);

  return (
    <div className="flex flex-col min-h-screen bg-[#07080b]">
      <Navbar />

      <main className="flex-1 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header */}
          <div className="space-y-1 border-b border-white/5 pb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              My Access Requests
            </h1>
            <p className="text-xs text-zinc-400">
              Track the status of your temporary streaming grants and screener reviews.
            </p>
          </div>

          <DashboardNav />

          {/* Requests Table */}
          <div className="rounded-2xl border border-white/5 overflow-hidden bg-zinc-900/40 backdrop-blur-md shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-white/5 bg-zinc-950/60 text-zinc-400 font-semibold uppercase text-[10px] tracking-wider">
                    <th className="py-3.5 px-4">Video Asset</th>
                    <th className="py-3.5 px-4">Requested Date</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Reviewed Date & By</th>
                    <th className="py-3.5 px-4">Reason & Notes</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-zinc-500">
                        Loading your access requests...
                      </td>
                    </tr>
                  ) : requests.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-zinc-500 space-y-2">
                        <KeyRound className="w-6 h-6 mx-auto text-zinc-600 mb-2" />
                        <p className="text-zinc-300 font-medium">No Access Requests Found</p>
                        <p className="text-xs text-zinc-500">You have not requested access to any protected content yet.</p>
                      </td>
                    </tr>
                  ) : (
                    requests.map((req) => (
                      <tr key={req.id} className="hover:bg-white/[0.02] transition">
                        {/* Video */}
                        <td className="py-3.5 px-4 max-w-xs">
                          <div className="flex items-center gap-3">
                            <img
                              src={req.videoThumbnail}
                              alt={req.videoTitle}
                              className="w-12 h-8 rounded-lg object-cover border border-white/10 shrink-0"
                            />
                            <div className="min-w-0">
                              <span className="font-semibold text-zinc-200 truncate block">
                                {req.videoTitle}
                              </span>
                              <span className="text-[10px] text-zinc-500 font-mono">
                                ID: {req.videoId}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Requested Date */}
                        <td className="py-3.5 px-4 font-mono text-zinc-400 text-[11px] whitespace-nowrap">
                          {new Date(req.requestedAt).toLocaleDateString()}
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <Badge status={req.status} />
                        </td>

                        {/* Reviewed Date */}
                        <td className="py-3.5 px-4 whitespace-nowrap text-[11px]">
                          {req.reviewedAt ? (
                            <div>
                              <span className="text-zinc-300 font-mono">
                                {new Date(req.reviewedAt).toLocaleDateString()}
                              </span>
                              <div className="text-[10px] text-zinc-500">by {req.reviewedBy}</div>
                            </div>
                          ) : (
                            <span className="text-zinc-600 font-mono">Pending Review</span>
                          )}
                        </td>

                        {/* Reason & Notes */}
                        <td className="py-3.5 px-4 max-w-sm">
                          <p className="text-zinc-400 text-[11px] truncate">
                            {req.reason}
                          </p>
                          {req.rejectionReason && (
                            <p className="text-[10px] text-rose-400 mt-0.5 truncate">
                              Note: {req.rejectionReason}
                            </p>
                          )}
                        </td>

                        {/* Action */}
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          {req.status === 'APPROVED' ? (
                            <Link
                              href={`/videos/${req.videoId}`}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500 text-black hover:bg-emerald-400 transition shadow-sm"
                            >
                              <Play className="w-3 h-3 fill-black" />
                              Watch Stream
                            </Link>
                          ) : (
                            <Link
                              href={`/videos/${req.videoId}`}
                              className="inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-white"
                            >
                              View Asset
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
