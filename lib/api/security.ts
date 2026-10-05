import { SecurityLog, SeverityLevel, AuditAction, SecurityScoreMetrics } from '@/types';
import { mockSecurityLogs } from '@/lib/mock/securityLogs';
import { mockSecurityScore } from '@/lib/mock/statistics';

let securityLogsState: SecurityLog[] = [...mockSecurityLogs];

export interface SecurityFilters {
  severity?: SeverityLevel | 'ALL';
  action?: AuditAction | 'ALL';
  search?: string;
}

export const securityApi = {
  async getMetrics(): Promise<SecurityScoreMetrics> {
    await new Promise((r) => setTimeout(r, 40));
    return { ...mockSecurityScore };
  },

  async getLogs(filters: SecurityFilters = {}): Promise<SecurityLog[]> {
    await new Promise((r) => setTimeout(r, 60));
    let logs = [...securityLogsState];

    if (filters.severity && filters.severity !== 'ALL') {
      logs = logs.filter((l) => l.severity === filters.severity);
    }

    if (filters.action && filters.action !== 'ALL') {
      logs = logs.filter((l) => l.action === filters.action);
    }

    if (filters.search) {
      const q = filters.search.toLowerCase();
      logs = logs.filter(
        (l) =>
          l.event.toLowerCase().includes(q) ||
          l.ipAddress.toLowerCase().includes(q) ||
          l.userName?.toLowerCase().includes(q) ||
          l.details?.toLowerCase().includes(q)
      );
    }

    return logs;
  },

  async logEvent(event: Omit<SecurityLog, 'id' | 'timestamp'>): Promise<SecurityLog> {
    const newLog: SecurityLog = {
      ...event,
      id: `sec-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString(),
    };
    securityLogsState = [newLog, ...securityLogsState];
    return newLog;
  },
};
