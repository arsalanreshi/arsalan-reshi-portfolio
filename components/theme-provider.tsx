"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    return defaultTheme
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
      try {
        const storedTheme = localStorage.getItem(storageKey) as Theme
        if (storedTheme && (storedTheme === "dark" || storedTheme === "light" || storedTheme === "system")) {
          setTheme(storedTheme)
        }
      } catch (error) {
        console.warn("Failed to read theme from localStorage:", error)
      }
    }
  }, [storageKey])

  useEffect(() => {
    if (!mounted || typeof window === "undefined" || typeof document === "undefined") return

    const root = document.documentElement
    root.classList.remove("light", "dark")

    if (theme === "system") {
      if (window.matchMedia) {
        try {
          const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
          root.classList.add(systemTheme)
        } catch (error) {
          root.classList.add("dark") // fallback
        }
      } else {
        root.classList.add("dark") // fallback for environments without matchMedia
      }
      return
    }

    root.classList.add(theme)
  }, [theme, mounted])

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
        try {
          localStorage.setItem(storageKey, newTheme)
        } catch (error) {
          console.warn("Failed to save theme to localStorage:", error)
        }
      }
      setTheme(newTheme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
