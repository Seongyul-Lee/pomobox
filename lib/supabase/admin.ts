import { createClient } from "@supabase/supabase-js"

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL")
}

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY")
}

/**
 * Supabase Admin Client (Service Role)
 * - Server-side only (절대 클라이언트에서 사용 금지)
 * - RLS 우회하여 admin 권한 작업 수행
 * - 주 용도: 회원 탈퇴 (auth.admin.deleteUser)
 */
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)
