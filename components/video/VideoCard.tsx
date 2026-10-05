'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Video } from '@/types';
import { Badge } from '@/components/common/Badge';
import { Play, Eye, Calendar, Clock } from 'lucide-react';

interface VideoCardProps {
  video: Video;
  priority?: boolean;
}

export function VideoCard({ video }: VideoCardProps) {
  const formattedViews = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(video.views);

  const formattedDate = new Date(video.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="group relative rounded-2xl overflow-hidden bg-zinc-900/60 border border-white/5 hover:border-amber-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5 flex flex-col">
      {/* Thumbnail Container */}
      <Link href={`/videos/${video.id}`} className="relative aspect-video w-full overflow-hidden bg-zinc-950 block">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Duration Badge */}
        <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[11px] font-mono text-zinc-200 border border-white/10 flex items-center gap-1">
          <Clock className="w-3 h-3 text-amber-400" />
          {video.duration}
        </div>

        {/* Access Type Badge */}
        <div className="absolute top-2.5 left-2.5">
          <Badge type={video.accessType} />
        </div>

        {/* Hover Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 rounded-full bg-amber-500 text-black flex items-center justify-center shadow-lg shadow-amber-500/30 transform scale-90 group-hover:scale-100 transition-transform">
            <Play className="w-5 h-5 fill-black ml-0.5" />
          </div>
        </div>
      </Link>

      {/* Content Container */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className="text-[11px] font-medium text-amber-400/90 uppercase tracking-wider">
              {video.categoryName || 'Creative Work'}
            </span>
            <span className="text-[10px] font-mono text-zinc-400">
              {video.resolution.split(' ')[0]}
            </span>
          </div>

          <Link href={`/videos/${video.id}`} className="block">
            <h3 className="font-semibold text-zinc-100 text-sm group-hover:text-amber-400 transition-colors line-clamp-1">
              {video.title}
            </h3>
          </Link>

          <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
            {video.description}
          </p>
        </div>

        {/* Card Footer */}
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-400">
          <div className="flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-zinc-400" />
            <span>{formattedViews} views</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-zinc-400" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
