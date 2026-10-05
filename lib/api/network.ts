import { NetworkLog, NetworkTelemetry } from '@/types';
import { mockNetworkLogs } from '@/lib/mock/networkLogs';
import { mockNetworkMetrics, mockNetworkTimeSeries } from '@/lib/mock/statistics';

let networkLogsState: NetworkLog[] = [...mockNetworkLogs];

export interface NetworkFilters {
  status?: number | 'ALL';
  method?: string | 'ALL';
  search?: string;
}

export const networkApi = {
  async getTelemetry(): Promise<NetworkTelemetry> {
    await new Promise((r) => setTimeout(r, 40));
    return { ...mockNetworkMetrics };
  },

  async getTimeSeries() {
    await new Promise((r) => setTimeout(r, 40));
    return [...mockNetworkTimeSeries];
  },

  async getLogs(filters: NetworkFilters = {}): Promise<NetworkLog[]> {
    await new Promise((r) => setTimeout(r, 60));
    let logs = [...networkLogsState];

    if (filters.status && filters.status !== 'ALL') {
      logs = logs.filter((l) => l.status === filters.status);
    }

    if (filters.method && filters.method !== 'ALL') {
      logs = logs.filter((l) => l.method === filters.method);
    }

    if (filters.search) {
      const q = filters.search.toLowerCase();
      logs = logs.filter(
        (l) =>
          l.endpoint.toLowerCase().includes(q) ||
          l.ipAddress.toLowerCase().includes(q) ||
          l.region.toLowerCase().includes(q) ||
          l.userAgent.toLowerCase().includes(q)
      );
    }

    return logs;
  },

  async pushLog(log: Omit<NetworkLog, 'id' | 'timestamp'>): Promise<NetworkLog> {
    const newLog: NetworkLog = {
      ...log,
      id: `net-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString(),
    };
    networkLogsState = [newLog, ...networkLogsState.slice(0, 99)];
    return newLog;
  },
};
