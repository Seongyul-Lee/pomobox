-- ============================================
-- RLS Performance Optimization Migration
-- Fixes: auth_rls_initplan, multiple_permissive_policies
-- ============================================

-- ============================================
-- 1. profiles 테이블 중복 정책 정리
-- ============================================
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;

-- profiles 최적화 정책 (존재하는 경우만)
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_tables WHERE schemaname = 'public' AND tablename = 'profiles') THEN
    EXECUTE 'CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING ((select auth.uid()) = id)';
    EXECUTE 'CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING ((select auth.uid()) = id)';
    EXECUTE 'CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK ((select auth.uid()) = id)';
  END IF;
END $$;

-- ============================================
-- 2. focus_sessions 중복 정책 정리 및 최적화
-- ============================================
DROP POLICY IF EXISTS "Users can view own sessions" ON focus_sessions;
DROP POLICY IF EXISTS "Users can insert own sessions" ON focus_sessions;
DROP POLICY IF EXISTS "Users can view own focus_sessions" ON focus_sessions;
DROP POLICY IF EXISTS "Users can insert own focus_sessions" ON focus_sessions;
DROP POLICY IF EXISTS "Users can update own focus_sessions" ON focus_sessions;
DROP POLICY IF EXISTS "Users can delete own focus_sessions" ON focus_sessions;

CREATE POLICY "Users can view own focus_sessions"
ON focus_sessions FOR SELECT
USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert own focus_sessions"
ON focus_sessions FOR INSERT
WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update own focus_sessions"
ON focus_sessions FOR UPDATE
USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can delete own focus_sessions"
ON focus_sessions FOR DELETE
USING ((select auth.uid()) = user_id);

-- ============================================
-- 3. daily_stats 중복 정책 정리 및 최적화
-- ============================================
DROP POLICY IF EXISTS "Users can view own stats" ON daily_stats;
DROP POLICY IF EXISTS "Users can insert own stats" ON daily_stats;
DROP POLICY IF EXISTS "Users can update own stats" ON daily_stats;
DROP POLICY IF EXISTS "Users can view own daily_stats" ON daily_stats;
DROP POLICY IF EXISTS "Users can insert own daily_stats" ON daily_stats;
DROP POLICY IF EXISTS "Users can update own daily_stats" ON daily_stats;
DROP POLICY IF EXISTS "Users can delete own daily_stats" ON daily_stats;

CREATE POLICY "Users can view own daily_stats"
ON daily_stats FOR SELECT
USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert own daily_stats"
ON daily_stats FOR INSERT
WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update own daily_stats"
ON daily_stats FOR UPDATE
USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can delete own daily_stats"
ON daily_stats FOR DELETE
USING ((select auth.uid()) = user_id);

-- ============================================
-- 4. attendance 중복 정책 정리 및 최적화
-- ============================================
DROP POLICY IF EXISTS "Users can read own attendance" ON attendance;
DROP POLICY IF EXISTS "Users can view own attendance" ON attendance;
DROP POLICY IF EXISTS "Users can insert own attendance" ON attendance;
DROP POLICY IF EXISTS "Users can delete own attendance" ON attendance;

CREATE POLICY "Users can view own attendance"
ON attendance FOR SELECT
USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert own attendance"
ON attendance FOR INSERT
WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can delete own attendance"
ON attendance FOR DELETE
USING ((select auth.uid()) = user_id);

-- ============================================
-- 5. user_stats 중복 정책 정리 및 최적화
-- ============================================
DROP POLICY IF EXISTS "Users can manage own stats" ON user_stats;
DROP POLICY IF EXISTS "Users can view own user_stats" ON user_stats;
DROP POLICY IF EXISTS "Users can insert own user_stats" ON user_stats;
DROP POLICY IF EXISTS "Users can update own user_stats" ON user_stats;

CREATE POLICY "Users can view own user_stats"
ON user_stats FOR SELECT
USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert own user_stats"
ON user_stats FOR INSERT
WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update own user_stats"
ON user_stats FOR UPDATE
USING ((select auth.uid()) = user_id);

-- ============================================
-- 6. tasks 정책 최적화
-- ============================================
DROP POLICY IF EXISTS "Users can view own tasks" ON tasks;
DROP POLICY IF EXISTS "Users can insert own tasks" ON tasks;
DROP POLICY IF EXISTS "Users can update own tasks" ON tasks;
DROP POLICY IF EXISTS "Users can delete own tasks" ON tasks;

CREATE POLICY "Users can view own tasks"
ON tasks FOR SELECT
USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert own tasks"
ON tasks FOR INSERT
WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update own tasks"
ON tasks FOR UPDATE
USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can delete own tasks"
ON tasks FOR DELETE
USING ((select auth.uid()) = user_id);

-- ============================================
-- 7. user_settings 정책 최적화
-- ============================================
DROP POLICY IF EXISTS "Users can view own user_settings" ON user_settings;
DROP POLICY IF EXISTS "Users can insert own user_settings" ON user_settings;
DROP POLICY IF EXISTS "Users can update own user_settings" ON user_settings;

CREATE POLICY "Users can view own user_settings"
ON user_settings FOR SELECT
USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert own user_settings"
ON user_settings FOR INSERT
WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update own user_settings"
ON user_settings FOR UPDATE
USING ((select auth.uid()) = user_id);
