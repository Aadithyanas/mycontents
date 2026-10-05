'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Video, AccessType } from '@/types';
import { Badge } from '@/components/common/Badge';
import { videosApi } from '@/lib/api/videos';
import { mockCategories } from '@/lib/mock/categories';
import { toast } from 'sonner';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Eye,
  Lock,
  X,
  Film,
  Sparkles,
  ExternalLink,
  Upload,
  Cloud,
  HardDrive,
  CheckCircle2,
  RefreshCw,
  Clock,
  Tag,
  ImageIcon,
} from 'lucide-react';

// Helper: format seconds to MM:SS or HH:MM:SS
const formatSecondsToTime = (totalSeconds: number): string => {
  const sec = Math.round(totalSeconds);
  if (isNaN(sec) || sec < 0) return '00:00';
  const hours = Math.floor(sec / 3600);
  const minutes = Math.floor((sec % 3600) / 60);
  const seconds = sec % 60;
  if (hours > 0) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

// Helper: parse MM:SS or HH:MM:SS string to total seconds
const parseTimeToSeconds = (timeStr: string): number => {
  if (!timeStr) return 120;
  const parts = timeStr.trim().split(':').map((p) => parseInt(p, 10));
  if (parts.length === 3) {
    return (parts[0] || 0) * 3600 + (parts[1] || 0) * 60 + (parts[2] || 0);
  }
  if (parts.length === 2) {
    return (parts[0] || 0) * 60 + (parts[1] || 0);
  }
  return parseInt(timeStr, 10) || 120;
};

interface VideoTableProps {
  initialVideos: Video[];
}

export function VideoTable({ initialVideos }: VideoTableProps) {
  const [videos, setVideos] = useState<Video[]>(initialVideos);
  const [search, setSearch] = useState('');
  const [accessFilter, setAccessFilter] = useState<'ALL' | AccessType>('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [loading, setLoading] = useState(false);

  // Form State for Add / Edit
  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formCategory, setFormCategory] = useState(mockCategories[0].id);
  const [formAccess, setFormAccess] = useState<AccessType>('PUBLIC');
  const [formDuration, setFormDuration] = useState('');
  const [isDurationAutoDetected, setIsDurationAutoDetected] = useState(false);
  const [formThumb, setFormThumb] = useState('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800');
  const [formTags, setFormTags] = useState('Cinematic, 4K, Master');

  // Video Upload State (Local vs Cloudinary URL)
  const [uploadMode, setUploadMode] = useState<'LOCAL_UPLOAD' | 'DIRECT_URL'>('LOCAL_UPLOAD');
  const [formVideoUrl, setFormVideoUrl] = useState('/videos/sample.mp4');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatusText, setUploadStatusText] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  // Thumbnail Image Upload State (Local Image vs Direct URL)
  const [thumbUploadMode, setThumbUploadMode] = useState<'LOCAL_IMAGE' | 'DIRECT_URL'>('LOCAL_IMAGE');
  const [selectedThumbFile, setSelectedThumbFile] = useState<File | null>(null);
  const [isUploadingThumb, setIsUploadingThumb] = useState(false);
  const [thumbStatusText, setThumbStatusText] = useState('');
  const [thumbSuccess, setThumbSuccess] = useState(false);

  // Load latest videos from PostgreSQL
  const reloadVideos = async () => {
    setLoading(true);
    try {
      const list = await videosApi.getVideos();
      setVideos(list);
    } catch (e) {
      console.warn('Error loading videos:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reloadVideos();
  }, []);

  const filtered = videos.filter((v) => {
    const matchesSearch =
      v.title.toLowerCase().includes(search.toLowerCase()) ||
      v.description.toLowerCase().includes(search.toLowerCase()) ||
      v.categoryName?.toLowerCase().includes(search.toLowerCase());
    const matchesAccess = accessFilter === 'ALL' || v.accessType === accessFilter;
    return matchesSearch && matchesAccess;
  });

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}" from the database?`)) {
      await videosApi.deleteVideo(id);
      setVideos((prev) => prev.filter((v) => v.id !== id));
      toast.success(`Video "${title}" deleted from database`);
    }
  };

  const handleOpenAdd = () => {
    setEditingVideo(null);
    setFormTitle('');
    setFormDesc('');
    setFormCategory(mockCategories[0].id);
    setFormAccess('PUBLIC');
    setFormDuration('');
    setIsDurationAutoDetected(false);
    setFormThumb('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800');
    setFormTags('Cinematic, 4K, Master');
    setFormVideoUrl('/videos/sample.mp4');
    setSelectedFile(null);
    setUploadSuccess(false);
    setUploadStatusText('');
    setUploadMode('LOCAL_UPLOAD');
    setSelectedThumbFile(null);
    setThumbSuccess(false);
    setThumbStatusText('');
    setThumbUploadMode('LOCAL_IMAGE');
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (v: Video) => {
    setEditingVideo(v);
    setFormTitle(v.title);
    setFormDesc(v.description);
    setFormCategory(v.categoryId);
    setFormAccess(v.accessType);
    setFormDuration(v.duration);
    setIsDurationAutoDetected(false);
    setFormThumb(v.thumbnailUrl);
    setFormTags(v.tags.join(', '));
    setFormVideoUrl(v.videoUrl);
    setSelectedFile(null);
    setUploadSuccess(true);
    setUploadStatusText('Current master stream configured');
    setUploadMode('DIRECT_URL');
    setSelectedThumbFile(null);
    setThumbSuccess(true);
    setThumbStatusText('Current thumbnail configured');
    setThumbUploadMode('DIRECT_URL');
    setIsAddModalOpen(true);
  };

  // Handle local thumbnail image upload (streams to Cloudinary or saves locally)
  const handleThumbFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file (.png, .jpg, .jpeg, .webp)');
      return;
    }

    setSelectedThumbFile(file);
    setIsUploadingThumb(true);
    setThumbSuccess(false);
    setThumbStatusText(`Uploading thumbnail "${file.name}"...`);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload/image', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to upload thumbnail');

      setFormThumb(data.url);
      setThumbSuccess(true);
      setThumbStatusText(
        data.provider === 'cloudinary'
          ? 'Thumbnail uploaded to Cloudinary CDN successfully!'
          : `Saved locally: ${data.url}`
      );
      toast.success('Thumbnail image uploaded to Cloudinary');
    } catch (err: any) {
      toast.error(err.message || 'Failed to upload thumbnail');
      setThumbStatusText('Upload failed. You can paste an image URL instead.');
    } finally {
      setIsUploadingThumb(false);
    }
  };

  // Handle local video file upload (streams to Cloudinary or saves locally)
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      toast.error('Please select a valid video file (.mp4, .mov, .webm)');
      return;
    }

    setSelectedFile(file);
    setIsUploading(true);
    setUploadSuccess(false);
    setUploadStatusText(`Uploading "${file.name}" (${(file.size / (1024 * 1024)).toFixed(1)} MB)...`);

    // 1. Instantly read video duration from the local video file
    try {
      const tempVideo = document.createElement('video');
      tempVideo.preload = 'metadata';
      tempVideo.onloadedmetadata = () => {
        window.URL.revokeObjectURL(tempVideo.src);
        if (tempVideo.duration && !isNaN(tempVideo.duration) && isFinite(tempVideo.duration)) {
          const formatted = formatSecondsToTime(tempVideo.duration);
          setFormDuration(formatted);
          setIsDurationAutoDetected(true);
          toast.info(`Detected video duration: ${formatted}`);
        }
      };
      tempVideo.src = URL.createObjectURL(file);
    } catch (metaErr) {
      console.warn('Local duration inspection:', metaErr);
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload/video', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');

      setFormVideoUrl(data.url);
      setUploadSuccess(true);

      // Auto-set duration from Cloudinary response if available
      if (data.duration) {
        setFormDuration(formatSecondsToTime(data.duration));
        setIsDurationAutoDetected(true);
      }

      setUploadStatusText(
        data.provider === 'cloudinary'
          ? 'Uploaded to Cloudinary CDN successfully!'
          : `Saved locally: ${data.url}`
      );
      toast.success('Video file ready for publishing');
    } catch (err: any) {
      toast.error(err.message || 'Failed to upload video');
      setUploadStatusText('Upload failed. You can paste a direct URL below.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      toast.error('Title is required');
      return;
    }

    if (!formVideoUrl.trim()) {
      toast.error('Please upload a video file or enter a valid streaming URL');
      return;
    }

    const selectedCat = mockCategories.find((c) => c.id === formCategory) || mockCategories[0];
    const tagsArray = formTags.split(',').map((t) => t.trim()).filter(Boolean);
    const finalDuration = formDuration.trim() || '03:30';
    const computedDurationSeconds = parseTimeToSeconds(finalDuration);

    if (editingVideo) {
      const updated = await videosApi.updateVideo(editingVideo.id, {
        title: formTitle,
        description: formDesc,
        categoryId: formCategory,
        categoryName: selectedCat.name,
        accessType: formAccess,
        duration: finalDuration,
        thumbnailUrl: formThumb,
        videoUrl: formVideoUrl,
        tags: tagsArray,
      });
      setVideos((prev) => prev.map((v) => (v.id === updated.id ? updated : v)));
      toast.success(`Video "${formTitle}" updated in database!`);
    } else {
      const created = await videosApi.createVideo({
        title: formTitle,
        slug: formTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: formDesc || 'Master asset by Aadithyan A.S.',
        categoryId: formCategory,
        categoryName: selectedCat.name,
        thumbnailUrl: formThumb,
        videoUrl: formVideoUrl,
        duration: finalDuration,
        durationSeconds: computedDurationSeconds,
        accessType: formAccess,
        featured: false,
        tags: tagsArray,
        resolution: '4K UHD (3840x2160)',
        fps: 60,
        bitrate: '35 Mbps',
        videoCodec: 'H.265 / HEVC',
        audioCodec: 'AAC 320kbps',
        watermarkEnabled: formAccess !== 'PUBLIC',
        creatorId: 'usr-admin-1',
        creatorName: 'Aadithyan A.S.',
      });
      setVideos((prev) => [created, ...prev]);
      toast.success(`New video "${formTitle}" published to Render PostgreSQL!`);
    }

    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search videos by title or tag..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-zinc-900/80 border border-white/10 text-xs text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500 transition"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={reloadVideos}
            disabled={loading}
            title="Refresh videos from database"
            className="p-2 rounded-xl bg-zinc-900/60 border border-white/10 text-zinc-400 hover:text-white transition cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            {(['ALL', 'PUBLIC', 'LOGIN_REQUIRED', 'REQUEST_ACCESS', 'PRIVATE'] as const).map(
              (acc) => (
                <button
                  key={acc}
                  onClick={() => setAccessFilter(acc)}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                    accessFilter === acc
                      ? 'bg-amber-500 text-black font-semibold'
                      : 'bg-zinc-900/60 text-zinc-400 hover:text-white border border-white/5'
                  }`}
                >
                  {acc.replace('_', ' ')}
                </button>
              )
            )}
          </div>

          <button
            onClick={handleOpenAdd}
            className="px-3.5 py-2 rounded-xl bg-amber-500 text-black hover:bg-amber-400 font-semibold text-xs transition flex items-center gap-1.5 shadow-lg shadow-amber-500/20 whitespace-nowrap cursor-pointer ml-auto"
          >
            <Plus className="w-4 h-4" />
            Add Video
          </button>
        </div>
      </div>

      {/* Videos Table */}
      <div className="rounded-2xl border border-white/5 overflow-hidden bg-zinc-900/40 backdrop-blur-md shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/5 bg-zinc-950/60 text-zinc-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-3.5 px-4">Video Asset</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Access Level</th>
                <th className="py-3.5 px-4">Quality & Duration</th>
                <th className="py-3.5 px-4">Views</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((video) => (
                <tr key={video.id} className="hover:bg-white/[0.02] transition">
                  {/* Thumbnail & Title */}
                  <td className="py-3 px-4 max-w-sm">
                    <div className="flex items-center gap-3">
                      <div className="relative w-20 h-12 rounded-lg overflow-hidden bg-zinc-800 shrink-0 border border-white/10 group">
                        <img
                          src={video.thumbnailUrl}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                        <div className="absolute bottom-1 right-1 px-1 py-0.2 rounded bg-black/80 text-[9px] font-mono text-white">
                          {video.duration}
                        </div>
                      </div>
                      <div className="min-w-0">
                        <Link
                          href={`/videos/${video.id}`}
                          className="font-semibold text-zinc-200 hover:text-amber-400 transition truncate block"
                        >
                          {video.title}
                        </Link>
                        <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">
                          {video.description}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3 px-4">
                    <span className="text-zinc-300 font-medium">
                      {video.categoryName || 'General'}
                    </span>
                  </td>

                  {/* Access Level Badge */}
                  <td className="py-3 px-4">
                    <Badge type={video.accessType} />
                  </td>

                  {/* Quality & Specs */}
                  <td className="py-3 px-4 text-zinc-400 font-mono text-[11px]">
                    <div>{video.resolution}</div>
                    <div className="text-[10px] text-zinc-400 font-sans">{video.videoCodec}</div>
                  </td>

                  {/* Views */}
                  <td className="py-3 px-4 text-zinc-300 font-mono text-[11px]">
                    {video.views.toLocaleString()}
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <Link
                        href={`/videos/${video.id}`}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition"
                        title="Preview Player"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </Link>
                      <button
                        onClick={() => handleOpenEdit(video)}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-amber-400 hover:bg-amber-500/10 transition cursor-pointer"
                        title="Edit Video"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(video.id, video.title)}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition cursor-pointer"
                        title="Delete Video"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Video Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in-0">
          <div className="relative w-full max-w-xl rounded-2xl glass-dropdown border border-amber-500/30 p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <Film className="w-5 h-5 text-amber-400" />
                {editingVideo ? 'Edit Video Asset' : 'Upload & Publish Video Asset'}
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveVideo} className="space-y-4 text-xs">
              {/* VIDEO SOURCE SELECTOR: LOCAL UPLOAD VS CLOUDINARY URL */}
              <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-zinc-200 font-semibold flex items-center gap-1.5">
                    <Film className="w-4 h-4 text-amber-400" />
                    Video Media Source *
                  </label>
                  <div className="inline-flex rounded-lg bg-zinc-950 p-0.5 border border-white/10">
                    <button
                      type="button"
                      onClick={() => setUploadMode('LOCAL_UPLOAD')}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition cursor-pointer flex items-center gap-1 ${
                        uploadMode === 'LOCAL_UPLOAD'
                          ? 'bg-amber-500 text-black font-semibold'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      <HardDrive className="w-3 h-3" />
                      Upload File
                    </button>
                    <button
                      type="button"
                      onClick={() => setUploadMode('DIRECT_URL')}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition cursor-pointer flex items-center gap-1 ${
                        uploadMode === 'DIRECT_URL'
                          ? 'bg-amber-500 text-black font-semibold'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      <Cloud className="w-3 h-3" />
                      Cloudinary / URL
                    </button>
                  </div>
                </div>

                {uploadMode === 'LOCAL_UPLOAD' ? (
                  <div>
                    <label className="block border-2 border-dashed border-white/15 hover:border-amber-500/50 rounded-xl p-4 text-center cursor-pointer transition bg-zinc-950/40 group">
                      <input
                        type="file"
                        accept="video/mp4,video/quicktime,video/webm"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <div className="flex flex-col items-center gap-1.5">
                        <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 group-hover:scale-110 transition">
                          <Upload className="w-5 h-5" />
                        </div>
                        <span className="font-semibold text-zinc-200">
                          {selectedFile ? selectedFile.name : 'Choose video file from computer'}
                        </span>
                        <span className="text-[11px] text-zinc-500">
                          MP4, MOV, or WebM • Uploads to Cloudinary / Secure Local Storage
                        </span>
                      </div>
                    </label>

                    {uploadStatusText && (
                      <div className="mt-2 text-[11px] text-zinc-400 flex items-center gap-1.5">
                        {isUploading && <RefreshCw className="w-3.5 h-3.5 text-amber-400 animate-spin" />}
                        {uploadSuccess && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                        <span className={uploadSuccess ? 'text-emerald-400 font-mono' : ''}>
                          {uploadStatusText}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <input
                      type="text"
                      required
                      value={formVideoUrl}
                      onChange={(e) => setFormVideoUrl(e.target.value)}
                      placeholder="https://res.cloudinary.com/... or /videos/sample.mp4"
                      className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-amber-500"
                    />
                    <p className="text-[10px] text-zinc-500 mt-1">
                      Paste direct Cloudinary streaming URL or HLS / MP4 CDN link.
                    </p>
                  </div>
                )}
              </div>

              {/* Title */}
              <div>
                <label className="block text-zinc-300 font-medium mb-1">Video Title *</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Royal Udaipur Anamorphic Reel"
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-zinc-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-zinc-300 font-medium mb-1">Description</label>
                <textarea
                  rows={2}
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  placeholder="Brief synopsis, production details, camera gear..."
                  className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-zinc-100 focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              {/* Category & Access Level */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-zinc-100 focus:outline-none focus:border-amber-500"
                  >
                    {mockCategories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-300 font-medium mb-1">Access Control Tier</label>
                  <select
                    value={formAccess}
                    onChange={(e) => setFormAccess(e.target.value as AccessType)}
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-zinc-100 focus:outline-none focus:border-amber-500"
                  >
                    <option value="PUBLIC">PUBLIC (Unrestricted)</option>
                    <option value="LOGIN_REQUIRED">LOGIN REQUIRED (Registered)</option>
                    <option value="REQUEST_ACCESS">REQUEST ACCESS (Protected)</option>
                    <option value="PRIVATE">PRIVATE & CONFIDENTIAL</option>
                  </select>
                </div>
              </div>

              {/* Duration & Tags */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-zinc-300 font-medium">Duration (MM:SS)</label>
                    {isDurationAutoDetected && (
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                        Auto-detected ✓
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={formDuration}
                      onChange={(e) => {
                        setFormDuration(e.target.value);
                        setIsDurationAutoDetected(false);
                      }}
                      placeholder="e.g. 03:30 (Auto on upload)"
                      className="w-full pl-3 pr-8 py-2 rounded-xl bg-zinc-900 border border-white/10 text-zinc-100 font-mono text-xs focus:outline-none focus:border-amber-500"
                    />
                    <Clock className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                  </div>
                  <p className="text-[10px] text-zinc-500 mt-1">
                    Auto-detects on upload. You can also edit manually.
                  </p>
                </div>
                <div>
                  <label className="block text-zinc-300 font-medium mb-1">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={formTags}
                    onChange={(e) => setFormTags(e.target.value)}
                    placeholder="Cinematic, 4K, Anamorphic"
                    className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-zinc-100"
                  />
                </div>
              </div>

              {/* THUMBNAIL SOURCE SELECTOR: LOCAL IMAGE UPLOAD VS DIRECT URL */}
              <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-zinc-200 font-semibold flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-amber-400" />
                    Video Thumbnail Image *
                  </label>
                  <div className="inline-flex rounded-lg bg-zinc-950 p-0.5 border border-white/10">
                    <button
                      type="button"
                      onClick={() => setThumbUploadMode('LOCAL_IMAGE')}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition cursor-pointer flex items-center gap-1 ${
                        thumbUploadMode === 'LOCAL_IMAGE'
                          ? 'bg-amber-500 text-black font-semibold'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      <HardDrive className="w-3 h-3" />
                      Upload Image
                    </button>
                    <button
                      type="button"
                      onClick={() => setThumbUploadMode('DIRECT_URL')}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition cursor-pointer flex items-center gap-1 ${
                        thumbUploadMode === 'DIRECT_URL'
                          ? 'bg-amber-500 text-black font-semibold'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      <Cloud className="w-3 h-3" />
                      Image URL
                    </button>
                  </div>
                </div>

                {thumbUploadMode === 'LOCAL_IMAGE' ? (
                  <div>
                    <label className="block border-2 border-dashed border-white/15 hover:border-amber-500/50 rounded-xl p-3.5 text-center cursor-pointer transition bg-zinc-950/40 group">
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/jpg,image/webp"
                        onChange={handleThumbFileChange}
                        className="hidden"
                      />
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 group-hover:scale-110 transition flex-shrink-0">
                          <Upload className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                          <span className="font-semibold text-zinc-200 block text-xs">
                            {selectedThumbFile ? selectedThumbFile.name : 'Choose thumbnail from computer'}
                          </span>
                          <span className="text-[10px] text-zinc-500 block">
                            PNG, JPG, WEBP (Streams automatically to Cloudinary CDN)
                          </span>
                        </div>
                      </div>
                    </label>

                    {thumbStatusText && (
                      <div className="mt-2 flex items-center gap-2 text-[11px] text-zinc-400">
                        {isUploadingThumb ? (
                          <RefreshCw className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                        ) : thumbSuccess ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        ) : null}
                        <span className={thumbSuccess ? 'text-emerald-400 font-mono text-[10px]' : ''}>
                          {thumbStatusText}
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <input
                      type="url"
                      value={formThumb}
                      onChange={(e) => setFormThumb(e.target.value)}
                      placeholder="https://res.cloudinary.com/... or https://images.unsplash.com/..."
                      className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>
                )}

                {/* Thumbnail Visual Preview */}
                {formThumb && (
                  <div className="flex items-center gap-3 pt-1 border-t border-white/5">
                    <div className="relative w-24 aspect-video rounded-lg overflow-hidden border border-white/10 flex-shrink-0 bg-black">
                      <img
                        src={formThumb}
                        alt="Thumbnail Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 block">
                        Preview Thumbnail
                      </span>
                      <p className="text-[10px] font-mono text-zinc-400 truncate">
                        {formThumb}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Form Buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/5">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-5 py-2.5 rounded-xl font-semibold bg-amber-500 text-black hover:bg-amber-400 transition disabled:opacity-50 cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  {isUploading
                    ? 'Uploading Media...'
                    : editingVideo
                    ? 'Save Changes'
                    : 'Publish & Save to Cloud DB'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
