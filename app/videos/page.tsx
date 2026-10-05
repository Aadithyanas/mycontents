'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { VideoGrid } from '@/components/video/VideoGrid';
import { videosApi, VideoFilters } from '@/lib/api/videos';
import { mockCategories } from '@/lib/mock/categories';
import { Video, AccessType } from '@/types';
import { Search, Filter, SlidersHorizontal, Film, Compass } from 'lucide-react';

export default function VideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAccess, setSelectedAccess] = useState<AccessType | 'ALL'>('ALL');
  const [sortBy, setSortBy] = useState<'featured' | 'latest' | 'popular' | 'duration'>('featured');

  useEffect(() => {
    async function loadVideos() {
      setLoading(true);
      const res = await videosApi.getVideos({
        search,
        category: selectedCategory,
        accessType: selectedAccess,
        sort: sortBy,
      });
      setVideos(res);
      setLoading(false);
    }
    loadVideos();
  }, [search, selectedCategory, selectedAccess, sortBy]);

  return (
    <div className="flex flex-col min-h-screen bg-[#07080b]">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Header */}
          <div className="space-y-2 border-b border-white/5 pb-8">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider font-semibold">
              <Compass className="w-4 h-4" />
              Creator Archives & Protected Vault
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Public & Protected Video Library
            </h1>
            <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
              Explore public creative projects, or request cryptographic time-bounded streaming access to protected commercial and festival screener master cuts.
            </p>
          </div>

          {/* Controls Bar */}
          <div className="p-4 rounded-2xl glass-dropdown border border-white/5 space-y-4">
            {/* Top row: Search & Sort */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="relative w-full sm:w-96">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by title, equipment, or tags..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500 transition"
                />
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Sort By:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-white/10 text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
                  >
                    <option value="featured">Featured First</option>
                    <option value="latest">Latest Releases</option>
                    <option value="popular">Most Viewed</option>
                    <option value="duration">Longest Runtime</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Filter Pills: Categories */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
              <span className="text-[11px] font-semibold text-zinc-500 uppercase mr-1 whitespace-nowrap">
                Category:
              </span>
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-amber-500 text-black font-semibold'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-white/5'
                }`}
              >
                All Works ({videos.length})
              </button>
              {mockCategories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition cursor-pointer ${
                    selectedCategory === c.id
                      ? 'bg-amber-500 text-black font-semibold'
                      : 'bg-zinc-900/80 text-zinc-400 hover:text-white border border-white/5'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>

            {/* Filter Pills: Access Tier */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs border-t border-white/5 pt-3">
              <span className="text-[11px] font-semibold text-zinc-500 uppercase mr-1 whitespace-nowrap">
                Access Tier:
              </span>
              {(['ALL', 'PUBLIC', 'LOGIN_REQUIRED', 'REQUEST_ACCESS', 'PRIVATE'] as const).map(
                (acc) => (
                  <button
                    key={acc}
                    onClick={() => setSelectedAccess(acc)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono transition cursor-pointer ${
                      selectedAccess === acc
                        ? 'bg-white/10 text-amber-400 font-bold border border-amber-500/40'
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                  >
                    {acc.replace('_', ' ')}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Video Grid */}
          <VideoGrid videos={videos} isLoading={loading} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
