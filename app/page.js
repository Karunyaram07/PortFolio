"use client"

import * as React from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import {
  FiMail,
  FiMoon,
  FiSun,
  FiGithub,
  FiLinkedin,
  FiRotateCcw,
  FiCheckCircle,
  FiArrowRight
} from "react-icons/fi"
import {
  TbSparkles,
  TbRadar,
  TbMathSymbols,
  TbActivityHeartbeat
} from "react-icons/tb"

// Import real data
import { profile } from "@/data/profile"
import { projects } from "@/data/projects"
import { experience } from "@/data/experience"
import { navigation } from "@/data/navigation"

export default function Home() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [cliLogs, setCliLogs] = React.useState([])
  const [cliTrigger, setCliTrigger] = React.useState(0)

  // Interactive 3D Tilt state for the profile photo
  const [tiltStyle, setTiltStyle] = React.useState("rotate3d(1, -1, 1, 15deg)")

  // Canvas ref for background LiDAR coordinate network
  const canvasRef = React.useRef(null)

  React.useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(timer)
  }, [])

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
      "▸ Authenticated: Sunkara Prabhu Ram Karunya...",
      "▸ Target: Kalasalingam Academy & MulticoreWare",
      "▸ Active credentials: B.Tech CSE (Year: 2027)",
      "▸ Telemetry score: CGPA 9.52 / 10.0",
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

  // Filter out featured projects
  const featuredProjects = projects.filter(p => p.featured)

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
            {profile.shortName.toUpperCase()}
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

            {/* Split Letter Hover Lift Header */}
            <div className="text-display-lg font-black tracking-tighter leading-[0.95] flex flex-col select-none uppercase text-foreground">
              <span className="flex flex-wrap overflow-hidden py-1">
                {profile.shortName.split("").map((char, index) => (
                  <span
                    key={index}
                    className="inline-block hover:text-accent hover:-translate-y-3 transition-all duration-300 ease-out cursor-pointer hover:scale-105 pointer-events-auto"
                    style={{ transitionDelay: `${index * 20}ms` }}
                  >
                    {char}
                  </span>
                ))}
              </span>
              <span className="flex flex-wrap overflow-hidden py-1 text-transparent bg-clip-text bg-gradient-to-r from-gradient-start to-gradient-end font-extrabold">
                {"CREATIVE".split("").map((char, index) => (
                  <span
                    key={index}
                    className="inline-block hover:text-accent hover:-translate-y-3 transition-all duration-300 ease-out cursor-pointer hover:scale-105 pointer-events-auto"
                    style={{ transitionDelay: `${index * 15}ms` }}
                  >
                    {char}
                  </span>
                ))}
                <span className="w-4" />
                {"DEV".split("").map((char, index) => (
                  <span
                    key={index}
                    className="inline-block hover:text-accent hover:-translate-y-3 transition-all duration-300 ease-out cursor-pointer hover:scale-105 pointer-events-auto"
                    style={{ transitionDelay: `${index * 15}ms` }}
                  >
                    {char}
                  </span>
                ))}
              </span>
            </div>

            <p className="text-body-lg text-text-secondary leading-relaxed font-light font-sans max-w-xl">
              {profile.tagline}
            </p>
            <p className="text-body text-text-muted leading-relaxed font-sans max-w-lg">
              {profile.heroDescription}
            </p>
          </div>

          {/* Right side: Animated Profile Photo Card */}
          <div className="lg:col-span-5 flex justify-center items-center py-6 relative z-10">
            <div
              className="relative w-80 h-96 rounded-3xl cursor-pointer"
              style={{ perspective: "1000px" }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect()
                const x = e.clientX - rect.left - rect.width / 2
                const y = e.clientY - rect.top - rect.height / 2
                // Dynamic tilt and hover scale shift
                setTiltStyle(`rotate3d(${-y / 15}, ${x / 15}, 0, 18deg) scale3d(1.03, 1.03, 1.03)`)
              }}
              onMouseLeave={() => setTiltStyle("rotate3d(1, -1, 1, 15deg) scale3d(1, 1, 1)")}
            >
              <div
                className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-purple-500/10 border border-border/80 rounded-3xl p-3 flex flex-col justify-between shadow-2xl transition-all duration-300 hover:border-accent hover:shadow-[0_0_35px_rgba(16,185,129,0.25)]"
                style={{
                  transformStyle: "preserve-3d",
                  transform: tiltStyle,
                  transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, box-shadow 0.4s ease"
                }}
              >
                {/* Photo frame */}
                <div className="w-full h-full rounded-2xl overflow-hidden relative" style={{ transform: "translateZ(30px)" }}>
                  <img
                    src={profile.profileImagePath}
                    alt={profile.fullName}
                    className="w-full h-full object-cover filter grayscale contrast-[1.08] hover:grayscale-0 transition-all duration-700"
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
          </div>
        </section>

        {/* Section 2: Featured Case Studies (Asymmetric Alternating layout) */}
        <section id="projects" className="flex flex-col gap-16">
          <div className="flex justify-between items-baseline border-b border-border pb-4">
            <div>
              <span className="text-caption font-mono text-accent uppercase tracking-widest">01 // SELECTED WORK</span>
              <h2 className="text-heading-1 font-bold mt-1 text-foreground">Featured System Integrations</h2>
            </div>
            <Link href="/projects" className="font-mono text-caption text-accent hover:underline flex items-center gap-1 font-bold">
              ALL WORK <FiArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="flex flex-col gap-20">
            {featuredProjects.map((project, idx) => {
              const isEven = idx % 2 === 0
              return (
                <div
                  key={project.id}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative group`}
                >
                  {/* Alternating glass description box */}
                  <div className={`lg:col-span-6 flex flex-col justify-between p-8 rounded-3xl border border-border glass relative overflow-hidden group-hover:bg-glass-hover transition-all duration-500 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                    <div className="flex flex-col gap-4">
                      <div className="flex justify-between items-center text-caption font-mono">
                        <span className="text-accent uppercase tracking-widest font-bold">{project.category}</span>
                        <span className="text-text-muted">STAGE: {project.status.toUpperCase()}</span>
                      </div>
                      <h3 className="text-heading-1 font-black tracking-tight text-foreground group-hover:text-accent transition-colors">{project.title}</h3>
                      <p className="text-body text-text-secondary leading-relaxed font-light font-sans">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-6">
                      {project.techStack.map((tech, tIdx) => (
                        <span key={tIdx} className="text-caption font-mono bg-muted/60 text-text-secondary px-2.5 py-0.5 rounded-full border border-border/40 text-[10px]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Asymmetric highlights and repository link pane */}
                  <div className={`lg:col-span-6 p-8 flex flex-col justify-center gap-6 border border-dashed border-border/60 rounded-3xl ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                    <span className="text-caption font-mono text-text-muted">YEAR // {project.year}</span>
                    <h4 className="text-heading-2 font-bold text-foreground">Project Highlights & Benchmarks</h4>

                    <div className="flex flex-col gap-3">
                      {project.highlights.map((hl, hIdx) => (
                        <div key={hIdx} className="flex gap-2 items-start text-caption font-mono text-text-secondary leading-relaxed">
                          <span className="size-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>

                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 border border-border rounded-full text-caption font-mono hover:bg-muted transition-all flex items-center gap-1.5 self-start mt-2 font-bold"
                      >
                        <FiGithub className="size-3.5" /> COMPILED REPOSITORY
                      </a>
                    )}
                  </div>

                </div>
              )
            })}
          </div>
        </section>

        {/* Section 3: Telemetry Log & Academic Metrics */}
        <section id="research" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left panel: Academic Focus and ICTIEE Accept */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            <div>
              <span className="text-caption font-mono text-accent uppercase tracking-widest">02 // RESEARCH PROJECTS</span>
              <h2 className="text-heading-1 font-bold mt-1 text-foreground">Academics & Publications</h2>
            </div>

            <div className="p-8 border border-border glass rounded-3xl flex flex-col gap-6">
              <span className="text-caption font-mono text-[#10b981] bg-[#10b981]/10 border border-[#10b981]/25 px-3 py-1 rounded-sm self-start font-bold uppercase tracking-wider">
                ICTIEE 2026 Accept
              </span>
              <h3 className="text-heading-2 font-bold tracking-tight text-foreground leading-snug">
                PEARL: Prompt Engineering Pedagogy for Teaching and Learning of Specific Technologies
              </h3>
              <p className="text-body text-text-secondary leading-relaxed font-light font-sans">
                Designing prompt structures systematically in EdTech contexts, validating metrics, and developing companion tutor sandboxes (PEARL Tutor) to optimize engineering learner loops.
              </p>
            </div>

            {/* Dashboard Mini Metrics cards */}
            <div className="grid grid-cols-2 gap-4 font-mono text-center">
              <div className="p-5 border border-border bg-[#0b0c10]/5 dark:bg-[#ffffff]/[0.02] rounded-2xl flex flex-col justify-between min-h-24">
                <span className="text-heading-1 font-black text-accent">{profile.currentCGPA}</span>
                <span className="text-[10px] text-text-muted uppercase tracking-widest">CGPA_SCORE</span>
              </div>
              <div className="p-5 border border-border bg-[#0b0c10]/5 dark:bg-[#ffffff]/[0.02] rounded-2xl flex flex-col justify-between min-h-24">
                <span className="text-heading-1 font-black text-accent">SIH &apos;25</span>
                <span className="text-[10px] text-text-muted uppercase tracking-widest">SIH_WINNER</span>
              </div>
            </div>
          </div>

          {/* Right panel: High-Tech Telemetry logs console */}
          <div className="lg:col-span-6 flex flex-col gap-6">
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

        {/* Section 4: Contact CTA */}
        <section id="contact" className="border border-border bg-[#0b0c10]/5 dark:bg-[#ffffff]/[0.02] p-8 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-8 font-mono">
          <div className="flex flex-col gap-2">
            <span className="text-caption text-accent uppercase tracking-widest font-bold">CONTACT_TRIGGER</span>
            <h3 className="text-heading-1 font-bold text-foreground uppercase">Initialize connection loop</h3>
            <p className="text-caption text-text-muted font-sans mt-1">Accepting active internships, sensor fusion research collaborations, and creative development queries.</p>
          </div>

          <Link
            href="/contact"
            className="px-6 py-3 bg-accent text-accent-foreground hover:brightness-105 font-bold text-caption rounded-full tracking-widest flex items-center gap-2 transition-all uppercase"
          >
            CONNECT DIRECTLY &rarr;
          </Link>
        </section>

      </main>

      {/* Premium Footer */}
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
