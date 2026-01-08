import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Pomobox - Minimal Pomodoro Timer',
    short_name: 'Pomobox',
    description: 'A clean, distraction-free Pomodoro timer to boost your productivity.',
    start_url: '/',
    display: 'standalone',
    background_color: '#1a1625',
    theme_color: '#1a1625',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    categories: ['productivity', 'utilities'],
  }
}
