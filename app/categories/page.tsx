import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { mockCategories } from '@/lib/mock/categories';
import { mockVideos } from '@/lib/mock/videos';
import { VideoCard } from '@/components/video/VideoCard';
import { Layers, ArrowRight } from 'lucide-react';

export default function CategoriesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#07080b]">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="space-y-2 border-b border-white/5 pb-8">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider font-semibold">
              <Layers className="w-4 h-4" />
              Creative Taxonomy
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Portfolio Categories & Disciplines
            </h1>
            <p className="text-sm text-zinc-400 max-w-2xl leading-relaxed">
              Explore specialized filmmaking portfolios categorized by discipline, narrative scope, and production methodology.
            </p>
          </div>

          {/* Categories Sections with Video Samples */}
          <div className="space-y-16">
            {mockCategories.map((category) => {
              const categoryVideos = mockVideos.filter((v) => v.categoryId === category.id).slice(0, 3);
              return (
                <div key={category.id} className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-3 border-b border-white/5">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {category.name}
                      </h2>
                      <p className="text-xs text-zinc-400 mt-1 max-w-xl">
                        {category.description}
                      </p>
                    </div>

                    <Link
                      href={`/videos?category=${category.id}`}
                      className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition whitespace-nowrap"
                    >
                      View All {category.name} ({category.videoCount})
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryVideos.map((video) => (
                      <VideoCard key={video.id} video={video} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
