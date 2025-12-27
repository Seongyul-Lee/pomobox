"use client"

import { ThemeProvider } from "next-themes"

const themes = [
  "light",
  "dark",
  "synthwave",
  "cyberpunk",
  "dracula",
  "coffee",
  "nord",
  "cupcake",
  "valentine",
  "aqua",
  "forest",
  "halloween",
]

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" themes={themes}>
      {children}
    </ThemeProvider>
  )
}
