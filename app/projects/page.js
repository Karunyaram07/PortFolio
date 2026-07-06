"use client"

import * as React from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { FiGithub, FiExternalLink, FiSun, FiMoon } from "react-icons/fi"
import { TbSparkles } from "react-icons/tb"
import { projects } from "@/data/projects"
import { profile } from "@/data/profile"
import { navigation } from "@/data/navigation"
import { variants, transitions } from "@/config/animations"

export default function ProjectsPage() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [selectedCategory, setSelectedCategory] = React.useState("All")

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
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                className="p-6 border border-border bg-[#0b0c10]/5 dark:bg-[#ffffff]/[0.02] hover:bg-[#0b0c10]/10 dark:hover:bg-[#ffffff]/[0.04] rounded-3xl flex flex-col justify-between gap-6 shadow-sm group transition-all duration-300"
              >
                <div>
                  <div className="flex justify-between items-center text-caption font-mono text-text-muted">
                    <span className="text-accent uppercase tracking-wider font-bold">{project.category}</span>
                    <span>{project.year}</span>
                  </div>
                  <h3 className="text-heading-2 font-black tracking-tight mt-3 text-foreground group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-small text-text-secondary mt-2 leading-relaxed font-sans font-light">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-col gap-4 mt-2">
                  {/* Highlights checklist */}
                  <div className="flex flex-col gap-2">
                    {project.highlights.map((hl, hIdx) => (
                      <div key={hIdx} className="flex gap-2 items-start text-caption text-text-secondary">
                        <span className="text-accent mt-0.5 font-bold font-mono text-[10px]">&bull;</span>
                        <span className="leading-normal font-sans font-light">{hl}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1 pt-3 border-t border-border/40">
                    {project.techStack.map((tech, tIdx) => (
                      <span key={tIdx} className="text-[9px] font-mono bg-muted text-text-secondary px-2.5 py-0.5 rounded-full border border-border/40">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 font-mono text-caption text-accent hover:underline self-end pt-2 font-bold"
                    >
                      <FiGithub className="size-3.5" /> REPOSITORY &rarr;
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

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
