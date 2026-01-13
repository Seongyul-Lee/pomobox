/**
 * Centralized route configuration
 * All application routes should be defined here to avoid hardcoding paths across the codebase
 */
export const ROUTES = {
  HOME: '/',

  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    CALLBACK: '/auth/callback',
  },

  STATS: '/stats',

  LEARN: '/learn',

  GUIDE: {
    ROOT: '/guide',
    WHAT_IS_POMODORO: '/guide/what-is-pomodoro',
    FOR_STUDENTS: '/guide/pomodoro-for-students',
    FOR_DEVELOPERS: '/guide/pomodoro-for-developers',
    FOR_WRITERS: '/guide/pomodoro-for-writers',
    FOR_DESIGNERS: '/guide/pomodoro-for-designers',
    FOR_MANAGERS: '/guide/pomodoro-for-managers',
    FOR_FREELANCERS: '/guide/pomodoro-for-freelancers',
    FOR_ENTREPRENEURS: '/guide/pomodoro-for-entrepreneurs',
    VS_TIMEBOXING: '/guide/pomodoro-vs-timeboxing',
    AVOID_DISTRACTIONS: '/guide/how-to-avoid-distractions',
    FOR_REMOTE_WORKERS: '/guide/pomodoro-for-remote-workers',
  },

  BLOG: {
    ROOT: '/blog',
    HISTORY: '/blog/pomodoro-history',
    SCIENCE_OF_FOCUS: '/blog/science-of-focus',
    PSYCHOLOGY_OF_TIMER_SOUNDS: '/blog/psychology-of-timer-sounds',
    WHY_25_MINUTES: '/blog/why-25-minutes',
    COST_OF_TASK_SWITCHING: '/blog/cost-of-task-switching',
    POMODORO_FOR_ADHD: '/blog/pomodoro-for-adhd',
    ULTRADIAN_RHYTHMS: '/blog/ultradian-rhythms',
    FLOWTIME_VS_POMODORO: '/blog/flowtime-vs-pomodoro',
    FOCUS_FOR_CODING_INTERVIEWS: '/blog/focus-for-coding-interviews',
    NATURE_SOUNDS_FOCUS: '/blog/nature-sounds-focus',
    DEEP_WORK_METHOD: '/blog/deep-work-method',
    MORNING_ROUTINE_PRODUCTIVITY: '/blog/morning-routine-productivity',
    CAFFEINE_AND_FOCUS: '/blog/caffeine-and-focus',
    SOCIAL_MEDIA_BRAIN: '/blog/social-media-brain',
    SCIENCE_OF_BREAKS: '/blog/science-of-breaks',
    SLEEP_AND_PRODUCTIVITY: '/blog/sleep-and-productivity',
    ENERGY_MANAGEMENT: '/blog/energy-management-not-time',
    ERGONOMICS_FOR_FOCUS: '/blog/ergonomics-for-focus',
    HABIT_STACKING: '/blog/habit-stacking',
    PRODUCTIVE_PROCRASTINATION: '/blog/productive-procrastination',
    WEEKLY_REVIEW_HABIT: '/blog/weekly-review-habit',
    BATCHING_TASKS: '/blog/batching-tasks',
  },

  ABOUT: '/about',
  CONTACT: '/contact',
  FAQ: '/faq',
  PRIVACY: '/privacy-policy',
} as const
