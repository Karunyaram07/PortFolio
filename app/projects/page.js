"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { FiGithub, FiExternalLink, FiSun, FiMoon, FiAward, FiArrowRight } from "react-icons/fi"
import { TbSparkles } from "react-icons/tb"
import { projects } from "@/data/projects"
import { profile } from "@/data/profile"
import { navigation } from "@/data/navigation"
import { variants, transitions } from "@/config/animations"

export default function ProjectsPage() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [selectedCategory, setSelectedCategory] = React.useState("All")
  const [inProgressProject, setInProgressProject] = React.useState(null)

  React.useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(timer)
  }, [])

  if (!mounted) {
    return <div className="p-8 text-center font-mono text-text-muted">Loading projects...</div>
  }

  // Derive categories: All, plus categories mapped from the projects list
  const categories = ["All", ...new Set(projects.map(p => p.category))]

  const filteredProjects = selectedCategory === "All"
    ? projects
    : projects.filter(p => p.category === selectedCategory)

  const sihProject = filteredProjects.find(p => p.id === "edupath")
  const otherProjects = filteredProjects.filter(p => p.id !== "edupath")

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
              <Link key={idx} href={nav.href} className={`hover:text-foreground transition-all uppercase ${nav.href === "/projects" ? "text-accent font-bold" : ""}`}>{nav.label}</Link>
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
        
        {/* Page title & categories */}
        <div className="flex flex-col gap-8 border-b border-border pb-8">
          <div className="flex flex-col gap-3">
            <span className="text-caption font-mono text-accent uppercase tracking-widest">PORTFOLIO</span>
            <h1 className="text-display-lg font-black tracking-tighter leading-none">
              Engineering <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gradient-start to-gradient-end">Case Studies</span>
            </h1>
            <p className="text-body text-text-secondary max-w-xl font-light leading-relaxed mt-2">
              A curated catalog of automated software pipelines, AI integrations, educational playgrounds, and coordinate fusion utilities.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-caption font-mono rounded-full border transition-all ${selectedCategory === cat ? "bg-accent text-accent-foreground border-accent font-bold" : "bg-muted hover:bg-muted/80 text-text-secondary border-border"}`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Project grid layout */}
        <div className="flex flex-col gap-12">
          {otherProjects.length > 0 && (
            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {otherProjects.map((project) => {
                  const isInProgress = project.status === "In Progress"
                  
                  return (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      key={project.id}
                      onClick={() => {
                        if (isInProgress) {
                          setInProgressProject(project)
                        } else if (project.demo) {
                          window.open(project.demo, "_blank")
                        }
                      }}
                      className="bg-card border border-border/80 rounded-[24px] p-4 shadow-[6px_6px_0px_#000000] dark:shadow-[6px_6px_0px_var(--accent)] flex flex-col justify-between gap-5 group hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_#000000] dark:hover:shadow-[8px_8px_0px_var(--accent)] transition-all duration-300 cursor-pointer text-left"
                    >
                      <div className="flex flex-col gap-4">
                        {/* Neobrutalist image frame */}
                        <div className="w-full aspect-[16/10] overflow-hidden rounded-[18px] border border-border/40 relative bg-muted/20">
                          <img 
                            src={project.image} 
                            alt={project.title} 
                            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" 
                          />
                          {isInProgress && (
                            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                              <span className="px-3 py-1 bg-accent/90 text-accent-foreground text-[10px] font-mono font-bold tracking-widest rounded-full uppercase animate-pulse">
                                In Progress
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-col gap-1.5 px-1">
                          <div className="flex justify-between items-baseline">
                            <span className="text-[11px] font-mono font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">
                              {project.category}
                            </span>
                            {isInProgress && (
                              <span className="text-[9px] font-mono text-accent uppercase font-bold tracking-wider">DEV_STAGE</span>
                            )}
                          </div>
                          <h3 className="text-heading-2 font-black tracking-tight text-foreground uppercase group-hover:text-accent transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-small text-text-secondary leading-relaxed font-sans font-light">
                            {project.description}
                          </p>
                        </div>

                        <div className="flex flex-col gap-1.5 px-1 mt-2">
                          {project.highlights.map((hl, hIdx) => (
                            <div key={hIdx} className="flex gap-2 items-start text-caption text-text-secondary leading-tight">
                              <span className="text-accent font-bold mt-0.5">&bull;</span>
                              <span className="font-sans font-light text-[11px]">{hl}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col gap-3">
                        {/* Tech stack */}
                        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/40 px-1">
                          {project.techStack.map((tech, tIdx) => (
                            <span key={tIdx} className="text-[9px] font-mono bg-muted text-text-secondary px-2.5 py-0.5 rounded-full border border-border/40">
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Visit and Github links matching neobrutalist mockup */}
                        <div className="flex justify-between items-center px-1 pt-3 border-t border-border/40">
                          {isInProgress ? (
                            <button 
                              onClick={(e) => {
                                e.stopPropagation()
                                setInProgressProject(project)
                              }}
                              className="underline font-mono text-caption text-foreground hover:text-accent font-bold"
                            >
                              Visit Details
                            </button>
                          ) : project.demo ? (
                            <a 
                              href={project.demo} 
                              target="_blank" 
                              rel="noreferrer" 
                              onClick={(e) => e.stopPropagation()}
                              className="underline font-mono text-caption text-foreground hover:text-accent font-bold"
                            >
                              Visit Live
                            </a>
                          ) : (
                            <span className="font-mono text-caption text-text-muted italic text-[11px]">Prototype</span>
                          )}
                          {project.github && (
                            <a 
                              href={project.github} 
                              target="_blank" 
                              rel="noreferrer" 
                              onClick={(e) => e.stopPropagation()}
                              className="text-foreground hover:text-accent transition-colors"
                            >
                              <FiGithub className="size-5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Spotlight Marquee Card: EduPath Navigator (Smart India Hackathon Winner) below the grid */}
          {sihProject && (
            <div className="relative group rounded-[28px] border-2 border-amber-500/80 dark:border-amber-400 bg-amber-500/[0.02] dark:bg-amber-400/[0.02] p-8 shadow-[8px_8px_0px_#f59e0b] hover:shadow-[10px_10px_0px_#f59e0b] transition-all duration-300 overflow-hidden flex flex-col gap-8 w-full text-left">
              {/* Animating glow overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-transparent to-amber-500/5 opacity-50 pointer-events-none group-hover:scale-105 transition-transform duration-700" />
              
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-amber-500/30 pb-4 relative z-10">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 bg-amber-500 text-black font-mono text-[10px] font-black tracking-widest rounded-full uppercase flex items-center gap-1">
                    <FiAward className="size-3.5 animate-bounce" /> SIH &apos;25 GRAND FINALE WINNER
                  </span>
                  <span className="text-caption font-mono text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider">
                    {sihProject.category}
                  </span>
                </div>
                <span className="text-caption font-mono text-text-muted">STAGE: COMPLETE (FUTURE UPDATES PLANNED)</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
                {/* Left logo column */}
                <div className="lg:col-span-3 flex flex-col items-center gap-4">
                  <div className="w-40 h-40 rounded-[24px] border-2 border-amber-500/40 p-4 bg-white/80 dark:bg-black/60 shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                    <img 
                      src={sihProject.image} 
                      alt={sihProject.title} 
                      className="max-w-full max-h-full object-contain filter drop-shadow-md animate-pulse" 
                    />
                  </div>
                  <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-bold">ESTABLISHED: {sihProject.year}</span>
                </div>

                {/* Right details column */}
                <div className="lg:col-span-9 flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-display-sm font-black tracking-tight text-foreground uppercase group-hover:text-amber-500 transition-colors">
                      {sihProject.title}
                    </h3>
                    <p className="text-body text-text-secondary leading-relaxed font-sans font-light">
                      {sihProject.longDescription}
                    </p>
                  </div>

                  {/* Highlights list */}
                  <div className="flex flex-col gap-2.5 bg-background/50 dark:bg-black/40 border border-amber-500/20 p-6 rounded-2xl">
                    <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-bold uppercase tracking-widest">🧠 CORE CAPABILITIES</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                      {sihProject.highlights.map((hl, hIdx) => (
                        <div key={hIdx} className="flex gap-2 items-start text-caption text-text-secondary leading-tight">
                          <span className="text-amber-500 font-bold mt-0.5">&bull;</span>
                          <span className="font-sans font-light text-[11.5px]">{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dedicated My Contribution & Impact block */}
                  <div className="flex flex-col gap-2.5 bg-amber-500/[0.03] border border-amber-500/25 p-6 rounded-2xl">
                    <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-bold uppercase tracking-widest flex items-center gap-1">
                      👤 MY CONTRIBUTION & CONVERSION IMPACT
                    </span>
                    <div className="flex flex-col gap-3 font-sans text-caption text-text-secondary leading-relaxed font-light mt-1">
                      <p>
                        <strong>Frontend Architecture & User Hook:</strong> Crafted an immersive, accessible landing experience designed to captivate guests instantly. By showcasing success stories and milestones on the landing page, the frontend creates a visual narrative that drives higher engagement and guides guest users to log in at{" "}
                        <a href="https://sih-final-imps.vercel.app" target="_blank" rel="noreferrer" className="text-amber-600 dark:text-amber-400 underline font-semibold hover:brightness-110">
                          sih-final-imps.vercel.app
                        </a>.
                      </p>
                      <p>
                        <strong>CareerMitra Chatbot Integration:</strong> Integrated and styled the conversational interface for the <em>CareerMitra</em> AI counseling agent, utilizing Genkit pipelines to provide responsive career guidance to students.
                      </p>
                    </div>
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5">
                    {sihProject.techStack.map((tech, tIdx) => (
                      <span key={tIdx} className="text-[9px] font-mono bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4 border-t border-amber-500/20 pt-4 mt-2">
                    {sihProject.demo && (
                      <a 
                        href={sihProject.demo} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="px-5 py-2 bg-amber-500 text-black border-2 border-amber-500 hover:bg-transparent hover:text-amber-500 dark:hover:text-amber-400 font-mono text-caption tracking-wider rounded-xl transition-all flex items-center gap-1.5 font-bold"
                      >
                        <FiArrowRight className="size-4" /> VISIT LIVE SYSTEM
                      </a>
                    )}
                    {sihProject.github && (
                      <a 
                        href={sihProject.github} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="px-5 py-2 border-2 border-amber-500/60 text-amber-600 dark:text-amber-400 hover:border-amber-500 hover:bg-amber-500/10 font-mono text-caption tracking-wider rounded-xl transition-all flex items-center gap-1.5 font-bold"
                      >
                        <FiGithub className="size-4" /> COMPILED REPOSITORY
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

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
