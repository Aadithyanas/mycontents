'use client';

import React, { useState, useEffect } from 'react';
import { ShieldAlert } from 'lucide-react';

interface VideoWatermarkProps {
  userName?: string;
  userId?: string;
  sessionId?: string;
  ipAddress?: string;
}

export function VideoWatermark({
  userName = 'Registered Viewer',
  userId = 'usr-anon',
  sessionId = 'VS-82A91X',
  ipAddress = '103.21.124.89',
}: VideoWatermarkProps) {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    // Format timestamp with millisecond tick for forensic non-repudiation
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toISOString().replace('T', ' ').slice(0, 19) + ' UTC'
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-30 overflow-hidden">
      {/* Drifting Dynamic Watermark Container */}
      <div className="animate-watermark absolute transition-all duration-1000 ease-linear">
        <div className="p-3 rounded-xl bg-black/45 backdrop-blur-[2px] border border-white/10 text-white/40 shadow-2xl flex items-center gap-2.5 max-w-xs font-mono text-[10px] tracking-tight">
          <div className="p-1.5 rounded bg-amber-500/20 text-amber-300">
            <ShieldAlert className="w-3.5 h-3.5" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-white/60 tracking-normal uppercase">
              {userName} ({userId})
            </span>
            <div className="flex items-center gap-2 text-white/50 text-[9px]">
              <span>SES: {sessionId}</span>
              <span>•</span>
              <span>IP: {ipAddress}</span>
            </div>
            <span className="text-[9px] text-amber-300/60 mt-0.5">
              FORENSIC TRACE: {currentTime}
            </span>
          </div>
        </div>
      </div>

      {/* Subtle corner timestamp anchor to reinforce multi-point attribution */}
      <div className="absolute bottom-14 left-4 font-mono text-[9px] text-white/20 tracking-wider">
        <span>AUTHENTICATED STREAM: {sessionId}</span>
      </div>
    </div>
  );
}
