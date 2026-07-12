"use client"

import * as React from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import {
  FiMail,
  FiMoon,
  FiSun,
  FiGithub,
  FiLinkedin,
  FiRotateCcw,
  FiCheckCircle,
  FiArrowRight,
  FiAward,
  FiLock,
  FiUnlock,
  FiMapPin,
  FiCalendar,
  FiBookOpen,
  FiBriefcase
} from "react-icons/fi"
import {
  TbSparkles,
  TbRadar,
  TbMathSymbols,
  TbActivityHeartbeat
} from "react-icons/tb"

// Import custom components
import EducationRoadmap from "./components/EducationRoadmap"
import OrbitalSkills from "./components/OrbitalSkills"
import CertificationsShowcase from "./components/CertificationsShowcase"

// Import real data
import { profile } from "@/data/profile"
import { projects } from "@/data/projects"
import { experience } from "@/data/experience"
import { education } from "@/data/education"
import { navigation } from "@/data/navigation"

export default function Home() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [cliLogs, setCliLogs] = React.useState([])
  const [cliTrigger, setCliTrigger] = React.useState(0)
  const [inProgressProject, setInProgressProject] = React.useState(null)

  // Interactive 3D Tilt state for the profile photo
  const [tiltStyle, setTiltStyle] = React.useState("rotate3d(1, -1, 1, 15deg)")

  // State to lock the photo card in a vertical position on click
  const [isStuck, setIsStuck] = React.useState(false)

  // Live telemetry logs state for the terminal widget
  const [telemetryLogs, setTelemetryLogs] = React.useState([
    { text: ">> Initializing profile connection...", type: "info" },
    { text: ">> Loading credentials... [OK]", type: "success" },
    { text: ">> Mapping B.Tech CSE telemetry...", type: "info" }
  ])

  // Canvas ref for background LiDAR coordinate network
  const canvasRef = React.useRef(null)

  React.useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(timer)
  }, [])

  React.useEffect(() => {
    if (!mounted) return
    const feed = [
      "loading Google Genkit AI modules...",
      "compiling static portfolio pathways...",
      "active internship search: listening...",
      "LiDAR/radar metrics synced successfully",
      "indexing co-authored research paper...",
      "active focus: full-stack AI dev loop",
      "HappySoul digital companion in progress",
      "Green Track complaint workflow active"
    ]
    let idx = 0
    const interval = setInterval(() => {
      setTelemetryLogs(prev => {
        const next = [...prev, { text: `>> ${feed[idx % feed.length]}`, type: "info" }]
        if (next.length > 5) next.shift()
        return next
      })
      idx++
    }, 3800)
    return () => clearInterval(interval)
  }, [mounted])

  // LiDAR particle network logic
  React.useEffect(() => {
    if (!mounted || !canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    let animationFrameId

    const fitCanvas = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth
        canvas.height = canvas.parentElement.clientHeight
      }
    }
    fitCanvas()
    window.addEventListener("resize", fitCanvas)

    const particles = []
    const particleCount = 45
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1,
        baseRadius: Math.random() * 2 + 1,
        pulseSpeed: 0.03 + Math.random() * 0.02,
        pulseValue: Math.random() * Math.PI
      })
    }

    let mouse = { x: null, y: null, active: false }
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.active = true
    }
    const handleMouseLeave = () => {
      mouse.x = null
      mouse.y = null
      mouse.active = false
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Background grid coordinates
      const gridSize = 80
      ctx.strokeStyle = resolvedTheme === "dark" ? "rgba(16, 185, 129, 0.02)" : "rgba(5, 150, 105, 0.02)"
      ctx.lineWidth = 0.5
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Draw & Update particles
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        if (mouse.active && mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            p.x += dx * 0.012
            p.y += dy * 0.012
          }
        }

        p.pulseValue += p.pulseSpeed
        p.radius = p.baseRadius + Math.sin(p.pulseValue) * 0.6

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = resolvedTheme === "dark" ? "rgba(16, 185, 129, 0.35)" : "rgba(5, 150, 105, 0.25)"
        ctx.fill()
      })

      // Connections between nodes
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = resolvedTheme === "dark"
              ? `rgba(16, 185, 129, ${0.15 * (1 - dist / 100)})`
              : `rgba(5, 150, 105, ${0.1 * (1 - dist / 100)})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      // Cursor radar crosshairs
      if (mouse.active && mouse.x !== null && mouse.y !== null) {
        const mx = mouse.x
        const my = mouse.y

        ctx.strokeStyle = resolvedTheme === "dark" ? "rgba(16, 185, 129, 0.15)" : "rgba(5, 150, 105, 0.1)"
        ctx.lineWidth = 0.6
        ctx.beginPath()
        ctx.moveTo(0, my)
        ctx.lineTo(canvas.width, my)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(mx, 0)
        ctx.lineTo(mx, canvas.height)
        ctx.stroke()

        ctx.beginPath()
        ctx.arc(mx, my, 50, 0, Math.PI * 2)
        ctx.strokeStyle = resolvedTheme === "dark" ? "rgba(16, 185, 129, 0.1)" : "rgba(5, 150, 105, 0.08)"
        ctx.stroke()

        ctx.fillStyle = resolvedTheme === "dark" ? "#10b981" : "#059669"
        ctx.font = "8px monospace"
        ctx.fillText(`LIDAR_X: ${Math.round(mx)}px`, mx + 10, my - 6)
        ctx.fillText(`LIDAR_Y: ${Math.round(my)}px`, mx + 10, my + 6)
      }

      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", fitCanvas)
      if (canvas) {
        canvas.removeEventListener("mousemove", handleMouseMove)
        canvas.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [mounted, resolvedTheme])

  // CLI terminal console messages simulator
  React.useEffect(() => {
    if (!mounted) return
    const messages = [
      "sprk login --role research_student",
      "▸ Authenticating Sunkara Prabhu Ram Karunya...",
      "▸ Target: Kalasalingam Academy & MulticoreWare",
      "▸ Active credentials: B.Tech CSE (Year: 2027)",
      "▸ Telemetry score: CGPA 9.51 / 10.0",
      "▸ nuScenes research: radar-to-camera matrix mapping...",
      "▸ Paper publication co-author: PEARL prompt pedagogy",
      "▸ STATUS: 200 SUCCESSFUL",
    ]

    let timers = []

    const mainTimer = setTimeout(() => {
      setCliLogs([])
      messages.forEach((line, index) => {
        const t = setTimeout(() => {
          setCliLogs(prev => [...prev, line])
        }, index * 250)
        timers.push(t)
      })
    }, 100)

    return () => {
      clearTimeout(mainTimer)
      timers.forEach(clearTimeout)
    }
  }, [mounted, cliTrigger])

  if (!mounted) {
    return <div className="p-8 text-center font-mono text-text-muted">Loading interface...</div>
  }

  // Marquee SIH project
  const sihProject = projects.find(p => p.id === "edupath")

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 antialiased selection:bg-accent/30 selection:text-foreground">

      {/* Global Noise Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Sticky Premium Navigation */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-mono text-body font-black text-transparent bg-clip-text bg-gradient-to-r from-gradient-start to-gradient-end tracking-wider">
            PRABHU RAM KARUNYA SUNKARA
          </Link>
          <div className="hidden md:flex gap-8 text-caption font-mono tracking-widest text-text-muted">
            {navigation.map((nav, idx) => (
              <Link key={idx} href={nav.href} className="hover:text-foreground transition-all uppercase">{nav.label}</Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="p-2 border border-border rounded-full hover:bg-muted transition-all text-text-secondary"
            >
              {resolvedTheme === "dark" ? <FiSun className="size-4" /> : <FiMoon className="size-4" />}
            </button>
            <a href={profile.resumePath} className="px-4 py-1.5 text-caption font-mono bg-accent text-accent-foreground rounded-full hover:brightness-105 transition-all font-bold">
              RESUME
            </a>
          </div>
        </div>
      </header>

      {/* Main Narrative Feed */}
      <main className="max-w-6xl mx-auto px-6 py-16 md:py-24 flex flex-col gap-32">

        {/* Section 1: Hero & Animated Photo */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[500px] relative">

          {/* Node Canvas background on the Hero card wrapper */}
          <div className="absolute inset-0 z-0 opacity-40 pointer-events-none rounded-3xl overflow-hidden border border-dashed border-border/40">
            <canvas ref={canvasRef} className="w-full h-full" />
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6 relative z-10 pointer-events-none select-none">
            <span className="text-caption font-mono text-accent bg-accent/5 border border-accent/15 px-3 py-1 rounded-full self-start font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="size-2 bg-accent rounded-full animate-ping" /> {profile.availability}
            </span>

            {/* Word-by-word Split Letter Hover Lift Header */}
            <div className="text-display-lg font-black tracking-tighter leading-[0.95] flex flex-wrap select-none uppercase text-foreground">
              {profile.fullName.split(" ").map((word, wIdx) => (
                <span key={wIdx} className="flex overflow-hidden py-1 mr-4">
                  {word.split("").map((char, index) => (
                    <span
                      key={index}
                      className="inline-block hover:text-accent hover:-translate-y-3 transition-all duration-300 ease-out cursor-pointer hover:scale-105 pointer-events-auto"
                      style={{ transitionDelay: `${index * 20}ms` }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </div>

            <p className="text-body-lg text-text-secondary leading-relaxed font-semibold font-sans max-w-xl text-accent">
              {profile.tagline}
            </p>
            <p className="text-body text-text-muted leading-relaxed font-sans max-w-lg">
              {profile.heroDescription}
            </p>
          </div>

          {/* Right side: Animated Profile Photo Card */}
          <div className="lg:col-span-5 flex justify-center items-center py-6 relative z-10">
            <div
              className="group relative w-[350px] h-[440px] rounded-3xl cursor-pointer"
              style={{ perspective: "1000px" }}
              onMouseMove={(e) => {
                if (isStuck) return
                const rect = e.currentTarget.getBoundingClientRect()
                const x = e.clientX - rect.left - rect.width / 2
                const y = e.clientY - rect.top - rect.height / 2
                // Dynamic tilt and hover scale shift
                setTiltStyle(`rotate3d(${-y / 15}, ${x / 15}, 0, 18deg) scale3d(1.03, 1.03, 1.03)`)
              }}
              onMouseLeave={() => {
                if (isStuck) return
                setTiltStyle("rotate3d(1, -1, 1, 15deg) scale3d(1, 1, 1)")
              }}
              onClick={() => {
                setIsStuck(prev => {
                  const next = !prev
                  if (next) {
                    // Lock the card in a straight vertical position (no tilt)
                    setTiltStyle("rotate3d(0, 0, 0, 0deg) scale3d(1.03, 1.03, 1.03)")
                  } else {
                    // Reset to default tilt state
                    setTiltStyle("rotate3d(1, -1, 1, 15deg) scale3d(1, 1, 1)")
                  }
                  return next
                })
              }}
            >
              <div
                className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-[0_0_35px_rgba(16,185,129,0.25)] animate-glow"
                style={{
                  transformStyle: "preserve-3d",
                  transform: tiltStyle,
                  transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease"
                }}
              >
                {/* Visual click-to-try lock state indicator badge */}
                <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white/90 font-mono text-[9px] uppercase tracking-widest select-none shadow-lg">
                  {isStuck ? (
                    <>
                      <FiLock className="size-3 text-accent animate-pulse" /> TELEMETRY LOCKED
                    </>
                  ) : (
                    <>
                      <FiUnlock className="size-3 text-white/50 animate-bounce" /> CLICK TO LOCK
                    </>
                  )}
                </div>

                <img
                  src={profile.profileImagePath}
                  alt={profile.fullName}
                  className={`w-full h-full object-cover filter contrast-[1.08] group-hover:scale-110 transition-all duration-700 ease-out ${isStuck ? "grayscale-0" : "grayscale group-hover:grayscale-0"
                    }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent flex items-end p-4">
                  <div>
                    <h4 className="font-bold text-caption tracking-tight text-foreground uppercase">{profile.fullName}</h4>
                    <p className="text-[10px] font-mono text-text-muted mt-0.5">{profile.professionalTitle}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Biography & System Telemetry Grid */}
        <section id="biography" className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-border/40 pt-16 scroll-mt-24">

          {/* Left column: Narrative Bio & Contact Info in Brutalist Card */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div>
              <span className="text-caption font-mono text-accent uppercase tracking-widest font-bold">01 // THE NARRATIVE</span>
              <h2 className="text-heading-1 font-bold mt-1 text-foreground font-serif flex items-center gap-2">About Me <FiBookOpen className="size-6 text-accent animate-pulse" /></h2>
            </div>

            <div className="border-4 border-foreground bg-card p-8 shadow-[10px_10px_0px_var(--accent)] relative overflow-hidden transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0px_var(--accent)] flex flex-col gap-6 text-left">
              {/* Header */}
              <div className="flex items-center gap-3 border-b-2 border-foreground pb-4 select-none">
                <div className="flex-shrink-0 flex items-center justify-center bg-foreground p-1 text-background rounded-sm">
                  <FiBookOpen className="size-4 text-accent" />
                </div>
                <span className="font-black text-foreground uppercase tracking-widest font-mono text-[11px]">
                  BIOGRAPHY_DATA
                </span>
              </div>

              {/* Bio paragraphs */}
              <div className="flex flex-col gap-5 text-body text-foreground leading-relaxed font-sans font-light">
                {profile.bioParagraphs.map((para, idx) => {
                  if (idx === profile.bioParagraphs.length - 1) {
                    return (
                      <p key={idx}>
                        If that sounds like a fit, reach me at{" "}
                        <a href="mailto:sprkarunya986@gmail.com" className="text-accent underline font-semibold hover:brightness-110">
                          sprkarunya986@gmail.com
                        </a>{" "}
                        or send a{" "}
                        <Link href="/contact" className="text-accent underline font-bold hover:brightness-110">
                          connection request here
                        </Link>
                        . I reply.
                      </p>
                    )
                  }
                  return <p key={idx}>{para}</p>
                })}
              </div>

              {/* Contact info footer */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t-2 border-foreground pt-6 mt-2">
                <div className="flex items-center gap-3 text-caption font-mono text-foreground font-bold">
                  <FiMapPin className="size-4 text-accent animate-pulse" />
                  <span>{profile.location.toUpperCase()}</span>
                </div>
                <div className="flex items-center gap-3 text-caption font-mono text-foreground font-bold">
                  <FiMail className="size-4 text-accent" />
                  <a href={`mailto:${profile.email}`} className="hover:underline">{profile.email.toUpperCase()}</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: Live Telemetry terminal widget, Diagnostics, & Quick Metrics in Cyber-Brutalist style */}
          <div className="lg:col-span-4 flex flex-col items-stretch justify-end gap-6 lg:sticky lg:top-24 w-full h-full min-h-[500px]">

            {/* Adapted Brutalist Telemetry Card */}
            <div className="w-full border-4 border-foreground bg-card p-6 shadow-[10px_10px_0px_var(--accent)] text-left font-mono relative overflow-hidden transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0px_var(--accent)]">
              {/* Header */}
              <div className="flex items-center gap-3 border-b-2 border-foreground pb-4 mb-6 select-none">
                <div className="flex-shrink-0 flex items-center justify-center bg-foreground p-1 text-background rounded-sm">
                  <TbRadar className="size-4 animate-spin text-accent" />
                </div>
                <span className="font-black text-foreground uppercase tracking-widest text-[11px]">
                  TELEMETRY_CORE
                </span>
              </div>

              {/* Logs Feed */}
              <div className="flex flex-col gap-3 h-28 overflow-hidden font-mono border-b-2 border-foreground pb-4 mb-6">
                {telemetryLogs.map((log, idx) => (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={idx}
                    className={`leading-tight font-semibold uppercase tracking-wider text-[10px] ${log.type === "success" ? "text-accent" : "text-foreground"
                      }`}
                  >
                    {log.text}
                  </motion.div>
                ))}
              </div>

              {/* Action Button */}
              <div className="mt-2">
                <button
                  onClick={() => {
                    setTelemetryLogs([
                      { text: ">> REBOOTING TELEMETRY SYSTEMS...", type: "info" },
                      { text: ">> CLEARING LOCAL BUFFER... [OK]", type: "success" },
                      { text: ">> INITIALIZING CONNECTION...", type: "info" }
                    ])
                  }}
                  className="w-full py-2.5 text-center font-bold text-caption uppercase border-2 border-foreground bg-foreground text-background dark:bg-background dark:text-foreground relative transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_var(--accent)] active:translate-x-1 active:translate-y-1 active:shadow-none shadow-[2px_2px_0px_var(--accent)]"
                >
                  REBOOT CORE
                </button>
              </div>
            </div>

            {/* Diagnostics Port Card (Fills white space) */}
            <div className="w-full border-2 border-foreground bg-card p-5 shadow-[4px_4px_0px_var(--accent)] text-left font-mono relative overflow-hidden transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_var(--accent)]">
              <div className="flex items-center gap-2 border-b border-foreground pb-2 mb-3 select-none">
                <span className="font-bold text-foreground uppercase tracking-widest text-[9px] flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-accent animate-pulse" /> DIAGNOSTICS_PORT
                </span>
              </div>
              <div className="flex flex-col gap-2 text-[9px]">
                <div className="flex justify-between items-center border-b border-border/20 pb-1">
                  <span className="text-text-muted">HAPPYSOUL COMPANION</span>
                  <span className="text-accent font-bold">94% COMPRESSED</span>
                </div>
                <div className="flex justify-between items-center border-b border-border/20 pb-1">
                  <span className="text-text-muted">GREEN TRACK COMPLAINTS</span>
                  <span className="text-accent font-bold">100% STABLE</span>
                </div>
                <div className="flex justify-between items-center border-b border-border/20 pb-1">
                  <span className="text-text-muted">SENSOR FUSION SYSTEM</span>
                  <span className="text-accent font-bold">ACTIVE</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-text-muted">LIDAR RADAR NETWORKS</span>
                  <span className="text-accent font-bold">SYNCED</span>
                </div>
              </div>

              {/* Animating Wave Scanline */}
              <div className="relative h-6 bg-black/10 dark:bg-black/40 border border-foreground/20 rounded-md overflow-hidden mt-3 flex items-center justify-center">
                <svg className="w-full h-full opacity-60" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path
                    d="M 0,10 Q 10,0 20,10 T 40,10 T 60,10 T 80,10 T 100,10"
                    fill="none"
                    stroke="var(--accent)"
                    strokeWidth="1"
                    strokeDasharray="4 2"
                  />
                </svg>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/15 to-transparent animate-[scan_2s_ease-in-out_infinite]" />
              </div>
            </div>

            {/* Quick Metrics Grid in Brutalist style */}
            <div className="w-full grid grid-cols-2 gap-6 font-mono text-center">
              <div className="p-5 border-2 border-foreground bg-card shadow-[4px_4px_0px_var(--accent)] flex flex-col justify-between min-h-24 select-none hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_var(--accent)] transition-all">
                <span className="text-heading-2 font-black text-foreground">{profile.currentCGPA}</span>
                <span className="text-[8px] text-text-muted uppercase tracking-wider font-bold">CGPA_SCORE</span>
              </div>
              <div className="p-5 border-2 border-foreground bg-card shadow-[4px_4px_0px_var(--accent)] flex flex-col justify-between min-h-24 select-none hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_var(--accent)] transition-all">
                <span className="text-heading-2 font-black text-foreground">SIH &apos;25</span>
                <span className="text-[8px] text-text-muted uppercase tracking-wider font-bold">GRAND_CHAMP</span>
              </div>
              <div className="p-5 border-2 border-foreground bg-card shadow-[4px_4px_0px_var(--accent)] flex flex-col justify-between min-h-24 select-none hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_var(--accent)] transition-all">
                <span className="text-heading-2 font-black text-foreground">1</span>
                <span className="text-[8px] text-text-muted uppercase tracking-wider font-bold">PUB_PAPER</span>
              </div>
              <div className="p-5 border-2 border-foreground bg-card shadow-[4px_4px_0px_var(--accent)] flex flex-col justify-between min-h-24 select-none hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_var(--accent)] transition-all">
                <span className="text-heading-2 font-black text-foreground">4+</span>
                <span className="text-[8px] text-text-muted uppercase tracking-wider font-bold">SYS_DEPLOYS</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Selected Work */}
        <section id="projects" className="flex flex-col gap-12 border-t border-border/40 pt-16 scroll-mt-24">
          <div className="flex justify-between items-baseline pb-4">
            <div>
              <span className="text-caption font-mono text-accent uppercase tracking-widest">02 // SELECTED WORK</span>
              <h2 className="text-heading-1 font-bold mt-1 text-foreground font-serif flex items-center gap-2">Featured System Integration <FiBriefcase className="size-6 text-accent animate-bounce" /></h2>
            </div>
            <Link href="/projects" className="font-mono text-caption text-accent hover:underline flex items-center gap-1 font-bold">
              ALL WORK <FiArrowRight className="size-3.5" />
            </Link>
          </div>

          {/* Quick glance of remaining projects before the SIH */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.filter(p => p.id !== "edupath").map((project) => {
              const isInProgress = project.status === "In Progress"
              return (
                <div
                  key={project.id}
                  className="border-2 border-foreground bg-card p-5 shadow-[4px_4px_0px_var(--accent)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_var(--accent)] transition-all duration-300 flex flex-col justify-between gap-4 text-left relative overflow-hidden"
                >
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[9px] font-mono font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">
                        {project.category}
                      </span>
                      {isInProgress && (
                        <span className="text-[8px] font-mono text-accent uppercase font-bold tracking-widest">IN_PROGRESS</span>
                      )}
                    </div>
                    <h3 className="text-body font-black tracking-tight text-foreground uppercase">
                      {project.title}
                    </h3>
                    <p className="text-small text-text-secondary leading-relaxed font-sans font-light line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                  <div className="border-t border-border/40 pt-3 flex justify-between items-center mt-2">
                    <span className="text-[9px] font-mono text-text-muted">EST: {project.year}</span>
                    <Link
                      href="/projects"
                      className="text-caption font-mono text-accent hover:underline font-bold flex items-center gap-1 uppercase"
                    >
                      DETAILS <FiArrowRight className="size-3" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Shortened Marquee Card: EduPath Navigator (Smart India Hackathon Winner) */}
          {sihProject && (
            <div className="relative group rounded-[24px] border-4 border-amber-500 bg-amber-500/[0.01] dark:bg-amber-400/[0.01] p-6 shadow-[8px_8px_0px_#f59e0b] hover:shadow-[10px_10px_0px_#f59e0b] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden flex flex-col gap-6 w-full text-left">
              {/* Animating glow overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-amber-500/5 opacity-50 pointer-events-none group-hover:scale-105 transition-transform duration-700" />

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b-2 border-amber-500/30 pb-4 relative z-10">
                <span className="px-3 py-1 bg-amber-500 text-black font-mono text-[9px] font-black tracking-widest rounded-sm uppercase flex items-center gap-1 select-none">
                  <FiAward className="size-3.5 animate-bounce" /> SIH &apos;25 CHAMPION
                </span>
                <span className="text-caption font-mono text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider">
                  {sihProject.category}
                </span>
              </div>

              <div className="flex flex-col md:flex-row gap-6 items-center relative z-10">
                <div className="w-24 h-24 rounded-[18px] border-2 border-amber-500/40 p-2 bg-white/90 dark:bg-black/60 shadow-md flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                  <img
                    src={sihProject.image}
                    alt={sihProject.title}
                    className="max-w-full max-h-full object-contain filter drop-shadow-md"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-heading-2 font-black tracking-tight text-foreground uppercase group-hover:text-amber-500 transition-colors">
                    {sihProject.title}
                  </h3>
                  <p className="text-body text-text-secondary leading-relaxed font-sans font-light">
                    {sihProject.description}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center border-t-2 border-amber-500/30 pt-4 relative z-10">
                <div className="flex gap-4">
                  {sihProject.demo && (
                    <a
                      href={sihProject.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="text-caption font-mono text-amber-600 dark:text-amber-400 hover:underline font-bold text-[11px]"
                    >
                      LIVE SYSTEM
                    </a>
                  )}
                  {sihProject.github && (
                    <a
                      href={sihProject.github}
                      target="_blank"
                      rel="noreferrer"
                      className="text-caption font-mono text-amber-600 dark:text-amber-400 hover:underline font-bold text-[11px]"
                    >
                      REPOSITORY
                    </a>
                  )}
                </div>
                <Link
                  href="/projects"
                  className="text-caption font-mono text-amber-600 dark:text-amber-400 hover:underline font-bold flex items-center gap-1 uppercase text-[11px]"
                >
                  VIEW DETAILS <FiArrowRight className="size-3" />
                </Link>
              </div>
            </div>
          )}

          {/* Centered CTA button below the card */}
          <div className="flex justify-center mt-4">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-accent-foreground font-mono text-caption tracking-widest rounded-full hover:brightness-105 transition-all font-bold uppercase shadow-lg shadow-accent/20"
            >
              Explore All Projects <FiArrowRight className="size-4" />
            </Link>
          </div>
        </section>

        {/* Section 3.5: Professional Experience */}
        <section id="experience" className="flex flex-col gap-8 border-t border-border/40 pt-16 scroll-mt-24">
          <div>
            <span className="text-caption font-mono text-accent uppercase tracking-widest">CHAPTERS</span>
            <h2 className="text-heading-1 font-bold mt-1 text-foreground font-serif flex items-center gap-2">Professional Experience <FiAward className="size-6 text-accent animate-pulse" /></h2>
          </div>

          <div className="relative pl-8 border-l border-border/80 flex flex-col gap-12">
            {experience.map((exp, idx) => (
              <div key={idx} className="relative flex flex-col gap-3">
                {/* Dot marker */}
                <span className="absolute -left-[41px] top-1 size-5 rounded-full bg-background border-4 border-accent" />

                <div className="flex justify-between items-baseline gap-2 flex-wrap">
                  <h3 className="text-heading-2 font-bold text-foreground">{exp.role}</h3>
                  <span className="text-caption font-mono text-accent font-semibold">{exp.duration}</span>
                </div>
                <p className="text-body font-mono text-text-secondary font-semibold">{exp.company} &bull; {exp.location}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  {exp.description.map((desc, dIdx) => (
                    <div key={dIdx} className="p-4 bg-muted/40 border border-border/60 rounded-2xl text-small text-text-secondary leading-relaxed font-sans font-light">
                      {desc}
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {exp.technologies.map((tech, tIdx) => (
                    <span key={tIdx} className="text-caption font-mono bg-muted/60 text-text-secondary px-3 py-1 rounded-full border border-border/40 text-[10px]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Telemetry Log & Academic Metrics */}
        <section id="research" className="grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-border/40 pt-16 items-stretch">

          {/* Left panel: Academic Focus and ICTIEE Accept */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div>
              <span className="text-caption font-mono text-accent uppercase tracking-widest">03 // RESEARCH PROJECTS</span>
              <h2 className="text-heading-1 font-bold mt-1 text-foreground font-serif flex items-center gap-2">Academics & Publications <FiAward className="size-6 text-accent animate-bounce" /></h2>
            </div>

            <div className="p-8 border border-border bg-[#0b0c10]/5 dark:bg-[#ffffff]/[0.02] rounded-3xl flex flex-col gap-6 w-full text-left">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-caption font-mono text-[#10b981] bg-[#10b981]/10 border border-[#10b981]/25 px-3 py-1 rounded-sm font-bold uppercase tracking-wider">
                  ICTIEE 2026 Accept
                </span>
                <span className="text-[10px] font-mono text-text-muted">CO-AUTHOR</span>
              </div>
              <div className="flex flex-col gap-3">
                <h3 className="text-heading-2 font-black tracking-tight text-foreground leading-snug uppercase">
                  PEARL: Prompt Engineering Pedagogy for Teaching and Learning of Specific Technologies
                </h3>
                <p className="text-body text-text-secondary leading-relaxed font-light font-sans">
                  Designing prompt structures systematically in EdTech contexts, validating metrics, and developing companion tutor sandboxes (PEARL Tutor) to optimize engineering learner loops.
                </p>
              </div>
              <div className="flex gap-4 border-t border-border/40 pt-4 mt-2">
                <a 
                  href="https://www.linkedin.com/posts/prabhu-ram-karunya-sunkara-11986528a_ictiee-2026-research-presentation-certificate-ugcPost-7438313456425996288-oMWl/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline font-mono text-caption text-foreground hover:text-accent font-bold"
                >
                  View Publication Details
                </a>
              </div>
            </div>
          </div>

          {/* Right panel: High-Tech Telemetry logs console */}
          <div className="lg:col-span-6 flex flex-col justify-end gap-6 h-full w-full pb-1">
            <span className="text-caption font-mono text-text-muted uppercase tracking-widest">TELEMETRY SYSTEM</span>

            <div className="bg-[#040508] border border-border rounded-2xl overflow-hidden shadow-xl font-mono text-caption">
              <div className="bg-[#0c0d10] px-4 py-3 border-b border-border flex justify-between items-center select-none">
                <div className="flex items-center gap-2">
                  <TbRadar className="size-4 text-accent animate-spin" />
                  <span className="text-[10px] font-bold text-accent uppercase tracking-widest">active_sensor_feed</span>
                </div>
                <button
                  onClick={() => setCliTrigger(prev => prev + 1)}
                  className="text-accent hover:underline flex items-center gap-1 text-[10px] font-bold uppercase"
                >
                  <FiRotateCcw className="size-3" /> restart
                </button>
              </div>
              <div className="p-5 flex flex-col gap-2 min-h-[260px] text-emerald-400 bg-black/40">
                {cliLogs.map((log, index) => (
                  <div key={index} className="leading-relaxed text-[11px]">
                    {log}
                  </div>
                ))}
                {cliLogs.length === 8 && (
                  <div className="text-[11px] text-accent animate-pulse">
                    ▸ LISTENING FOR ACTIVE COORDINATES ON HERO CANVAS...
                  </div>
                )}
              </div>
            </div>
          </div>

        </section>

        {/* Section 5: Orbital Skills */}
        <section id="skills" className="flex flex-col gap-8 border-t border-border/40 pt-16 scroll-mt-24">
          <OrbitalSkills />
        </section>

        {/* Section 6: Education Journey */}
        <section id="education" className="flex flex-col gap-8 border-t border-border/40 pt-16 scroll-mt-24">
          <EducationRoadmap />
        </section>

        {/* Section 7: Verifications & Certificates */}
        <section id="certifications" className="flex flex-col gap-8 border-t border-border/40 pt-16 scroll-mt-24">
          <div>
            <span className="text-caption font-mono text-accent uppercase tracking-widest font-bold">CREDENTIALS</span>
            <h2 className="text-heading-1 font-bold mt-1 text-foreground font-serif flex items-center gap-2">Certificates <FiCheckCircle className="size-6 text-accent animate-pulse" /></h2>
          </div>
          <CertificationsShowcase limit={3} />
          <div className="flex justify-center mt-4">
            <Link
              href="/credentials"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border bg-card rounded-2xl hover:border-accent hover:shadow-[4px_4px_0px_var(--accent)] text-caption font-mono text-foreground hover:text-accent font-bold transition-all uppercase"
            >
              View All Certificates <FiArrowRight className="size-4" />
            </Link>
          </div>
        </section>

        {/* Section 8: Contact CTA */}
        <section id="contact" className="border border-border bg-[#0b0c10]/5 dark:bg-[#ffffff]/[0.02] p-8 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-8 font-mono">
          <div className="flex flex-col gap-2">
            <span className="text-caption text-accent uppercase tracking-widest font-bold">CONTACT_TRIGGER</span>
            <h3 className="text-heading-1 font-bold text-foreground uppercase">Initialize connection loop</h3>
            <p className="text-caption text-text-muted font-sans mt-1 font-light">Accepting active internships, sensor fusion research collaborations, and creative development queries.</p>
          </div>

          <Link
            href="/contact"
            className="px-6 py-3 bg-accent text-accent-foreground hover:brightness-105 font-bold text-caption rounded-full tracking-widest flex items-center gap-2 transition-all uppercase"
          >
            CONNECT DIRECTLY {"\u2192"}
          </Link>
        </section>

      </main>

      {/* Interactive Modal overlay for projects in development */}
      <AnimatePresence>
        {inProgressProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
            onClick={() => setInProgressProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-card border-2 border-accent rounded-3xl p-8 max-w-md w-full shadow-[0_0_50px_rgba(16,185,129,0.3)] font-mono flex flex-col gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3">
                <span className="size-3 rounded-full bg-accent animate-ping" />
                <h3 className="text-heading-2 font-black text-foreground uppercase">Project In Progress</h3>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-body text-text-secondary leading-relaxed font-sans font-light">
                  <strong>{inProgressProject.title}</strong> is currently under active development. I am building core pipeline components and refining user flows.
                </p>
                <p className="text-caption text-text-muted font-sans font-light">
                  You can explore the source code directly in the repository, or share your valuable ideas and feedback through the contact form!
                </p>
              </div>

              <div className="p-4 bg-muted/40 border border-border/60 rounded-2xl flex flex-col gap-2 font-sans text-[11px] text-text-muted">
                <span className="font-mono text-accent uppercase font-bold text-[10px]">✨ ACTIVE TELEMETRY</span>
                <span>• Prefilling pipeline configurations...</span>
                <span>• Refining conversational responses...</span>
              </div>

              <div className="flex flex-col gap-3 font-mono">
                {inProgressProject.github && (
                  <a
                    href={inProgressProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full text-center py-2.5 bg-accent text-accent-foreground hover:brightness-105 rounded-xl transition-all font-bold text-caption uppercase flex items-center justify-center gap-1.5"
                  >
                    <FiGithub className="size-4" /> Go To Repository
                  </a>
                )}
                <Link
                  href={`/contact?project=${encodeURIComponent(inProgressProject.title)}`}
                  className="w-full text-center py-2.5 border border-border hover:bg-muted text-text-secondary rounded-xl transition-all font-bold text-caption uppercase"
                >
                  Share Ideas / Feedback
                </Link>
                <button
                  onClick={() => setInProgressProject(null)}
                  className="w-full text-center py-2.5 bg-transparent hover:text-accent text-text-muted transition-all font-bold text-[11px] uppercase tracking-wider mt-1"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Premium Footer */}
      <footer className="border-t border-border px-6 py-12 bg-muted/20 text-center font-mono text-caption text-text-muted">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Sunkara Prabhu Ram Karunya. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="https://github.com/Karunyaram07" target="_blank" rel="noreferrer" className="hover:text-foreground">GITHUB</a>
            <a href="https://www.linkedin.com/in/prabhu-ram-sunkara-95b627295/" target="_blank" rel="noreferrer" className="hover:text-foreground">LINKEDIN</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
