import React from 'react';
import { AccessType, RequestStatus, SeverityLevel } from '@/types';
import { Globe, Lock, ShieldAlert, KeyRound, CheckCircle, Clock, XCircle, AlertTriangle, ShieldCheck } from 'lucide-react';

interface BadgeProps {
  type?: AccessType;
  status?: RequestStatus;
  severity?: SeverityLevel;
  text?: string;
  className?: string;
  size?: 'sm' | 'md';
}

export function Badge({ type, status, severity, text, className = '', size = 'sm' }: BadgeProps) {
  const sizeClasses = size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1';

  // Access Type Badges
  if (type) {
    switch (type) {
      case 'PUBLIC':
        return (
          <span className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 ${sizeClasses} ${className}`}>
            <Globe className="w-3 h-3" />
            PUBLIC
          </span>
        );
      case 'LOGIN_REQUIRED':
        return (
          <span className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 ${sizeClasses} ${className}`}>
            <KeyRound className="w-3 h-3" />
            LOGIN REQUIRED
          </span>
        );
      case 'REQUEST_ACCESS':
        return (
          <span className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/25 ${sizeClasses} ${className}`}>
            <Lock className="w-3 h-3" />
            REQUEST ACCESS
          </span>
        );
      case 'PRIVATE':
        return (
          <span className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 ${sizeClasses} ${className}`}>
            <ShieldAlert className="w-3 h-3" />
            PRIVATE & CONFIDENTIAL
          </span>
        );
    }
  }

  // Request Status Badges
  if (status) {
    switch (status) {
      case 'PENDING':
        return (
          <span className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 ${sizeClasses} ${className}`}>
            <Clock className="w-3 h-3 animate-pulse" />
            PENDING
          </span>
        );
      case 'APPROVED':
        return (
          <span className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 ${sizeClasses} ${className}`}>
            <CheckCircle className="w-3 h-3" />
            APPROVED
          </span>
        );
      case 'REJECTED':
        return (
          <span className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 ${sizeClasses} ${className}`}>
            <XCircle className="w-3 h-3" />
            REJECTED
          </span>
        );
      case 'EXPIRED':
        return (
          <span className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-zinc-500/10 text-zinc-400 border border-zinc-500/20 ${sizeClasses} ${className}`}>
            <Clock className="w-3 h-3" />
            EXPIRED
          </span>
        );
    }
  }

  // Severity Badges (TIS)
  if (severity) {
    switch (severity) {
      case 'CRITICAL':
        return (
          <span className={`inline-flex items-center gap-1 font-semibold rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 ${sizeClasses} ${className}`}>
            <AlertTriangle className="w-3 h-3 text-rose-400" />
            CRITICAL
          </span>
        );
      case 'HIGH':
        return (
          <span className={`inline-flex items-center gap-1 font-medium rounded-full bg-orange-500/15 text-orange-300 border border-orange-500/30 ${sizeClasses} ${className}`}>
            <AlertTriangle className="w-3 h-3 text-orange-400" />
            HIGH
          </span>
        );
      case 'MEDIUM':
        return (
          <span className={`inline-flex items-center gap-1 font-medium rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/25 ${sizeClasses} ${className}`}>
            MEDIUM
          </span>
        );
      case 'LOW':
        return (
          <span className={`inline-flex items-center gap-1 font-medium rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 ${sizeClasses} ${className}`}>
            LOW
          </span>
        );
      case 'INFO':
        return (
          <span className={`inline-flex items-center gap-1 font-medium rounded-full bg-zinc-500/10 text-zinc-400 border border-zinc-500/20 ${sizeClasses} ${className}`}>
            <ShieldCheck className="w-3 h-3" />
            INFO
          </span>
        );
    }
  }

  return (
    <span className={`inline-flex items-center font-medium rounded-full bg-zinc-800 text-zinc-300 border border-white/10 ${sizeClasses} ${className}`}>
      {text || 'TAG'}
    </span>
  );
}
