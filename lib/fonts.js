import { Geist, Geist_Mono } from "next/font/google"

/**
 * Fonts configured for the application using next/font/google.
 * Includes variable class configurations for Tailwind.
 */

export const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
})

export const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
})
