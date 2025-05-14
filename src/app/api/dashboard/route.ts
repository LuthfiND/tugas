// src/app/api/dashboard/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  // Simulasi data dashboard (bisa kamu ganti dengan akses database)
  const dashboardData = {
    totalEvents: 12,
    totalAttendees: 327,
    upcomingEvent: {
      id: "evt_001",
      title: "Tech Conference 2025",
      date: "2025-08-01",
    },
  };

  return NextResponse.json(dashboardData);
}
