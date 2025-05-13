import instance from "@/lib/axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST (req: NextRequest , res : NextResponse) {
    try {
          const {eventId,qty,isPointUse,isUseCoupon,userCouponId,isUseVoucher,userVoucherId} = await req.json();
   const userId = (await cookies()).get("userId")?.value;
    if (!userId) {
        return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
    }
 
    if (!eventId || !qty) {
        return NextResponse.json({ message: "Event ID and quantity are required" }, { status: 400 });
    }
   const response = await instance.post(`${process.env.NEXT_PUBLIC_API_URL}/transaction`, {
       eventId,
       userId: Number(userId),
       qty,
       isPointUse,
       isUseCoupon,
       userCouponId,
       isUseVoucher,
       userVoucherId
   });
    return NextResponse.json({data : response.data}, { status: 200 });
    } catch (error) {
        console.log(error)
        console.error("Error in transaction route:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
        
    }
 
}