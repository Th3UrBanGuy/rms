import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET! })

  if (token) {
    return NextResponse.next()
  }

  const { pathname } = req.nextUrl
  if (pathname.startsWith("/api")) {
    return new Response("Unauthorized", { status: 401 })
  }

  return NextResponse.redirect(new URL("/auth/signin", req.url))
}

export const config = { matcher: ["/menu", "/orders", "/tables", "/", "/api/menu", "/api/orders", "/api/tables"] }