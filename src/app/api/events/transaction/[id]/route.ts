//create api get transaction detail by id
import instance from "@/lib/axios";
import { NextResponse } from "next/server";


export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = await params;
  const response = await instance.get(`/transaction/${Number(id)}`);
  if (response.data) {
    return NextResponse.json(response.data);
  } else {
    return NextResponse.json({ message: "Transaction not found" }, { status: 404 });
  }
}
