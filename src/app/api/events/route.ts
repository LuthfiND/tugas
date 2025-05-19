import instance from "@/lib/axios";
import { NextRequest, NextResponse } from "next/server";

// Handler GET untuk fetch events
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const page = searchParams.get("page") || "1";
  const take = searchParams.get("take") || "10";
  const sortBy = searchParams.get("sortBy") || "createdAt";
  const sortOrder = searchParams.get("sortOrder") || "desc";

  const response = await instance.get("/events", {
    params: { search, page, take, sortBy, sortOrder },
  });
  return NextResponse.json(response.data);
}

// Handler POST untuk create event
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const data = new FormData();
    for (const [key, value] of formData.entries()) {
      data.append(key, value as any);
    }
    const response = await instance.post(
      `${process.env.NEXT_PUBLIC_API_URL}/events`,
      data,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error?.response?.data?.message || "Failed to create event" },
      { status: error?.response?.status || 500 }
    );
  }
}
