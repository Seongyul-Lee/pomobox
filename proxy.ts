import { type NextRequest, NextResponse } from "next/server"
import { updateSession } from "./lib/supabase/middleware"

export async function proxy(request: NextRequest) {
  const response = NextResponse.next()
  return await updateSession(request, response)
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
}
