import { PomodoroTimer } from "@/components/pomodoro-timer"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-black text-black dark:text-white p-4">
      <div className="absolute top-4 right-20">
        <ThemeToggle />
      </div>
      <div className="text-center mb-4 md:mb-8 px-4">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
        Pomodoro Timer
      </h1>
        <p className="text-gray-600 dark:text-gray-400">Stay focused, one session at a time</p>
      </div>
      <PomodoroTimer />
    </main>
  )
}