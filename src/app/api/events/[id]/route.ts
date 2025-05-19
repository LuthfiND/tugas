import instance from "@/lib/axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const response = await instance.get(`/events/${Number(id)}`);
    if (response.data) {
      return NextResponse.json(response.data);
    } else {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.response?.data?.message || "Failed to fetch event" },
      { status: error?.response?.status || 500 }
    );
  }
}
