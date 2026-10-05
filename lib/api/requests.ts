import { AccessRequest, RequestStatus } from '@/types';
import { mockAccessRequests } from '@/lib/mock/accessRequests';

let requestsState: AccessRequest[] = [...mockAccessRequests];

export const requestsApi = {
  async getAllRequests(): Promise<AccessRequest[]> {
    await new Promise((r) => setTimeout(r, 60));
    return [...requestsState];
  },

  async getUserRequests(userId: string): Promise<AccessRequest[]> {
    await new Promise((r) => setTimeout(r, 60));
    return requestsState.filter((r) => r.userId === userId);
  },

  async getRequestForUserAndVideo(userId: string, videoId: string): Promise<AccessRequest | null> {
    await new Promise((r) => setTimeout(r, 40));
    const req = requestsState.find((r) => r.userId === userId && r.videoId === videoId);
    return req || null;
  },

  async submitRequest(params: {
    userId: string;
    userName: string;
    userEmail: string;
    userImage?: string;
    videoId: string;
    videoTitle: string;
    videoThumbnail: string;
    reason: string;
  }): Promise<AccessRequest> {
    await new Promise((r) => setTimeout(r, 120));

    // Check if pending request exists
    const existing = requestsState.find(
      (r) => r.userId === params.userId && r.videoId === params.videoId && r.status === 'PENDING'
    );
    if (existing) {
      return existing;
    }

    const newRequest: AccessRequest = {
      id: `req-${Date.now().toString().slice(-4)}`,
      userId: params.userId,
      user: {
        name: params.userName,
        email: params.userEmail,
        image: params.userImage,
        role: 'USER',
      },
      videoId: params.videoId,
      videoTitle: params.videoTitle,
      videoThumbnail: params.videoThumbnail,
      reason: params.reason,
      status: 'PENDING',
      requestedAt: new Date().toISOString(),
      riskScore: 'LOW',
      previousRequestsCount: 1,
    };

    requestsState = [newRequest, ...requestsState];
    return newRequest;
  },

  async updateRequestStatus(
    requestId: string,
    status: RequestStatus,
    reviewerName: string = 'Aadithyan A.S.',
    rejectionReason?: string
  ): Promise<AccessRequest> {
    await new Promise((r) => setTimeout(r, 100));
    const idx = requestsState.findIndex((r) => r.id === requestId);
    if (idx === -1) throw new Error('Request not found');

    const now = new Date();
    const expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(); // 7 days default

    requestsState[idx] = {
      ...requestsState[idx],
      status,
      reviewedAt: now.toISOString(),
      reviewedBy: reviewerName,
      rejectionReason: status === 'REJECTED' ? rejectionReason || 'Access restricted under review policy' : undefined,
      expiresAt: status === 'APPROVED' ? expiresAt : undefined,
    };

    return requestsState[idx];
  },
};
