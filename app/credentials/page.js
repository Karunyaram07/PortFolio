"use client"

import * as React from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { FiSun, FiMoon } from "react-icons/fi"
import { profile } from "@/data/profile"
import { navigation } from "@/data/navigation"
import CertificationsShowcase from "../components/CertificationsShowcase"

export default function CredentialsPage() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(timer)
  }, [])

  if (!mounted) {
    return <div className="p-8 text-center font-mono text-text-muted">Loading credentials...</div>
  }

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 antialiased selection:bg-accent/30">

      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-mono text-body font-bold text-transparent bg-clip-text bg-gradient-to-r from-gradient-start to-gradient-end tracking-wider">
            {profile.shortName.toUpperCase()}
          </Link>
          <div className="hidden md:flex gap-8 text-caption font-mono tracking-widest text-text-muted">
            {navigation.map((nav, idx) => (
              <Link
                key={idx}
                href={nav.href}
                className={`hover:text-foreground transition-all uppercase ${nav.href === "/credentials" ? "text-accent font-bold" : ""}`}
              >
                {nav.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="p-2 border border-border rounded-full hover:bg-muted transition-all text-text-secondary"
            >
              {resolvedTheme === "dark" ? <FiSun className="size-4" /> : <FiMoon className="size-4" />}
            </button>
            <a href={profile.resumePath} className="px-4 py-1.5 text-caption font-mono bg-accent text-accent-foreground rounded-full hover:brightness-105 transition-all">
              RESUME
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-16 md:py-24 flex flex-col gap-12">

        {/* Page Title Section */}
        <div className="flex flex-col gap-3 border-b border-border pb-8">
          <span className="text-caption font-mono text-accent uppercase tracking-widest">VERIFIABLE CREDENTIALS</span>
          <h1 className="text-display-lg font-black tracking-tighter leading-none">
            Certifications & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gradient-start to-gradient-end">Academic Honors</span>
          </h1>
          <p className="text-body text-text-secondary max-w-xl font-light leading-relaxed mt-2">
            A comprehensive registry of academic distinctions, national laurels, and certifications in Artificial Intelligence and Algorithms.
          </p>
        </div>

        {/* Certifications Showcase */}
        <div className="w-full">
          <CertificationsShowcase />
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-12 bg-muted/20 text-center font-mono text-caption text-text-muted">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Sunkara Prabhu Ram Karunya. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="https://github.com/Karunyaram07" target="_blank" rel="noreferrer" className="hover:text-foreground">GITHUB</a>
            <a href="https://www.linkedin.com/in/prabhu-ram-karunya-sunkara-11986528a" target="_blank" rel="noreferrer" className="hover:text-foreground">LINKEDIN</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
