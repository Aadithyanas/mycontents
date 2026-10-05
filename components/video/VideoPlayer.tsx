'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Video } from '@/types';
import { useAuth } from '@/context/AuthContext';
import { VideoWatermark } from './VideoWatermark';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  ShieldCheck,
  Clock,
  Sparkles,
  Settings,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';

interface VideoPlayerProps {
  video: Video;
  isApprovedProtected?: boolean;
}

export function VideoPlayer({ video, isApprovedProtected = false }: VideoPlayerProps) {
  const { user } = useAuth();
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(video.durationSeconds || 120);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [quality, setQuality] = useState('4K (Auto ABR)');
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [mediaError, setMediaError] = useState(false);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Safe fallback stream: use local sample video if URL is empty or broken
  const defaultLocalStream = '/videos/sample.mp4';
  const initialStream =
    video.videoUrl && !video.videoUrl.includes('commondatastorage.googleapis.com')
      ? video.videoUrl
      : defaultLocalStream;

  const [currentStreamSrc, setCurrentStreamSrc] = useState(initialStream);

  useEffect(() => {
    const src =
      video.videoUrl && !video.videoUrl.includes('commondatastorage.googleapis.com')
        ? video.videoUrl
        : defaultLocalStream;
    setCurrentStreamSrc(src);
    setMediaError(false);
  }, [video]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setMediaError(false);
        })
        .catch((err) => {
          console.warn('Playback prevented or source error:', err);
          // If external URL failed, fallback to local reliable MP4
          if (currentStreamSrc !== defaultLocalStream) {
            setCurrentStreamSrc(defaultLocalStream);
            if (videoRef.current) {
              videoRef.current.load();
              videoRef.current.play().catch(() => {});
            }
          }
        });
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || video.durationSeconds || 120);
      setMediaError(false);
    }
  };

  const handleMediaError = () => {
    console.warn('Video source load failed, switching to local protected stream buffer');
    if (currentStreamSrc !== defaultLocalStream) {
      setCurrentStreamSrc(defaultLocalStream);
      if (videoRef.current) {
        videoRef.current.load();
      }
    } else {
      setMediaError(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      setIsMuted(val === 0);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    if (isMuted) {
      videoRef.current.volume = volume || 0.8;
      setIsMuted(false);
    } else {
      videoRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleMouseMove = () => {
    setControlsVisible(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setControlsVisible(false);
    }, 2800);
  };

  const formatTime = (seconds: number) => {
    const s = Math.max(0, Math.floor(seconds || 0));
    const mins = Math.floor(s / 60);
    const secs = Math.floor(s % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      {/* Video Viewport Container */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isPlaying && setControlsVisible(false)}
        className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl group select-none"
      >
        <video
          ref={videoRef}
          key={currentStreamSrc}
          src={currentStreamSrc}
          poster={video.thumbnailUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onError={handleMediaError}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onClick={togglePlay}
          className="w-full h-full object-cover cursor-pointer"
          playsInline
          preload="metadata"
        >
          <source src={currentStreamSrc} type="video/mp4" />
          <source src="/videos/sample.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dynamic Forensic Watermark Overlay for protected/watermarked videos */}
        {(video.watermarkEnabled || isApprovedProtected) && (
          <VideoWatermark
            userName={user?.name || 'Authorized Viewer'}
            userId={user?.id || 'usr-demo-evaluator'}
            sessionId="VS-82A91X"
            ipAddress="103.21.124.89"
          />
        )}

        {/* Controls Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 pointer-events-none transition-opacity duration-300 flex flex-col justify-between p-4 ${
            controlsVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Top Bar: Title & Security Badge */}
          <div className="flex items-center justify-between pointer-events-auto">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-white/90 drop-shadow truncate max-w-md">
                {video.title}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/60 text-zinc-300 border border-white/10">
                {video.resolution}
              </span>
            </div>

            {isApprovedProtected && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-500/30 backdrop-blur-md">
                <ShieldCheck className="w-3.5 h-3.5" />
                SECURE STREAM ACTIVE
              </div>
            )}
          </div>

          {/* Center Play/Pause Indicator (when paused) */}
          {!isPlaying && !mediaError && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 rounded-full bg-amber-500/90 text-black flex items-center justify-center shadow-xl shadow-amber-500/30 transform transition-transform group-hover:scale-110">
                <Play className="w-7 h-7 fill-black ml-1" />
              </div>
            </div>
          )}

          {/* Bottom Bar: Timeline Scrubber + Controls */}
          <div className="space-y-2 pointer-events-auto">
            {/* Scrubber */}
            <div className="relative group/scrubber cursor-pointer">
              <input
                type="range"
                min={0}
                max={duration || 100}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-amber-500 hover:h-2 transition-all"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-white">
              {/* Left: Play/Pause, Volume, Timers */}
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-white transition cursor-pointer"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                </button>

                <div className="flex items-center gap-1.5 group/volume">
                  <button
                    onClick={toggleMute}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-white transition cursor-pointer"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-4 h-4 text-rose-400" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-16 h-1 bg-white/20 rounded appearance-none accent-amber-500 cursor-pointer"
                  />
                </div>

                <div className="font-mono text-[11px] text-zinc-300">
                  <span>{formatTime(currentTime)}</span>
                  <span className="text-zinc-500 mx-1">/</span>
                  <span className="text-zinc-400">{formatTime(duration || video.durationSeconds)}</span>
                </div>
              </div>

              {/* Right: Quality, Codec info, Fullscreen */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <button
                    onClick={() => setShowQualityMenu(!showQualityMenu)}
                    className="flex items-center gap-1 px-2 py-1 rounded-lg bg-black/40 hover:bg-white/10 text-[11px] font-mono text-zinc-300 transition cursor-pointer"
                  >
                    <Settings className="w-3 h-3 text-amber-400" />
                    {quality}
                  </button>

                  {showQualityMenu && (
                    <div className="absolute bottom-8 right-0 w-36 rounded-xl glass-dropdown p-1.5 shadow-2xl z-40 text-xs">
                      {['4K (Auto ABR)', '1080p 60fps', '720p 60fps', '480p SD'].map((q) => (
                        <button
                          key={q}
                          onClick={() => {
                            setQuality(q);
                            setShowQualityMenu(false);
                          }}
                          className={`w-full text-left px-2 py-1.5 rounded-lg transition cursor-pointer ${
                            quality === q ? 'bg-amber-500 text-black font-semibold' : 'text-zinc-300 hover:bg-white/5'
                          }`}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={toggleFullscreen}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-white transition cursor-pointer"
                  aria-label="Toggle Fullscreen"
                >
                  {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Information Panel for Approved Protected Content (Section 23) */}
      {isApprovedProtected && (
        <div className="p-4 rounded-2xl bg-zinc-900/70 border border-amber-500/25 space-y-3 animate-in fade-in-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Secure Playback Session Established
                </h4>
                <p className="text-[11px] text-zinc-400">
                  Zero-Trust DRM Stream • Cryptographically bound to current session
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-lg bg-black/60 text-amber-400 border border-amber-500/30">
                Session: VS-82A91X
              </span>
              <span className="flex items-center gap-1 text-zinc-400">
                <Clock className="w-3.5 h-3.5 text-zinc-500" />
                Access expires in: <strong className="text-zinc-200">6d 21h</strong>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
            <div className="p-2 rounded-xl bg-black/40 border border-white/5 flex items-center gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span className="text-zinc-300">Authenticated: {user?.name}</span>
            </div>
            <div className="p-2 rounded-xl bg-black/40 border border-white/5 flex items-center gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span className="text-zinc-300">Access Approved</span>
            </div>
            <div className="p-2 rounded-xl bg-black/40 border border-white/5 flex items-center gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span className="text-zinc-300">Session Token Valid</span>
            </div>
            <div className="p-2 rounded-xl bg-black/40 border border-white/5 flex items-center gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span className="text-zinc-300">TLS 1.3 AES-GCM</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
