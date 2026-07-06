"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { 
  FiMapPin, 
  FiMail, 
  FiPhone, 
  FiMonitor, 
  FiSun, 
  FiMoon, 
  FiAward, 
  FiBookOpen, 
  FiCalendar, 
  FiBriefcase, 
  FiDownload 
} from "react-icons/fi"
import { TbSparkles, TbTrophy } from "react-icons/tb"
import { profile } from "@/data/profile"
import { education } from "@/data/education"
import { experience } from "@/data/experience"
import { navigation } from "@/data/navigation"
import { variants, transitions } from "@/config/animations"
import EducationRoadmap from "../components/EducationRoadmap"
import OrbitalSkills from "../components/OrbitalSkills"

export default function AboutPage() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  const [telemetryLogs, setTelemetryLogs] = React.useState([
    { text: ">> Initializing profile connection...", type: "info" },
    { text: ">> Loading credentials... [OK]", type: "success" },
    { text: ">> Mapping B.Tech CSE telemetry...", type: "info" }
  ])

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

  if (!mounted) {
    return <div className="p-8 text-center font-mono text-text-muted">Loading profile...</div>
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
              <Link key={idx} href={nav.href} className={`hover:text-foreground transition-all uppercase ${nav.href === "/about" ? "text-accent font-bold" : ""}`}>{nav.label}</Link>
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

      <main className="max-w-5xl mx-auto px-6 py-16 md:py-24 flex flex-col gap-24">
        
        {/* Intro Grid */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-7 flex flex-col gap-6">
            <span className="text-caption font-mono text-accent bg-accent/5 border border-accent/15 px-3 py-1 rounded-full self-start font-semibold">
              ABOUT // NARRATIVE
            </span>
            <h1 className="text-display-lg font-black tracking-tighter leading-none uppercase">
              Prabhu Ram <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gradient-start to-gradient-end">Karunya Sunkara</span>
            </h1>
            <h2 className="text-heading-2 font-mono text-text-secondary font-semibold">
              {profile.professionalTitle}
            </h2>
            <div className="flex flex-col gap-5 text-body text-text-secondary leading-relaxed font-light font-sans">
              {profile.bioParagraphs.map((para, pIdx) => {
                if (pIdx === profile.bioParagraphs.length - 1) {
                  return (
                    <p key={pIdx}>
                      If that sounds like a fit, reach me at{" "}
                      <a href="mailto:sprkarunya986@gmail.com" className="text-accent underline font-semibold hover:brightness-110">
                        sprkarunya986@gmail.com
                      </a>{" "}
                      or send a{" "}
                      <Link href="/contact" className="text-accent underline font-bold hover:brightness-110">
                        connection request here
                      </Link>
                      . I reply here.
                    </p>
                  )
                }
                return <p key={pIdx}>{para}</p>
              })}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
              <div className="flex items-center gap-3 text-caption font-mono text-text-muted">
                <FiMapPin className="size-4 text-accent" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-3 text-caption font-mono text-text-muted">
                <FiMail className="size-4 text-accent" />
                <a href={`mailto:${profile.email}`} className="hover:underline">{profile.email}</a>
              </div>
            </div>
          </div>

          {/* Right column: Avatar + System Telemetry Widgets */}
          <div className="md:col-span-5 flex flex-col items-center gap-6 lg:sticky lg:top-24">
            
            {/* Styled Avatar Card */}
            <div className="relative w-full max-w-[320px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-border bg-gradient-to-tr from-accent/20 to-purple-500/10 p-2 group">
              <div className="w-full h-full rounded-2xl overflow-hidden relative">
                <img 
                  src={profile.profileImagePath} 
                  alt={profile.fullName} 
                  className="w-full h-full object-cover filter grayscale contrast-[1.05] group-hover:grayscale-0 transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-6">
                  <div>
                    <h4 className="text-white font-bold text-body">{profile.fullName}</h4>
                    <p className="text-white/80 text-caption font-mono">{profile.university}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* High-Tech Telemetry Terminal Widget */}
            <div className="w-full max-w-[320px] border border-border bg-black/40 dark:bg-black/60 rounded-2xl p-4 font-mono text-[9px] text-text-secondary shadow-lg relative overflow-hidden text-left">
              <div className="flex justify-between items-center border-b border-border/40 pb-2 mb-2 select-none">
                <span className="text-accent font-bold uppercase tracking-widest text-[8px] flex items-center gap-1">
                  <span className="size-1.5 rounded-full bg-accent animate-pulse" /> Live_Telemetry_Feed
                </span>
                <span className="text-text-muted text-[7px]">CORE_v1.0.8</span>
              </div>
              <div className="flex flex-col gap-1.5 h-32 overflow-hidden">
                {telemetryLogs.map((log, idx) => (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={idx}
                    className={`leading-tight font-mono ${
                      log.type === "success" ? "text-accent" : "text-text-secondary"
                    }`}
                  >
                    {log.text}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="w-full max-w-[320px] grid grid-cols-2 gap-4 font-mono text-center">
              <div className="p-4 border border-border bg-[#0b0c10]/5 dark:bg-[#ffffff]/[0.02] rounded-2xl flex flex-col justify-between min-h-20 select-none">
                <span className="text-heading-2 font-black text-accent">{profile.currentCGPA}</span>
                <span className="text-[8px] text-text-muted uppercase tracking-wider">CGPA_SCORE</span>
              </div>
              <div className="p-4 border border-border bg-[#0b0c10]/5 dark:bg-[#ffffff]/[0.02] rounded-2xl flex flex-col justify-between min-h-20 select-none">
                <span className="text-heading-2 font-black text-accent">SIH &apos;25</span>
                <span className="text-[8px] text-text-muted uppercase tracking-wider">GRAND_CHAMP</span>
              </div>
              <div className="p-4 border border-border bg-[#0b0c10]/5 dark:bg-[#ffffff]/[0.02] rounded-2xl flex flex-col justify-between min-h-20 select-none">
                <span className="text-heading-2 font-black text-accent">1</span>
                <span className="text-[8px] text-text-muted uppercase tracking-wider">PUB_PAPER</span>
              </div>
              <div className="p-4 border border-border bg-[#0b0c10]/5 dark:bg-[#ffffff]/[0.02] rounded-2xl flex flex-col justify-between min-h-20 select-none">
                <span className="text-heading-2 font-black text-accent">4+</span>
                <span className="text-[8px] text-text-muted uppercase tracking-wider">SYS_DEPLOYS</span>
              </div>
            </div>

          </div>
        </section>

        {/* Experience Timeline */}
        <section className="flex flex-col gap-8">
          <div>
            <span className="text-caption font-mono text-accent uppercase tracking-widest">CHAPTERS</span>
            <h2 className="text-heading-1 font-bold mt-1">Professional Experience</h2>
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
                    <div key={dIdx} className="p-4 bg-muted/40 border border-border/60 rounded-2xl text-small text-text-secondary leading-relaxed">
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

        {/* Orbital Skills Section */}
        <section className="flex flex-col gap-8">
          <OrbitalSkills />
        </section>

        {/* Education Journey Roadmap Section */}
        <section className="flex flex-col gap-8">
          <EducationRoadmap />
        </section>

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
