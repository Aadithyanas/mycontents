import { Video, AccessType } from '@/types';
import { mockVideos } from '@/lib/mock/videos';

// Client-side cache / mutable in-memory state for development demo
let videosState: Video[] = [...mockVideos];

export interface VideoFilters {
  search?: string;
  category?: string;
  accessType?: AccessType | 'ALL';
  sort?: 'featured' | 'latest' | 'popular' | 'duration';
}

export const videosApi = {
  async getVideos(filters: VideoFilters = {}): Promise<Video[]> {
    try {
      const res = await fetch('/api/videos');
      if (res.ok) {
        const data = await res.json();
        if (data.videos && data.videos.length > 0) {
          videosState = data.videos;
        }
      }
    } catch {
      // use cached videosState
    }

    let list = [...videosState];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.description.toLowerCase().includes(q) ||
          v.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (filters.category && filters.category !== 'all') {
      const cat = filters.category.toLowerCase();
      list = list.filter((v) => v.categoryId === filters.category || v.categoryName?.toLowerCase() === cat);
    }

    if (filters.accessType && filters.accessType !== 'ALL') {
      list = list.filter((v) => v.accessType === filters.accessType);
    }

    if (filters.sort) {
      if (filters.sort === 'featured') {
        list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      } else if (filters.sort === 'latest') {
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      } else if (filters.sort === 'popular') {
        list.sort((a, b) => b.views - a.views);
      } else if (filters.sort === 'duration') {
        list.sort((a, b) => b.durationSeconds - a.durationSeconds);
      }
    }

    return list;
  },

  async getVideoById(id: string): Promise<Video | null> {
    const list = await this.getVideos();
    const video = list.find((v) => v.id === id || v.slug === id);
    return video || null;
  },

  async getFeaturedVideos(): Promise<Video[]> {
    const list = await this.getVideos();
    return list.filter((v) => v.featured);
  },

  async getRelatedVideos(id: string, limit = 4): Promise<Video[]> {
    const list = await this.getVideos();
    const current = list.find((v) => v.id === id);
    if (!current) return list.slice(0, limit);
    return list
      .filter((v) => v.id !== id && (v.categoryId === current.categoryId || v.accessType === current.accessType))
      .slice(0, limit);
  },

  async createVideo(video: Omit<Video, 'id' | 'createdAt' | 'updatedAt' | 'views'>): Promise<Video> {
    try {
      const res = await fetch('/api/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(video),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.video) {
          videosState = [data.video, ...videosState];
          return data.video;
        }
      }
    } catch (e) {
      console.warn('API video creation error, saving locally:', e);
    }

    const newVideo: Video = {
      ...video,
      id: `vid-${Date.now().toString().slice(-4)}`,
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    videosState = [newVideo, ...videosState];
    return newVideo;
  },

  async updateVideo(id: string, updates: Partial<Video>): Promise<Video> {
    const index = videosState.findIndex((v) => v.id === id);
    if (index === -1) throw new Error('Video not found');
    videosState[index] = {
      ...videosState[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return videosState[index];
  },

  async deleteVideo(id: string): Promise<boolean> {
    try {
      await fetch(`/api/videos?id=${id}`, { method: 'DELETE' });
    } catch (err) {
      console.warn('Delete video API error:', err);
    }
    videosState = videosState.filter((v) => v.id !== id);
    return true;
  },
};
