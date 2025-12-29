-- ============================================
-- Fix: Function Search Path Mutable
-- Supabase Security Advisor 경고 해결
-- ============================================

-- 1. update_updated_at_column 함수 수정
-- 기존 트리거는 유지되고 함수만 재정의됨
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SET search_path = public;

COMMENT ON FUNCTION public.update_updated_at_column() IS 'updated_at 컬럼 자동 갱신 트리거 함수';

-- 2. handle_new_user 함수 수정
-- Auth 트리거: 새 사용자 가입 시 profiles 테이블에 레코드 생성
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id)
  VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public;

COMMENT ON FUNCTION public.handle_new_user() IS '새 사용자 가입 시 profiles 레코드 자동 생성';
