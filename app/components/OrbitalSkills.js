"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  SiPython, 
  SiJavascript, 
  SiTypescript, 
  SiCplusplus, 
  SiNextdotjs, 
  SiReact, 
  SiTailwindcss, 
  SiExpress, 
  SiFastapi, 
  SiFlask, 
  SiSupabase, 
  SiPrisma, 
  SiMongodb, 
  SiSqlite, 
  SiTensorflow, 
  SiKeras, 
  SiNumpy, 
  SiPandas, 
  SiDocker, 
  SiGit, 
  SiGithub, 
  SiVercel, 
  SiNetlify, 
  SiPostman 
} from "react-icons/si"
import { FaAws } from "react-icons/fa6"
import { TbSparkles } from "react-icons/tb"

// Grouped skill orbits
const skillsData = [
  {
    category: "Languages",
    orbitIndex: 1,
    radius: 75,
    speed: 25, // seconds for full rotation
    color: "amber",
    items: [
      { name: "Python", icon: SiPython, themeColor: "text-blue-400 border-blue-400/30 bg-blue-500/10" },
      { name: "JavaScript", icon: SiJavascript, themeColor: "text-yellow-400 border-yellow-400/30 bg-yellow-500/10" },
      { name: "TypeScript", icon: SiTypescript, themeColor: "text-sky-400 border-sky-400/30 bg-sky-500/10" },
      { name: "C++", icon: SiCplusplus, themeColor: "text-indigo-400 border-indigo-400/30 bg-indigo-500/10" }
    ]
  },
  {
    category: "Frontend",
    orbitIndex: 2,
    radius: 125,
    speed: 35,
    color: "purple",
    items: [
      { name: "Next.js", icon: SiNextdotjs, themeColor: "text-white border-white/20 bg-white/5" },
      { name: "React", icon: SiReact, themeColor: "text-cyan-400 border-cyan-400/30 bg-cyan-500/10" },
      { name: "Tailwind", icon: SiTailwindcss, themeColor: "text-teal-400 border-teal-400/30 bg-teal-500/10" }
    ]
  },
  {
    category: "Backend",
    orbitIndex: 3,
    radius: 175,
    speed: 45,
    color: "emerald",
    items: [
      { name: "Express.js", icon: SiExpress, themeColor: "text-gray-300 border-gray-400/20 bg-gray-500/5" },
      { name: "FastAPI", icon: SiFastapi, themeColor: "text-emerald-400 border-emerald-400/30 bg-emerald-500/10" },
      { name: "Flask", icon: SiFlask, themeColor: "text-white border-white/20 bg-white/5" }
    ]
  },
  {
    category: "Databases & ORM",
    orbitIndex: 4,
    radius: 225,
    speed: 55,
    color: "blue",
    items: [
      { name: "Supabase", icon: SiSupabase, themeColor: "text-emerald-500 border-emerald-500/30 bg-emerald-500/10" },
      { name: "Prisma", icon: SiPrisma, themeColor: "text-indigo-400 border-indigo-400/30 bg-indigo-500/10" },
      { name: "MongoDB", icon: SiMongodb, themeColor: "text-green-500 border-green-500/30 bg-green-500/10" },
      { name: "SQLite", icon: SiSqlite, themeColor: "text-sky-500 border-sky-500/30 bg-sky-500/10" }
    ]
  },
  {
    category: "AI & Machine Learning",
    orbitIndex: 5,
    radius: 275,
    speed: 65,
    color: "rose",
    items: [
      { name: "TensorFlow", icon: SiTensorflow, themeColor: "text-orange-500 border-orange-500/30 bg-orange-500/10" },
      { name: "Keras", icon: SiKeras, themeColor: "text-red-500 border-red-500/30 bg-red-500/10" },
      { name: "NumPy", icon: SiNumpy, themeColor: "text-blue-500 border-blue-500/30 bg-blue-500/10" },
      { name: "Pandas", icon: SiPandas, themeColor: "text-purple-400 border-purple-400/30 bg-purple-500/10" }
    ]
  },
  {
    category: "DevOps & Cloud",
    orbitIndex: 6,
    radius: 325,
    speed: 75,
    color: "cyan",
    items: [
      { name: "Docker", icon: SiDocker, themeColor: "text-sky-400 border-sky-400/30 bg-sky-500/10" },
      { name: "AWS", icon: FaAws, themeColor: "text-amber-500 border-amber-500/30 bg-amber-500/10" },
      { name: "Git", icon: SiGit, themeColor: "text-orange-500 border-orange-500/30 bg-orange-500/10" },
      { name: "GitHub", icon: SiGithub, themeColor: "text-white border-white/20 bg-white/5" },
      { name: "Vercel", icon: SiVercel, themeColor: "text-white border-white/20 bg-white/5" },
      { name: "Netlify", icon: SiNetlify, themeColor: "text-teal-400 border-teal-400/30 bg-teal-500/10" },
      { name: "Postman", icon: SiPostman, themeColor: "text-orange-400 border-orange-400/30 bg-orange-500/10" }
    ]
  }
]

export default function OrbitalSkills() {
  const [hoveredSkill, setHoveredSkill] = React.useState(null)

  return (
    <div className="flex flex-col gap-8 w-full select-none text-left">
      <div>
        <span className="text-caption font-mono text-accent uppercase tracking-widest">ABILITIES</span>
        <h2 className="text-heading-1 font-bold mt-1">Core Tech Stack System</h2>
      </div>

      {/* Desktop Orbital Radar View */}
      <div className="hidden lg:flex items-center justify-center relative w-full h-[720px] border border-border/80 bg-card rounded-[32px] overflow-hidden shadow-[6px_6px_0px_#000000] dark:shadow-[6px_6px_0px_var(--accent)] p-8">
        
        {/* Subtle grid system background */}
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        {/* Orbit container */}
        <div className="relative w-full h-full flex items-center justify-center">
          
          {/* Pulsing center Core Sphere */}
          <div className="relative z-20 flex items-center justify-center w-24 h-24 rounded-full border border-border bg-card shadow-[0_0_30px_rgba(16,185,129,0.15)] flex flex-col justify-center text-center">
            <span className="absolute inset-0 rounded-full bg-accent/5 animate-ping pointer-events-none" />
            <span className="text-[10px] font-mono text-accent font-black tracking-widest uppercase">TECH</span>
            <span className="text-[8px] font-mono text-text-muted uppercase tracking-wider mt-0.5">SYSTEM</span>
          </div>

          {/* Render orbits and orbiting badges */}
          {skillsData.map((orbit) => (
            <div 
              key={orbit.category}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              {/* Concentric dashed orbit ring */}
              <div 
                className="absolute border border-dashed border-border/60 rounded-full"
                style={{
                  width: `${orbit.radius * 2}px`,
                  height: `${orbit.radius * 2}px`
                }}
              />

              {/* Rotating wrapper for the badges on this ring */}
              <div
                className="absolute w-full h-full flex items-center justify-center"
                style={{
                  animation: `orbit-spin ${orbit.speed}s linear infinite`,
                  // Pause rotation when any skill on this ring (or in general) is hovered for inspection
                  animationPlayState: hoveredSkill ? "paused" : "running"
                }}
              >
                {orbit.items.map((skill, index) => {
                  const angle = (360 / orbit.items.length) * index
                  const Icon = skill.icon

                  return (
                    <div
                      key={skill.name}
                      className="absolute pointer-events-auto"
                      style={{
                        left: "50%",
                        top: "50%",
                        transform: `translate(-50%, -50%) rotate(${angle}deg) translate(${orbit.radius}px) rotate(${-angle}deg)`
                      }}
                    >
                      {/* Counter-rotation to keep the badge text horizontal */}
                      <div
                        style={{
                          animation: `orbit-unspin ${orbit.speed}s linear infinite`,
                          animationPlayState: hoveredSkill ? "paused" : "running"
                        }}
                      >
                        <motion.div
                          onMouseEnter={() => setHoveredSkill(skill)}
                          onMouseLeave={() => setHoveredSkill(null)}
                          whileHover={{ scale: 1.12, zIndex: 30 }}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] font-semibold transition-all duration-300 cursor-pointer shadow-md select-none font-sans ${skill.themeColor} ${
                            hoveredSkill && hoveredSkill.name !== skill.name ? "opacity-30 blur-[0.5px]" : "opacity-100"
                          }`}
                        >
                          <Icon className="size-3.5 flex-shrink-0" />
                          <span>{skill.name}</span>
                        </motion.div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}

          {/* Floating Details Overlay Card */}
          <AnimatePresence>
            {hoveredSkill && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-6 right-6 w-64 bg-background/95 backdrop-blur-md border border-border/80 rounded-2xl p-5 shadow-xl z-50 pointer-events-none text-left"
              >
                <span className="text-[8px] font-mono text-accent uppercase tracking-widest flex items-center gap-1">
                  <TbSparkles className="size-3 text-accent animate-pulse" /> TELEMETRY_LOG
                </span>
                <h4 className="text-heading-3 font-bold text-foreground mt-2 uppercase tracking-tight">
                  {hoveredSkill.name}
                </h4>
                <p className="text-[10px] text-text-secondary leading-relaxed font-sans font-light mt-1.5">
                  Core technology integrated into B.Tech CSE curricula, research sandboxes, and full-stack pipelines.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Styled Responsive Categories view for smaller screens */}
      <div className="lg:hidden flex flex-col gap-6 w-full">
        {skillsData.map((category) => (
          <div 
            key={category.category}
            className="p-5 border border-border/80 bg-card rounded-2xl flex flex-col gap-4 text-left shadow-xs"
          >
            <h3 className="text-caption font-mono font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> {category.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.items.map((skill) => {
                const Icon = skill.icon
                return (
                  <div
                    key={skill.name}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-caption font-semibold font-sans shadow-sm ${skill.themeColor}`}
                  >
                    <Icon className="size-4 flex-shrink-0" />
                    <span>{skill.name}</span>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* CSS Animation keyframes injected dynamically */}
      <style jsx global>{`
        @keyframes orbit-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes orbit-unspin {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
      `}</style>
    </div>
  )
}
