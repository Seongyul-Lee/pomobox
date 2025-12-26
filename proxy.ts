import { type NextRequest } from "next/server"
import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing"
import { updateSession } from "./lib/supabase/middleware"

const handleI18nRouting = createMiddleware(routing)

export async function proxy(request: NextRequest) {
  // 1. next-intl 로케일 라우팅
  const response = handleI18nRouting(request)

  // 2. Supabase 세션 갱신 (쿠키를 response에 설정)
  return await updateSession(request, response)
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
}
