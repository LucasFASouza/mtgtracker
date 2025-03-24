import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  
  return NextResponse.json({
    user: session?.user ? {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    } : null
  });
}
