import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const response = NextResponse.json({message:"sign put"})
    response.cookies.set('auth_token', '', {
      maxAge: 0, 
    });
    return response;
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
