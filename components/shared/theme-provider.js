"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

/**
 * Custom Theme Provider wrapping next-themes for dark mode management.
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export function ThemeProvider({ children, ...props }) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
