import React from 'react';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return <div className={`animate-pulse bg-zinc-800/60 rounded-lg ${className}`} />;
}

export function VideoCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-zinc-900/40 border border-white/5 p-3 flex flex-col space-y-3">
      <Skeleton className="w-full aspect-video rounded-xl" />
      <div className="flex justify-between items-center pt-1">
        <Skeleton className="h-4 w-20 rounded-full" />
        <Skeleton className="h-4 w-12 rounded" />
      </div>
      <Skeleton className="h-5 w-4/5 rounded" />
      <Skeleton className="h-3 w-full rounded" />
      <div className="flex justify-between items-center pt-2 border-t border-white/5">
        <Skeleton className="h-3 w-24 rounded" />
        <Skeleton className="h-3 w-16 rounded" />
      </div>
    </div>
  );
}

export function TableRowSkeleton({ cols = 6 }: { cols?: number }) {
  return (
    <tr className="border-b border-white/5 animate-pulse">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="py-4 px-4">
          <Skeleton className="h-4 w-full rounded" />
        </td>
      ))}
    </tr>
  );
}

export function StatsCardSkeleton() {
  return (
    <div className="rounded-2xl bg-zinc-900/50 border border-white/5 p-6 flex flex-col space-y-3">
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-28 rounded" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
      <Skeleton className="h-8 w-20 rounded" />
      <Skeleton className="h-3 w-36 rounded" />
    </div>
  );
}
