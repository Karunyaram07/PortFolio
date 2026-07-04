"use client"

import * as React from "react"
import { ThemeProvider } from "./theme-provider"
import { ReactLenis } from "lenis/react"
import "lenis/dist/lenis.css"

/**
 * Global provider wrapper to handle Theme, Smooth Scrolling, and future root-level providers.
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export function Providers({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ReactLenis root options={{ lerp: 0.1, duration: 1.2, syncTouch: true }}>
        {children}
      </ReactLenis>
    </ThemeProvider>
  )
}
