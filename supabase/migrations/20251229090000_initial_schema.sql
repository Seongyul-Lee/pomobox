-- ============================================
-- Pomobox Database Schema
-- Migration: 001_initial_schema
-- ============================================

-- 1. focus_sessions: Focus 세션 기록
CREATE TABLE IF NOT EXISTS focus_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  duration_minutes INTEGER NOT NULL DEFAULT 0,
  session_type TEXT NOT NULL DEFAULT 'focus' CHECK (session_type IN ('focus', 'break', 'long_break')),
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE focus_sessions IS 'Focus 세션 완료 기록';
COMMENT ON COLUMN focus_sessions.duration_minutes IS '세션 시간 (분)';
COMMENT ON COLUMN focus_sessions.session_type IS 'focus / break / long_break';

-- 2. daily_stats: 일별 통계 집계
CREATE TABLE IF NOT EXISTS daily_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  total_sessions INTEGER NOT NULL DEFAULT 0,
  total_minutes INTEGER NOT NULL DEFAULT 0,
  goal_achieved BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, date)
);

COMMENT ON TABLE daily_stats IS '일별 통계 (user_id + date 고유)';
COMMENT ON COLUMN daily_stats.goal_achieved IS '일일 목표 달성 여부';

-- 3. attendance: 출석 체크 기록
CREATE TABLE IF NOT EXISTS attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  checked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, date)
);

COMMENT ON TABLE attendance IS '출석 체크 기록 (user_id + date 고유)';

-- 4. user_stats: 사용자 누적 통계
CREATE TABLE IF NOT EXISTS user_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  best_streak INTEGER NOT NULL DEFAULT 0,
  total_focus_minutes INTEGER NOT NULL DEFAULT 0,
  total_sessions INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE user_stats IS '사용자 누적 통계 (user_id 고유)';
COMMENT ON COLUMN user_stats.best_streak IS '최고 연속 출석 일수';

-- 5. tasks: Task 목록 (2차 기능)
CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  estimated_pomodoros INTEGER DEFAULT 1,
  completed_pomodoros INTEGER DEFAULT 0,
  is_completed BOOLEAN NOT NULL DEFAULT FALSE,
  priority INTEGER DEFAULT 0,
  due_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE tasks IS 'Task 목록 (2차 기능)';
COMMENT ON COLUMN tasks.estimated_pomodoros IS '예상 뽀모도로 수';
COMMENT ON COLUMN tasks.completed_pomodoros IS '완료된 뽀모도로 수';

-- 6. user_settings: 사용자 설정
CREATE TABLE IF NOT EXISTS user_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  focus_duration INTEGER NOT NULL DEFAULT 25,
  break_duration INTEGER NOT NULL DEFAULT 5,
  long_break_duration INTEGER NOT NULL DEFAULT 15,
  daily_goal INTEGER NOT NULL DEFAULT 120,
  notifications_enabled BOOLEAN NOT NULL DEFAULT FALSE,
  sound_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  sound_category TEXT NOT NULL DEFAULT 'melody',
  sound_type TEXT NOT NULL DEFAULT 'achievement',
  volume INTEGER NOT NULL DEFAULT 50,
  theme TEXT NOT NULL DEFAULT 'system',
  language TEXT NOT NULL DEFAULT 'en',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE user_settings IS '사용자 설정 (user_id 고유)';

-- ============================================
-- Indexes (성능 최적화)
-- ============================================

-- focus_sessions: 사용자별 최신 세션 조회
CREATE INDEX IF NOT EXISTS idx_focus_sessions_user_completed
ON focus_sessions(user_id, completed_at DESC);

-- daily_stats: 사용자별 날짜 조회
CREATE INDEX IF NOT EXISTS idx_daily_stats_user_date
ON daily_stats(user_id, date DESC);

-- attendance: 사용자별 날짜 조회
CREATE INDEX IF NOT EXISTS idx_attendance_user_date
ON attendance(user_id, date DESC);

-- tasks: 사용자별 미완료 Task 조회
CREATE INDEX IF NOT EXISTS idx_tasks_user_incomplete
ON tasks(user_id, is_completed, priority DESC);

-- ============================================
-- Row Level Security (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE focus_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only access their own data
-- Drop existing policies first to avoid conflicts

-- focus_sessions
DROP POLICY IF EXISTS "Users can view own focus_sessions" ON focus_sessions;
DROP POLICY IF EXISTS "Users can insert own focus_sessions" ON focus_sessions;
DROP POLICY IF EXISTS "Users can update own focus_sessions" ON focus_sessions;
DROP POLICY IF EXISTS "Users can delete own focus_sessions" ON focus_sessions;

CREATE POLICY "Users can view own focus_sessions"
ON focus_sessions FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own focus_sessions"
ON focus_sessions FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own focus_sessions"
ON focus_sessions FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own focus_sessions"
ON focus_sessions FOR DELETE
USING (auth.uid() = user_id);

-- daily_stats
DROP POLICY IF EXISTS "Users can view own daily_stats" ON daily_stats;
DROP POLICY IF EXISTS "Users can insert own daily_stats" ON daily_stats;
DROP POLICY IF EXISTS "Users can update own daily_stats" ON daily_stats;
DROP POLICY IF EXISTS "Users can delete own daily_stats" ON daily_stats;

CREATE POLICY "Users can view own daily_stats"
ON daily_stats FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own daily_stats"
ON daily_stats FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own daily_stats"
ON daily_stats FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own daily_stats"
ON daily_stats FOR DELETE
USING (auth.uid() = user_id);

-- attendance
DROP POLICY IF EXISTS "Users can view own attendance" ON attendance;
DROP POLICY IF EXISTS "Users can insert own attendance" ON attendance;
DROP POLICY IF EXISTS "Users can delete own attendance" ON attendance;

CREATE POLICY "Users can view own attendance"
ON attendance FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own attendance"
ON attendance FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own attendance"
ON attendance FOR DELETE
USING (auth.uid() = user_id);

-- user_stats
DROP POLICY IF EXISTS "Users can view own user_stats" ON user_stats;
DROP POLICY IF EXISTS "Users can insert own user_stats" ON user_stats;
DROP POLICY IF EXISTS "Users can update own user_stats" ON user_stats;

CREATE POLICY "Users can view own user_stats"
ON user_stats FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own user_stats"
ON user_stats FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own user_stats"
ON user_stats FOR UPDATE
USING (auth.uid() = user_id);

-- tasks
DROP POLICY IF EXISTS "Users can view own tasks" ON tasks;
DROP POLICY IF EXISTS "Users can insert own tasks" ON tasks;
DROP POLICY IF EXISTS "Users can update own tasks" ON tasks;
DROP POLICY IF EXISTS "Users can delete own tasks" ON tasks;

CREATE POLICY "Users can view own tasks"
ON tasks FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tasks"
ON tasks FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tasks"
ON tasks FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own tasks"
ON tasks FOR DELETE
USING (auth.uid() = user_id);

-- user_settings
DROP POLICY IF EXISTS "Users can view own user_settings" ON user_settings;
DROP POLICY IF EXISTS "Users can insert own user_settings" ON user_settings;
DROP POLICY IF EXISTS "Users can update own user_settings" ON user_settings;

CREATE POLICY "Users can view own user_settings"
ON user_settings FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own user_settings"
ON user_settings FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own user_settings"
ON user_settings FOR UPDATE
USING (auth.uid() = user_id);

-- ============================================
-- Triggers: updated_at 자동 갱신
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_daily_stats_updated_at
BEFORE UPDATE ON daily_stats
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_stats_updated_at
BEFORE UPDATE ON user_stats
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tasks_updated_at
BEFORE UPDATE ON tasks
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_settings_updated_at
BEFORE UPDATE ON user_settings
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
