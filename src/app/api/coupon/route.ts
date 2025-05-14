import instance from "@/lib/axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: Request) {
    console.log('masuk ke coupon')
    const cookieStore = await cookies();
    const id = cookieStore.get('userId')?.value;
    const response = await instance.get(`coupons/${Number(id)}`)
    console.log(response.data[0], 'dari server coupon')
  if (response.data) {
    return NextResponse.json(response.data[0]);
  } else {
    console.log('masuk ke coupon not found')
    return NextResponse.json({ message: 'Coupon not found' }, { status: 404 });
  }
}