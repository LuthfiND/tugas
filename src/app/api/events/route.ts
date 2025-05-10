import instance from "@/lib/axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET (request : NextRequest , res: NextResponse) {
    const getEvents = await instance.get('/events')
    return NextResponse.json(getEvents.data)
}