import React from 'react';
import { VideoTable } from '@/components/admin/VideoTable';
import { mockVideos } from '@/lib/mock/videos';
import { Film } from 'lucide-react';

export default function AdminVideosPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-white/5 pb-6">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 font-semibold uppercase tracking-wider">
          <Film className="w-4 h-4" />
          Asset Catalog Management
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
          Master Video Catalog & Access Control
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Index, edit, and configure DRM access policies for public and protected cinematic media.
        </p>
      </div>

      <VideoTable initialVideos={mockVideos} />
    </div>
  );
}
