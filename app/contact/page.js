"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiGithub,
  FiLinkedin,
  FiSend,
  FiCheckCircle,
  FiSun,
  FiMoon
} from "react-icons/fi"
import { TbSparkles } from "react-icons/tb"
import { profile } from "@/data/profile"
import { navigation } from "@/data/navigation"

export default function ContactPage() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [formState, setFormState] = React.useState("idle") // idle | sending | success
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })

  React.useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(timer)
  }, [])

  React.useEffect(() => {
    if (mounted && typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const project = params.get("project")
      if (project) {
        setTimeout(() => {
          setFormData(prev => ({
            ...prev,
            subject: `Feedback / Ideas for ${project}`,
            message: `Hi Prabhu Ram,\n\nI have some ideas/feedback regarding your project "${project}": `
          }))
        }, 0)
      }
    }
  }, [mounted])

  if (!mounted) {
    return <div className="p-8 text-center font-mono text-text-muted">Loading contact...</div>
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    setFormState("sending")

    // Simulate sending progress
    setTimeout(() => {
      setFormState("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
    }, 1500)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
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
              <Link key={idx} href={nav.href} className={`hover:text-foreground transition-all uppercase ${nav.href === "/contact" ? "text-accent font-bold" : ""}`}>{nav.label}</Link>
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
      <main className="max-w-5xl mx-auto px-6 py-16 md:py-24 flex flex-col gap-16">

        {/* Title */}
        <div className="flex flex-col gap-3 max-w-xl">
          <span className="text-caption font-mono text-accent uppercase tracking-widest">CONNECT</span>
          <h1 className="text-display-lg font-black tracking-tighter leading-none">
            Get in <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gradient-start to-gradient-end">Touch</span>
          </h1>
          <p className="text-body text-text-secondary leading-relaxed font-light mt-2 font-sans">
            Have a project, research collaboration, or position in mind? Let&apos;s initialize a connection loop.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">

          {/* Info Side */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <div className="p-6 border border-border bg-[#0b0c10]/5 dark:bg-[#ffffff]/[0.02] rounded-3xl flex flex-col gap-5">
              <span className="text-caption font-mono text-accent uppercase tracking-wider font-bold">DIRECTORY</span>

              <div className="flex flex-col gap-4 font-mono text-caption text-text-secondary">
                <div className="flex items-center gap-3">
                  <FiMail className="size-4.5 text-accent" />
                  <div>
                    <p className="text-[10px] text-text-muted">PRIMARY_EMAIL</p>
                    <a href={`mailto:${profile.email}`} className="hover:underline text-foreground">{profile.email}</a>
                  </div>
                </div>

                <div className="flex items-center gap-3 border-t border-border/40 pt-4">
                  <FiPhone className="size-4.5 text-accent" />
                  <div>
                    <p className="text-[10px] text-text-muted">PHONE_NUM</p>
                    <a href={`tel:${profile.phone}`} className="hover:underline text-foreground">{profile.phone}</a>
                  </div>
                </div>

                <div className="flex items-center gap-3 border-t border-border/40 pt-4">
                  <FiMapPin className="size-4.5 text-accent" />
                  <div>
                    <p className="text-[10px] text-text-muted">LOCATION</p>
                    <span className="text-foreground">{profile.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Grid */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href="https://github.com/Karunyaram07"
                target="_blank"
                rel="noreferrer"
                className="p-5 border border-border bg-[#0b0c10]/5 dark:bg-[#ffffff]/[0.02] hover:border-accent/40 rounded-2xl flex flex-col items-center justify-center gap-2 group transition-all duration-300"
              >
                <FiGithub className="size-6 text-text-secondary group-hover:text-accent transition-colors" />
                <span className="text-caption font-mono text-text-muted group-hover:text-foreground transition-colors font-bold uppercase">GITHUB</span>
              </a>

              <a
                href="https://www.linkedin.com/in/prabhu-ram-karunya-sunkara-11986528a"
                target="_blank"
                rel="noreferrer"
                className="p-5 border border-border bg-[#0b0c10]/5 dark:bg-[#ffffff]/[0.02] hover:border-accent/40 rounded-2xl flex flex-col items-center justify-center gap-2 group transition-all duration-300"
              >
                <FiLinkedin className="size-6 text-text-secondary group-hover:text-accent transition-colors" />
                <span className="text-caption font-mono text-text-muted group-hover:text-foreground transition-colors font-bold uppercase">LINKEDIN</span>
              </a>
            </div>

            {/* Availability Pill */}
            <div className="flex items-center gap-2 px-4 py-3 border border-border bg-emerald-500/5 dark:bg-emerald-500/10 rounded-2xl">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="text-caption text-emerald-600 dark:text-emerald-400 font-medium leading-tight font-sans">
                {profile.availability}
              </p>
            </div>
          </div>

          {/* Form Side */}
          <div className="md:col-span-7 p-8 border border-border bg-[#0b0c10]/5 dark:bg-[#ffffff]/[0.02] rounded-3xl">

            <AnimatePresence mode="wait">
              {formState !== "success" ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-caption font-mono text-text-muted uppercase">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={formState === "sending"}
                        className="p-3 bg-background border border-border rounded-xl focus:outline-none focus:border-accent font-sans text-body transition-colors"
                        placeholder="Karunya Sunkara"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-caption font-mono text-text-muted uppercase">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={formState === "sending"}
                        className="p-3 bg-background border border-border rounded-xl focus:outline-none focus:border-accent font-sans text-body transition-colors"
                        placeholder="you@domain.com"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="subject" className="text-caption font-mono text-text-muted uppercase">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={formState === "sending"}
                      className="p-3 bg-background border border-border rounded-xl focus:outline-none focus:border-accent font-sans text-body transition-colors"
                      placeholder="Opportunity / Collaboration request"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-caption font-mono text-text-muted uppercase">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={formState === "sending"}
                      rows={5}
                      className="p-3 bg-background border border-border rounded-xl focus:outline-none focus:border-accent font-sans text-body transition-colors resize-none"
                      placeholder="Hello! I'd like to reach out regarding..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formState === "sending"}
                    className="mt-2 py-3.5 px-6 bg-accent hover:brightness-105 disabled:opacity-50 text-accent-foreground font-mono text-caption tracking-wider rounded-xl flex items-center justify-center gap-2 transition-all font-bold"
                  >
                    {formState === "sending" ? (
                      <>
                        <span className="size-4 border-2 border-accent-foreground border-t-transparent rounded-full animate-spin" />
                        <span>TRANSMITTING MESSAGE...</span>
                      </>
                    ) : (
                      <>
                        <FiSend className="size-4" />
                        <span>INITIALIZE CONNECTION</span>
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success-message"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-12 gap-4 font-mono"
                >
                  <FiCheckCircle className="size-16 text-emerald-500 animate-bounce" />
                  <h3 className="text-heading-2 font-bold text-foreground uppercase tracking-tight">Transmission Successful</h3>
                  <p className="text-caption text-text-muted font-sans max-w-sm mt-1">
                    Your message has been processed successfully. I will get back to you as soon as the telemetry loops complete.
                  </p>
                  <button
                    onClick={() => setFormState("idle")}
                    className="mt-6 px-5 py-2 border border-border hover:bg-muted text-caption text-text-secondary rounded-full transition-colors uppercase font-bold"
                  >
                    Send another message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-12 bg-muted/20 text-center font-mono text-caption text-text-muted">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Sunkara Prabhu Ram Karunya. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="https://github.com/sprkarunya986" target="_blank" rel="noreferrer" className="hover:text-foreground">GITHUB</a>
            <a href="https://linkedin.com/in/sprkarunya986" target="_blank" rel="noreferrer" className="hover:text-foreground">LINKEDIN</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
