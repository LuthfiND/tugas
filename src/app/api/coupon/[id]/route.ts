import instance from "@/lib/axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = await  params;
    const response = await instance.get(`coupons/${Number(id)}`)
  if (response.data) {
    return NextResponse.json(response.data);
  } else {
    return NextResponse.json({ message: 'Coupon not found' }, { status: 404 });
  }
}