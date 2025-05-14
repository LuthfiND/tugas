// src/types/dashboard.ts
export interface DashboardData {
  totalEvents: number;
  totalAttendees: number;
  upcomingEvent: {
    id: string;
    title: string;
    date: string;
  };
}
