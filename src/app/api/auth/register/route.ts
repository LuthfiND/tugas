import instance from "@/lib/axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { fullName, email, password, referralCode } = await req.json();

    try {
        const response = await instance.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
            fullName,
            email,
            password,
            referralCode,
        });

        return NextResponse.json(response.data); // Kirim respons dari API ke frontend
    } catch (error: any) {
        return NextResponse.json(
            { message: error.response?.data?.message || "Register failed" },
            { status: error.response?.status || 500 }
        );
    }
}