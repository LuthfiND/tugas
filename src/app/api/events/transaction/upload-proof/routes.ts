import instance from "@/lib/axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const id = req.nextUrl.searchParams.get("id"); // Ambil ID transaksi dari query parameter
    const formData = await req.formData(); // Ambil file dari request body

    if (!id) {
        return NextResponse.json({ message: "Transaction ID is required" }, { status: 400 });
    }

    try {
        const response = await instance.post(
            `${process.env.NEXT_PUBLIC_API_URL}/transaction/${id}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        return NextResponse.json(response.data); // Kirim respons dari API ke frontend
    } catch (error: any) {
        return NextResponse.json(
            { message: error.response?.data?.message || "Upload failed" },
            { status: error.response?.status || 500 }
        );
    }
}