-- ============================================
-- User Profile Auto-Creation Trigger
-- Migration: create_user_profile_trigger
-- ============================================
--
-- 문제: Google OAuth 로그인 시 auth.users에만 데이터가 생성되고
--       public 스키마의 user_settings, user_stats에 초기 데이터가 없음
-- 해결: auth.users INSERT 시 자동으로 초기 데이터 생성
-- ============================================

-- 1. Function: 새 사용자에 대한 초기 프로필 데이터 생성
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  -- user_settings 초기 데이터 생성 (기본값 사용)
  INSERT INTO public.user_settings (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;

  -- user_stats 초기 데이터 생성 (기본값 사용)
  INSERT INTO public.user_stats (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$;

-- 2. 기존 트리거 삭제 (있으면)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 3. 트리거 생성: auth.users INSERT 시 handle_new_user 실행
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 4. 기존 사용자에 대해 누락된 데이터 생성 (백필)
-- user_settings가 없는 기존 사용자
INSERT INTO public.user_settings (user_id)
SELECT id FROM auth.users
WHERE id NOT IN (SELECT user_id FROM public.user_settings)
ON CONFLICT (user_id) DO NOTHING;

-- user_stats가 없는 기존 사용자
INSERT INTO public.user_stats (user_id)
SELECT id FROM auth.users
WHERE id NOT IN (SELECT user_id FROM public.user_stats)
ON CONFLICT (user_id) DO NOTHING;

-- ============================================
-- Comment
-- ============================================
COMMENT ON FUNCTION public.handle_new_user() IS
  'auth.users에 새 사용자가 생성될 때 user_settings와 user_stats에 초기 데이터를 자동 생성';
