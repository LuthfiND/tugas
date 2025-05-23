//clear cookies and redirect to home page
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req : Request) {
  const cookieStore = await cookies();
  await cookieStore.delete("accessToken");
  await cookieStore.delete("userId");
  return NextResponse.json({ message: "Logout successful" }, { status: 200 });
}
