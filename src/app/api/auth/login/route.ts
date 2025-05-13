import instance from "@/lib/axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST (req: NextRequest , res : NextResponse) {
    const { email, password } = await req.json();
        const response = await instance.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            email,
            password,
        });
        const { token } = response.data;
        (await cookies()).set("accessToken", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        });
        (await cookies()).set("userId", response.data.data.id, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        });
        return NextResponse.json(response.data);
   }