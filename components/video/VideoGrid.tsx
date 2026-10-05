'use client';

import React from 'react';
import { Video } from '@/types';
import { VideoCard } from './VideoCard';
import { VideoCardSkeleton } from '@/components/common/SkeletonLoader';
import { Film } from 'lucide-react';

interface VideoGridProps {
  videos: Video[];
  isLoading?: boolean;
  emptyMessage?: string;
}

export function VideoGrid({ videos, isLoading = false, emptyMessage = 'No videos found matching your criteria.' }: VideoGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <VideoCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="rounded-2xl border border-white/5 bg-zinc-900/30 p-12 text-center flex flex-col items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-zinc-800/80 flex items-center justify-center text-zinc-500 mb-3">
          <Film className="w-6 h-6" />
        </div>
        <h4 className="text-zinc-300 font-medium text-sm">No Videos Available</h4>
        <p className="text-xs text-zinc-500 mt-1 max-w-sm">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
