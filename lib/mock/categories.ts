import { Category } from '@/types';

export const mockCategories: Category[] = [
  {
    id: 'cat-1',
    name: 'Cinematic Travel & Landscapes',
    slug: 'cinematic-travel',
    description: 'High-production 8K and 4K aerial, nature, and cultural expeditions across the subcontinent.',
    icon: 'Compass',
    videoCount: 5,
  },
  {
    id: 'cat-2',
    name: 'Brand & Commercial Films',
    slug: 'commercials',
    description: 'Automotive, luxury lifestyle, and consumer electronics advertising campaigns.',
    icon: 'Briefcase',
    videoCount: 4,
  },
  {
    id: 'cat-3',
    name: 'Narrative Short Films',
    slug: 'short-films',
    description: 'Fiction, indie festival cinema, and emotional dramatic storytelling.',
    icon: 'Film',
    videoCount: 4,
  },
  {
    id: 'cat-4',
    name: 'Music & Performance Videos',
    slug: 'music-videos',
    description: 'High-energy choreography, music festival sets, and studio acoustic sessions.',
    icon: 'Music',
    videoCount: 3,
  },
  {
    id: 'cat-5',
    name: 'Motion Graphics & 3D Reels',
    slug: 'motion-graphics',
    description: 'Futuristic title sequences, UI animations, and Octane/Blender concept showcases.',
    icon: 'Layers',
    videoCount: 3,
  },
  {
    id: 'cat-6',
    name: 'VFX & Color Grading Breakdown',
    slug: 'vfx-color',
    description: 'Pre-production previz, DaVinci Resolve color passes, and compositing breakdowns.',
    icon: 'Sparkles',
    videoCount: 3,
  },
];
