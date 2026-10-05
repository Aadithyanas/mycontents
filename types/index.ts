export type Role = 'GUEST' | 'USER' | 'CREATOR' | 'ADMIN';

export type AccessType = 'PUBLIC' | 'LOGIN_REQUIRED' | 'REQUEST_ACCESS' | 'PRIVATE';

export type RequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'EXPIRED';

export type SeverityLevel = 'INFO' | 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type AuditAction =
  | 'LOGIN'
  | 'LOGOUT'
  | 'VIDEO_VIEW'
  | 'ACCESS_REQUEST'
  | 'ACCESS_APPROVED'
  | 'ACCESS_REJECTED'
  | 'VIDEO_CREATED'
  | 'VIDEO_UPDATED'
  | 'VIDEO_DELETED'
  | 'PASSWORD_CHANGED'
  | 'SECURITY_EVENT';

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: Role;
  title?: string;
  bio?: string;
  department?: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  videoCount?: number;
}

export interface Video {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string; // Preview or demo stream
  duration: string;
  durationSeconds: number;
  accessType: AccessType;
  featured: boolean;
  views: number;
  tags: string[];
  resolution: string;
  fps: number;
  bitrate: string;
  videoCodec: string;
  audioCodec: string;
  watermarkEnabled: boolean;
  categoryId: string;
  categoryName?: string;
  creatorId: string;
  creatorName?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AccessRequest {
  id: string;
  userId: string;
  user: {
    name: string;
    email: string;
    image?: string;
    role: Role;
  };
  videoId: string;
  videoTitle: string;
  videoThumbnail: string;
  reason: string;
  status: RequestStatus;
  rejectionReason?: string;
  requestedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  expiresAt?: string;
  riskScore?: 'LOW' | 'MEDIUM' | 'HIGH';
  previousRequestsCount?: number;
}

export interface VideoSession {
  id: string;
  token: string;
  userId: string;
  userName: string;
  userEmail: string;
  videoId: string;
  videoTitle: string;
  ipAddress: string;
  userAgent: string;
  resolutionDelivered: string;
  bytesTransferred: number;
  active: boolean;
  startedAt: string;
  expiresAt: string;
}

export interface SecurityLog {
  id: string;
  userId?: string;
  userName?: string;
  ipAddress: string;
  userAgent?: string;
  action: AuditAction;
  event: string;
  severity: SeverityLevel;
  status: 'SUCCESS' | 'BLOCKED' | 'FLAGGED' | 'WARNING';
  details?: string;
  timestamp: string;
}

export interface NetworkLog {
  id: string;
  ipAddress: string;
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS';
  status: number;
  responseTimeMs: number;
  bytes: number;
  timestamp: string;
  userAgent: string;
  region: string;
  protocol: 'HTTP/2' | 'HTTP/3 (QUIC)' | 'HTTP/1.1';
  tlsVersion: 'TLSv1.3' | 'TLSv1.2';
}

export interface NetworkTelemetry {
  activeUsers: number;
  activeVideoStreams: number;
  requestsPerMinute: number;
  averageResponseTimeMs: number;
  bandwidthMbps: number;
  failedRequestsPercent: number;
  cacheHitRatioPercent: number;
  packetLossPercent: number;
  totalDataTransferredGB: number;
}

export interface SecurityScoreMetrics {
  score: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'F';
  failedLoginsToday: number;
  suspiciousSessions: number;
  blockedRequestsCount: number;
  activeSecureSessions: number;
  rateLimitTriggers: number;
  controls: {
    httpsEnforced: boolean;
    argon2Hashing: boolean;
    rbacProtected: boolean;
    dynamicWatermarking: boolean;
    httpOnlyCookies: boolean;
    auditLogRetention: boolean;
  };
}

export interface AuthSessionResponse {
  user: User | null;
  authenticated: boolean;
  role: Role;
}
