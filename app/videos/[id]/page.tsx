'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { VideoPlayer } from '@/components/video/VideoPlayer';
import { LockedVideo } from '@/components/video/LockedVideo';
import { AccessRequestModal } from '@/components/video/AccessRequestModal';
import { Badge } from '@/components/common/Badge';
import { videosApi } from '@/lib/api/videos';
import { requestsApi } from '@/lib/api/requests';
import { useAuth } from '@/context/AuthContext';
import { Video, AccessRequest } from '@/types';
import {
  Calendar,
  Eye,
  Tag,
  Shield,
  Clock,
  Layers,
  Film,
  Sparkles,
  ArrowLeft,
  Share2,
  HardDrive,
  Cpu,
  ThumbsUp,
  ThumbsDown,
  Download,
  MoreHorizontal,
  Bookmark,
  CheckCircle2,
  MessageSquare,
  Send,
  SlidersHorizontal,
  Lock,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { toast } from 'sonner';

interface CommentItem {
  id: string;
  author: string;
  avatar: string;
  timeAgo: string;
  content: string;
  likes: number;
  userLiked?: boolean;
}

const INITIAL_COMMENTS: CommentItem[] = [
  {
    id: 'c-1',
    author: 'Elena Rostova (Cinematographer)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
    timeAgo: '2 days ago',
    content: 'The color grading on this 4K master is extraordinary. The dynamic range in the shadow highlights feels like an Arri Alexa LF pipeline.',
    likes: 34,
  },
  {
    id: 'c-2',
    author: 'Vikram Sethi (Commercial Director)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    timeAgo: '5 days ago',
    content: 'Requested access for commercial licensing in our upcoming national campaign. Aadithyan’s composition never fails to amaze.',
    likes: 19,
  },
  {
    id: 'c-3',
    author: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    timeAgo: '1 week ago',
    content: 'Crisp 60fps motion cadence without any compression artifacts. What camera rig was used for the high-velocity tracking shots?',
    likes: 8,
  },
];

export default function VideoDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isAuthenticated, role } = useAuth();

  const id = params?.id as string;

  const [video, setVideo] = useState<Video | null>(null);
  const [allVideos, setAllVideos] = useState<Video[]>([]);
  const [userRequest, setUserRequest] = useState<AccessRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // YouTube UI States
  const [likesCount, setLikesCount] = useState(2450);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [sidebarFilter, setSidebarFilter] = useState('All');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Comments State
  const [comments, setComments] = useState<CommentItem[]>(INITIAL_COMMENTS);
  const [newCommentText, setNewCommentText] = useState('');
  const [isCommenting, setIsCommenting] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (!id) return;
      setLoading(true);
      const v = await videosApi.getVideoById(id);
      if (v) {
        setVideo(v);
        const list = await videosApi.getVideos();
        setAllVideos(list);

        // Check if current user has an access request for this video
        if (user) {
          const req = await requestsApi.getRequestForUserAndVideo(user.id, v.id);
          setUserRequest(req);
        }
      }
      setLoading(false);
    }
    loadData();
  }, [id, user]);

  const refreshRequestStatus = async () => {
    if (user && video) {
      const req = await requestsApi.getRequestForUserAndVideo(user.id, video.id);
      setUserRequest(req);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Share link copied to clipboard!');
    }
  };

  const handleLike = () => {
    if (hasLiked) {
      setHasLiked(false);
      setLikesCount((prev) => prev - 1);
    } else {
      setHasLiked(true);
      if (hasDisliked) setHasDisliked(false);
      setLikesCount((prev) => prev + 1);
      toast.success('Added to your Liked Videos');
    }
  };

  const handleDislike = () => {
    if (hasDisliked) {
      setHasDisliked(false);
    } else {
      setHasDisliked(true);
      if (hasLiked) {
        setHasLiked(false);
        setLikesCount((prev) => prev - 1);
      }
    }
  };

  const handleSubscribe = () => {
    setIsSubscribed((prev) => !prev);
    toast.success(
      !isSubscribed
        ? 'Subscribed to Aadithyan A.S. Creator Vault notifications'
        : 'Subscription notifications paused'
    );
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newComment: CommentItem = {
      id: `c-${Date.now()}`,
      author: user?.name || 'Guest Creator',
      avatar: user?.image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
      timeAgo: 'Just now',
      content: newCommentText.trim(),
      likes: 0,
    };

    setComments((prev) => [newComment, ...prev]);
    setNewCommentText('');
    setIsCommenting(false);
    toast.success('Comment posted successfully');
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#07080b]">
        <Navbar />
        <main className="flex-1 max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-4">
              <div className="aspect-video w-full bg-zinc-900 rounded-2xl" />
              <div className="h-7 w-3/4 bg-zinc-800 rounded-lg" />
              <div className="h-12 w-full bg-zinc-900 rounded-xl" />
            </div>
            <div className="lg:col-span-4 space-y-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-40 aspect-video bg-zinc-900 rounded-xl flex-shrink-0" />
                  <div className="flex-1 space-y-2 py-1">
                    <div className="h-4 bg-zinc-800 rounded w-full" />
                    <div className="h-3 bg-zinc-800 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!video) {
    return (
      <div className="flex flex-col min-h-screen bg-[#07080b]">
        <Navbar />
        <main className="flex-1 max-w-xl mx-auto px-4 py-32 text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">Video Asset Not Found</h2>
          <p className="text-xs text-zinc-400">
            The requested media asset does not exist or may have been unindexed.
          </p>
          <Link
            href="/videos"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 text-black text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Video Discovery
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const isApproved = userRequest?.status === 'APPROVED';
  const isAdmin = role === 'ADMIN';
  const isUnlocked =
    video.accessType === 'PUBLIC' ||
    isAdmin ||
    (video.accessType === 'LOGIN_REQUIRED' && isAuthenticated) ||
    isApproved;

  const isProtectedSession = video.accessType !== 'PUBLIC' && isUnlocked;

  // Filter recommendations for right sidebar
  const recommendedVideos = allVideos.filter((v) => v.id !== video.id);
  const filterCategories = ['All', 'From Aadithyan A.S.', 'Cinematic', '4K UHD', 'Protected'];
  const filteredSidebar = recommendedVideos.filter((v) => {
    if (sidebarFilter === 'All') return true;
    if (sidebarFilter === 'From Aadithyan A.S.') return true;
    if (sidebarFilter === 'Protected') return v.accessType !== 'PUBLIC';
    if (sidebarFilter === '4K UHD') return v.resolution.includes('4K');
    return v.categoryName?.toLowerCase().includes(sidebarFilter.toLowerCase());
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#07080b] text-zinc-100 selection:bg-amber-500 selection:text-black">
      <Navbar />

      <main className="flex-1 py-4 sm:py-6">
        <div className="max-w-[1720px] mx-auto px-3 sm:px-6 lg:px-8">
          {/* Main YouTube Layout: Left column (player + details) and Right column (recommendations) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* LEFT COLUMN: PLAYER, HEADER, ACTIONS, DESCRIPTION, COMMENTS (approx 68-70%) */}
            <div className="lg:col-span-8 xl:col-span-8 space-y-4">
              
              {/* 1. VIDEO PLAYER CONTAINER */}
              <div className="w-full rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/10 ring-1 ring-white/5">
                {isUnlocked ? (
                  <VideoPlayer video={video} isApprovedProtected={isProtectedSession} />
                ) : (
                  <LockedVideo
                    video={video}
                    userRequest={userRequest}
                    onRequestAccess={() => setIsModalOpen(true)}
                  />
                )}
              </div>

              {/* 2. VIDEO TITLE & TAGS */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-2">
                  {video.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition cursor-pointer"
                    >
                      #{tag.replace(/\s+/g, '')}
                    </span>
                  ))}
                  <span className="text-xs font-semibold text-amber-400">#AadithyanAS</span>
                </div>

                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                  {video.title}
                </h1>
              </div>

              {/* 3. YOUTUBE-STYLE CREATOR BAR & ACTION BUTTONS */}
              <div className="flex flex-wrap items-center justify-between gap-4 py-2 border-b border-white/5">
                
                {/* Creator Profile & Subscribe Button */}
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 p-0.5 shadow-md">
                      <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center font-black text-amber-400 text-base">
                        {video.creatorName?.charAt(0) || 'A'}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-white text-sm hover:text-amber-400 transition cursor-pointer">
                        {video.creatorName || 'Aadithyan A.S.'}
                      </h3>
                      <span title="Verified Creator & Admin">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 fill-amber-400/20" />
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-400">
                      Portfolio Creator & Administrator • 4K Master Vault
                    </p>
                  </div>

                  <button
                    onClick={handleSubscribe}
                    className={`ml-2 px-4 py-2 rounded-full font-bold text-xs transition cursor-pointer shadow-md ${
                      isSubscribed
                        ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                        : 'bg-white text-black hover:bg-zinc-200'
                    }`}
                  >
                    {isSubscribed ? 'Subscribed ✓' : 'Subscribe'}
                  </button>
                </div>

                {/* Right Action Buttons: Like/Dislike, Share, Request Access Pill */}
                <div className="flex items-center flex-wrap gap-2">
                  
                  {/* Like / Dislike Pill Group */}
                  <div className="inline-flex items-center rounded-full bg-zinc-800/80 border border-white/10 overflow-hidden text-xs">
                    <button
                      onClick={handleLike}
                      className={`flex items-center gap-1.5 px-3.5 py-2 hover:bg-zinc-700/80 transition cursor-pointer ${
                        hasLiked ? 'text-amber-400 font-bold' : 'text-zinc-200'
                      }`}
                      title="Like this masterpiece"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>{likesCount.toLocaleString()}</span>
                    </button>
                    <div className="w-px h-5 bg-white/10" />
                    <button
                      onClick={handleDislike}
                      className={`px-3 py-2 hover:bg-zinc-700/80 transition cursor-pointer ${
                        hasDisliked ? 'text-rose-400' : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                      title="Dislike"
                    >
                      <ThumbsDown className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Share Pill */}
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-200 text-xs font-semibold border border-white/10 transition cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>

                  {/* Protection Tier / Request Access Button */}
                  {video.accessType !== 'PUBLIC' ? (
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition cursor-pointer shadow-lg shadow-amber-500/20"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>{isApproved ? 'Access Granted ✓' : 'Request Access'}</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Public Stream</span>
                    </div>
                  )}

                  {/* Bookmark Pill */}
                  <button
                    onClick={() => toast.success('Saved to your Private Watchlist')}
                    className="p-2 rounded-full bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-300 border border-white/10 transition cursor-pointer"
                    title="Save to Watchlist"
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 4. YOUTUBE-STYLE COLLAPSIBLE DESCRIPTION BOX */}
              <div
                onClick={() => setIsDescExpanded(!isDescExpanded)}
                className="group rounded-2xl bg-zinc-900/80 hover:bg-zinc-900/95 border border-white/5 p-4 text-xs space-y-3 cursor-pointer transition shadow-sm"
              >
                {/* Views & Timestamp Header */}
                <div className="flex flex-wrap items-center gap-2.5 font-bold text-zinc-200 text-xs sm:text-sm">
                  <span>{video.views.toLocaleString()} views</span>
                  <span>•</span>
                  <span>{new Date(video.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  <span>•</span>
                  <span className="font-mono text-amber-400">
                    {video.categoryName || 'Creative Cinematic'}
                  </span>
                  <span>•</span>
                  <span className="font-mono text-zinc-400">{video.duration}</span>
                </div>

                {/* Synopsis Description */}
                <p className={`text-zinc-300 leading-relaxed text-xs sm:text-sm ${!isDescExpanded ? 'line-clamp-2' : ''}`}>
                  {video.description}
                </p>

                {/* Expanded Details & Technical Specs */}
                {isDescExpanded && (
                  <div className="pt-3 border-t border-white/5 space-y-4 animate-in fade-in-50">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
                      <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-white/5">
                        <span className="text-zinc-500 block text-[10px]">MASTER RESOLUTION</span>
                        <span className="font-semibold text-white">{video.resolution}</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-white/5">
                        <span className="text-zinc-500 block text-[10px]">FPS CADENCE</span>
                        <span className="font-semibold text-white">{video.fps} fps</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-white/5">
                        <span className="text-zinc-500 block text-[10px]">VIDEO CODEC</span>
                        <span className="font-semibold text-white">{video.videoCodec}</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-zinc-950/60 border border-white/5">
                        <span className="text-zinc-500 block text-[10px]">AUDIO STREAM</span>
                        <span className="font-semibold text-white">{video.audioCodec}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-1">
                      <div className="flex items-center gap-1.5">
                        <Shield className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Security: {video.watermarkEnabled ? 'Dynamic Forensics Watermarking Active' : 'Unrestricted Stream'}</span>
                      </div>
                      <span className="font-mono text-zinc-500">Target Bitrate: {video.bitrate}</span>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-1 font-semibold text-zinc-400 group-hover:text-white pt-1 text-[11px]">
                  <span>{isDescExpanded ? 'Show less' : '...more'}</span>
                  {isDescExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </div>
              </div>

              {/* 5. YOUTUBE-STYLE COMMENTS / DISCUSSION SECTION */}
              <div className="pt-6 space-y-5">
                <div className="flex items-center gap-6">
                  <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-amber-400" />
                    <span>{comments.length} Comments</span>
                  </h3>
                  <button className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition">
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>Sort by Top</span>
                  </button>
                </div>

                {/* Add Comment Box */}
                <form onSubmit={handleAddComment} className="flex gap-3 items-start">
                  <div className="w-9 h-9 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center font-bold text-xs text-amber-400 flex-shrink-0">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      onFocus={() => setIsCommenting(true)}
                      placeholder="Add a comment or inquiry for Aadithyan A.S...."
                      className="w-full pb-2 bg-transparent border-b border-zinc-700 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-400 transition"
                    />
                    {isCommenting && (
                      <div className="flex items-center justify-end gap-2 pt-1 animate-in fade-in-50">
                        <button
                          type="button"
                          onClick={() => {
                            setIsCommenting(false);
                            setNewCommentText('');
                          }}
                          className="px-3 py-1.5 rounded-full text-xs text-zinc-400 hover:text-white"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={!newCommentText.trim()}
                          className="px-4 py-1.5 rounded-full bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold disabled:opacity-40 transition cursor-pointer"
                        >
                          Comment
                        </button>
                      </div>
                    )}
                  </div>
                </form>

                {/* Comments List */}
                <div className="space-y-4 pt-2">
                  {comments.map((c) => (
                    <div key={c.id} className="flex gap-3 text-xs">
                      <img
                        src={c.avatar}
                        alt={c.author}
                        className="w-9 h-9 rounded-full object-cover flex-shrink-0 border border-white/10"
                      />
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-zinc-200">{c.author}</span>
                          <span className="text-[11px] text-zinc-500">{c.timeAgo}</span>
                        </div>
                        <p className="text-zinc-300 leading-relaxed text-xs">{c.content}</p>
                        <div className="flex items-center gap-3 pt-1 text-zinc-400 text-[11px]">
                          <button
                            onClick={() => {
                              setComments((prev) =>
                                prev.map((item) =>
                                  item.id === c.id
                                    ? {
                                        ...item,
                                        likes: item.userLiked ? item.likes - 1 : item.likes + 1,
                                        userLiked: !item.userLiked,
                                      }
                                    : item
                                )
                              );
                            }}
                            className={`flex items-center gap-1 hover:text-white transition ${
                              c.userLiked ? 'text-amber-400 font-bold' : ''
                            }`}
                          >
                            <ThumbsUp className="w-3.5 h-3.5" />
                            <span>{c.likes > 0 ? c.likes : ''}</span>
                          </button>
                          <button className="hover:text-white transition">Reply</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: YOUTUBE RECOMMENDED VIDEOS SIDEBAR (approx 30-32%) */}
            <div className="lg:col-span-4 xl:col-span-4 space-y-4">
              
              {/* Category Filter Pills (Just like YouTube top chips) */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {filterCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSidebarFilter(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                      sidebarFilter === cat
                        ? 'bg-zinc-100 text-black'
                        : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700/80 border border-white/5'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Recommended Video Cards List (Horizontal YouTube Card Layout) */}
              <div className="space-y-3">
                {filteredSidebar.map((item) => (
                  <Link
                    key={item.id}
                    href={`/videos/${item.id}`}
                    className="group flex gap-3 p-1.5 rounded-xl hover:bg-zinc-900/70 border border-transparent hover:border-white/5 transition duration-200 cursor-pointer"
                  >
                    {/* 16:9 Thumbnail with Overlay Badges */}
                    <div className="relative w-40 sm:w-44 aspect-video rounded-xl overflow-hidden flex-shrink-0 bg-zinc-950 border border-white/5">
                      <img
                        src={item.thumbnailUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800';
                        }}
                      />
                      
                      {/* Duration Badge Bottom Right */}
                      <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/85 backdrop-blur-sm text-[10px] font-mono font-semibold text-white tracking-wider">
                        {item.duration}
                      </span>

                      {/* Access Badge Top Left */}
                      <div className="absolute top-1 left-1 scale-75 origin-top-left">
                        <Badge type={item.accessType} size="sm" />
                      </div>
                    </div>

                    {/* Metadata on the Right */}
                    <div className="flex-1 min-w-0 py-0.5 space-y-1">
                      <h4 className="text-xs sm:text-sm font-semibold text-zinc-100 group-hover:text-amber-400 line-clamp-2 leading-snug transition">
                        {item.title}
                      </h4>

                      <div className="text-[11px] text-zinc-400 flex items-center gap-1">
                        <span className="truncate">{item.creatorName || 'Aadithyan A.S.'}</span>
                        <CheckCircle2 className="w-3 h-3 text-zinc-500 fill-zinc-500/20 flex-shrink-0" />
                      </div>

                      <div className="text-[11px] text-zinc-500 flex items-center gap-1 font-mono">
                        <span>{item.views.toLocaleString()} views</span>
                        <span>•</span>
                        <span>
                          {new Date(item.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>

                      <div className="pt-0.5">
                        <span className="text-[10px] font-mono text-zinc-400 px-1.5 py-0.5 rounded bg-zinc-800/80 border border-white/5">
                          {item.resolution.includes('4K') ? '4K UHD' : 'HD'}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}

                {filteredSidebar.length === 0 && (
                  <div className="p-8 text-center rounded-2xl bg-zinc-900/40 border border-white/5 text-xs text-zinc-500">
                    No matching creative works found for category &quot;{sidebarFilter}&quot;.
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>
      </main>

      {/* Access Request Modal */}
      <AccessRequestModal
        video={video}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRequestSubmitted={refreshRequestStatus}
      />

      <Footer />
    </div>
  );
}
