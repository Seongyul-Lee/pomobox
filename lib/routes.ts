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

  GUIDE: {
    ROOT: '/guide',
    WHAT_IS_POMODORO: '/guide/what-is-pomodoro',
    FOR_STUDENTS: '/guide/pomodoro-for-students',
    FOR_DEVELOPERS: '/guide/pomodoro-for-developers',
    VS_TIMEBOXING: '/guide/pomodoro-vs-timeboxing',
    AVOID_DISTRACTIONS: '/guide/how-to-avoid-distractions',
  },

  BLOG: {
    ROOT: '/blog',
    HISTORY: '/blog/pomodoro-history',
    SCIENCE_OF_FOCUS: '/blog/science-of-focus',
  },

  ABOUT: '/about',
  CONTACT: '/contact',
  FAQ: '/faq',
  PRIVACY: '/privacy-policy',
} as const

export type RouteKey = keyof typeof ROUTES
