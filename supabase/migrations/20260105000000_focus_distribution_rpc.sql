-- ============================================
-- RPC Function: get_focus_distribution_by_hour
-- 시간대별 집중도 분포 데이터 반환
-- ============================================

-- 1. RPC 함수 정의
CREATE OR REPLACE FUNCTION public.get_focus_distribution_by_hour(
  p_user_id UUID,
  p_start_date DATE,
  p_end_date DATE,
  p_user_timezone TEXT DEFAULT 'UTC'
)
RETURNS TABLE(
  hour INTEGER,
  total_minutes INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    EXTRACT(HOUR FROM (fs.completed_at AT TIME ZONE 'UTC' AT TIME ZONE p_user_timezone))::INTEGER AS hour,
    SUM(fs.duration_minutes)::INTEGER AS total_minutes
  FROM public.focus_sessions fs
  WHERE
    fs.user_id = p_user_id
    AND fs.session_type = 'focus'
    AND DATE(fs.completed_at AT TIME ZONE p_user_timezone) BETWEEN p_start_date AND p_end_date
  GROUP BY EXTRACT(HOUR FROM (fs.completed_at AT TIME ZONE 'UTC' AT TIME ZONE p_user_timezone))
  ORDER BY hour;
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public;

COMMENT ON FUNCTION public.get_focus_distribution_by_hour(UUID, DATE, DATE, TEXT)
IS '시간대별(0-23) 집중 시간 분포 반환. session_type=focus만 집계, 타임존 변환 지원';

-- 2. 권한 설정
GRANT EXECUTE ON FUNCTION public.get_focus_distribution_by_hour(UUID, DATE, DATE, TEXT) TO authenticated;
