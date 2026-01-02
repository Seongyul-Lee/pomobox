import { createClient, SupabaseClient } from "@supabase/supabase-js"

/**
 * Supabase Admin Client (Service Role)
 * - Server-side only (절대 클라이언트에서 사용 금지)
 * - RLS 우회하여 admin 권한 작업 수행
 * - 주 용도: 회원 탈퇴 (auth.admin.deleteUser)
 */

let _supabaseAdmin: SupabaseClient | null = null

export function getSupabaseAdmin(): SupabaseClient {
  if (_supabaseAdmin) {
    return _supabaseAdmin
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL environment variable")
  }

  if (!serviceRoleKey) {
    throw new Error(
      "Missing SUPABASE_SERVICE_ROLE_KEY environment variable. " +
        "Please add it to your Vercel project settings for production."
    )
  }

  _supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  return _supabaseAdmin
}

// 하위 호환성을 위한 getter (deprecated, getSupabaseAdmin() 사용 권장)
export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    return getSupabaseAdmin()[prop as keyof SupabaseClient]
  },
})
