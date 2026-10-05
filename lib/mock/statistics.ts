export interface AdminStats {
  totalVideos: number;
  publicVideos: number;
  protectedVideos: number;
  totalUsers: number;
  pendingRequests: number;
  activeSessions: number;
  todaysViews: number;
  securityEventsToday: number;
}

export const mockAdminStats: AdminStats = {
  totalVideos: 22,
  publicVideos: 9,
  protectedVideos: 13,
  totalUsers: 1420,
  pendingRequests: 5,
  activeSessions: 7,
  todaysViews: 14380,
  securityEventsToday: 18,
};

export const mockViewsOverTime = [
  { date: 'Sep 29', views: 8240, uniqueVisitors: 5120, bandwidthGB: 42.1 },
  { date: 'Sep 30', views: 9810, uniqueVisitors: 6400, bandwidthGB: 53.4 },
  { date: 'Oct 01', views: 11450, uniqueVisitors: 7200, bandwidthGB: 68.2 },
  { date: 'Oct 02', views: 10920, uniqueVisitors: 6940, bandwidthGB: 61.8 },
  { date: 'Oct 03', views: 13240, uniqueVisitors: 8400, bandwidthGB: 79.5 },
  { date: 'Oct 04', views: 15680, uniqueVisitors: 9850, bandwidthGB: 94.1 },
  { date: 'Oct 05', views: 14380, uniqueVisitors: 9120, bandwidthGB: 86.7 },
];

export const mockContentDistribution = [
  { name: 'Public Discovery', value: 41, color: '#10B981' }, // Emerald
  { name: 'Login Required', value: 27, color: '#3B82F6' }, // Blue
  { name: 'Request Access (Protected)', value: 23, color: '#F59E0B' }, // Amber
  { name: 'Private & Confidential', value: 9, color: '#EF4444' }, // Red
];

export const mockUserActivity = [
  { hour: '00:00', streamRequests: 18, authLogins: 4 },
  { hour: '03:00', streamRequests: 8, authLogins: 1 },
  { hour: '06:00', streamRequests: 24, authLogins: 8 },
  { hour: '09:00', streamRequests: 142, authLogins: 48 },
  { hour: '12:00', streamRequests: 210, authLogins: 62 },
  { hour: '15:00', streamRequests: 295, authLogins: 85 },
  { hour: '18:00', streamRequests: 380, authLogins: 112 },
  { hour: '21:00', streamRequests: 320, authLogins: 94 },
];

export const mockNetworkMetrics = {
  activeUsers: 84,
  activeVideoStreams: 7,
  requestsPerMinute: 428,
  averageResponseTimeMs: 42.6,
  bandwidthMbps: 48.6,
  failedRequestsPercent: 0.08,
  cacheHitRatioPercent: 94.8,
  packetLossPercent: 0.02,
  totalDataTransferredGB: 184.2,
};

export const mockNetworkTimeSeries = [
  { time: '08:00', rpm: 280, latencyMs: 38, bandwidthMbps: 32.4, streams: 4 },
  { time: '08:10', rpm: 310, latencyMs: 41, bandwidthMbps: 36.1, streams: 5 },
  { time: '08:20', rpm: 345, latencyMs: 44, bandwidthMbps: 41.0, streams: 5 },
  { time: '08:30', rpm: 390, latencyMs: 39, bandwidthMbps: 45.2, streams: 6 },
  { time: '08:40', rpm: 430, latencyMs: 46, bandwidthMbps: 52.8, streams: 7 },
  { time: '08:50', rpm: 428, latencyMs: 42, bandwidthMbps: 48.6, streams: 7 },
];

export const mockSecurityScore = {
  score: 96,
  grade: 'A+' as const,
  failedLoginsToday: 3,
  suspiciousSessions: 1,
  blockedRequestsCount: 19,
  activeSecureSessions: 7,
  rateLimitTriggers: 2,
  controls: {
    httpsEnforced: true,
    argon2Hashing: true,
    rbacProtected: true,
    dynamicWatermarking: true,
    httpOnlyCookies: true,
    auditLogRetention: true,
  },
};
