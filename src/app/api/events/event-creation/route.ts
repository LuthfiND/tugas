// import { NextRequest, NextResponse } from "next/server";
// import instance from "@/lib/axios";

// export async function POST(req: NextRequest) {
//   try {
//     const formData = await req.formData();
//     const data = new FormData();
//     for (const [key, value] of formData.entries()) {
//       data.append(key, value as any);
//     }
//     const response = await instance.post(
//       `${process.env.NEXT_PUBLIC_API_URL}/events`,
//       data,
//       { headers: { "Content-Type": "multipart/form-data" } }
//     );
//     return NextResponse.json(response.data);
//   } catch (error: any) {
//     return NextResponse.json(
//       { message: error?.response?.data?.message || "Failed to create event" },
//       { status: error?.response?.status || 500 }
//     );
//   }
// }
