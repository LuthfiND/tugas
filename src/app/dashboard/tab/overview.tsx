// src/components/dashboard/tab/overview.tsx
import React from "react";
import type { DashboardData } from "../dashboard/dashboard";

interface OverviewProps {
  data: DashboardData;
}

const Overview: React.FC<OverviewProps> = ({ data }) => (
  <div>
    <h2 className="text-2xl font-semibold mb-4">Overview</h2>
    <div className="space-y-2">
      <p>
        Total Events: <span className="font-bold">{data.totalEvents}</span>
      </p>
      <p>
        Total Attendees:{" "}
        <span className="font-bold">{data.totalAttendees}</span>
      </p>
      <p>
        Upcoming Event:{" "}
        <span className="font-bold">{data.upcomingEvent.title}</span> on{" "}
        <span className="font-bold">{data.upcomingEvent.date}</span>
      </p>
    </div>
    {/* TODO: tambahkan grafik / metrik lebih lanjut */}
  </div>
);

export default Overview;
