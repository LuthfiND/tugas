import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const token = (await cookies()).get('accessToken')?.value
  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 })
  }

  return NextResponse.json({ message: 'Token is valid' }, { status: 200 })
}