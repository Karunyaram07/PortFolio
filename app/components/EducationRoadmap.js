"use client"

import * as React from "react"
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent, useMotionValue, animate } from "framer-motion"
import {
  FiMapPin,
  FiAward,
  FiBookOpen,
  FiBriefcase,
  FiArrowRight,
  FiStar,
  FiFlag,
  FiMonitor
} from "react-icons/fi"
import { TbTrophy, TbSparkles } from "react-icons/tb"

const milestones = [
  {
    id: "ssc",
    year: "2020 - 2021",
    title: "Secondary Education (Class X)",
    institution: "Z.P.P.H.S",
    location: "Ainapuram, AP, India",
    score: "GPA: 10.0 / 10.0",
    description: "Completed secondary education with a perfect grade point average. Built strong logical foundations in science, mathematics, and analytical reasoning.",
    color: "emerald",
    icon: FiBookOpen,
    badge: "FOUNDATION",
    posDesktop: { left: "10%", top: "80%" },
    alignCard: "bottom-left",
    threshold: 0.1
  },
  {
    id: "hsc",
    year: "2021 - 2023",
    title: "Higher Secondary (Class XII)",
    institution: "Sri Chaitanya Junior College",
    location: "Amalapuram, AP, India",
    score: "Percentage: 97.4%",
    description: "Completed MPC curriculum (Mathematics, Physics, Chemistry) focusing on computational problem-solving and foundational engineering sciences.",
    color: "amber",
    icon: FiFlag,
    badge: "PRE-UNIVERSITY",
    posDesktop: { left: "30%", top: "45%" },
    alignCard: "top-right",
    threshold: 0.35
  },
  {
    id: "btech",
    year: "2023 - 2027",
    title: "B.Tech in Computer Science",
    institution: "Kalasalingam Academy (KARE)",
    location: "Tamil Nadu, India",
    score: "Current CGPA: 9.52",
    description: "Specializing in Software Engineering, Web Development, and Artificial Intelligence. Recipient of Merit Student Award and top academic ranks.",
    color: "blue",
    icon: FiMonitor,
    badge: "UNDERGRADUATE",
    posDesktop: { left: "62%", top: "72%" },
    alignCard: "bottom-right",
    threshold: 0.60
  },
  {
    id: "research",
    year: "2025 - 2026",
    title: "Research & Publication",
    institution: "",
    location: "",
    score: "ICTIEE 2026 Accept",
    description: "Co-authored research on Prompt Engineering Pedagogy (PEARL) accepted at ICTIEE 2026. Handled radar/LiDAR sensor fusion data utilizing nuScenes datasets.",
    color: "cyan",
    icon: TbSparkles,
    badge: "ACADEMIC RESEARCH",
    posDesktop: { left: "58%", top: "20%" },
    alignCard: "top-left",
    threshold: 0.78
  },
  {
    id: "sih",
    year: "2025",
    title: "Smart India Hackathon Winner",
    institution: "Smart India Hackathon",
    location: "Grand Finale Host",
    score: "1st Place Winner",
    description: "Won the national grand finale. Developed the frontend architecture and CareerMitra chatbot for the EduPath Navigator system using Google Genkit AI.",
    color: "rose",
    icon: TbTrophy,
    badge: "NATIONAL LAUREL",
    posDesktop: { left: "82%", top: "35%" },
    alignCard: "bottom-right",
    threshold: 0.95
  }
]

export default function EducationRoadmap() {
  const containerRef = React.useRef(null)

  // Track scroll position of this container in the center of the screen
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 75%", "end center"]
  })

  // Smooth out the scroll animation progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    restDelta: 0.001
  })

  const [scrollVal, setScrollVal] = React.useState(0)
  const [maxScrollVal, setMaxScrollVal] = React.useState(0)
  const [activeMilestone, setActiveMilestone] = React.useState(milestones[0])
  const [hoveredMilestone, setHoveredMilestone] = React.useState(null)

  // Custom pathProgress motion value driven by scroll OR clicked to animate to a specific milestone
  const pathProgress = useMotionValue(0)

  // Sync scroll motion values to state for conditional pin rendering and active states
  useMotionValueEvent(smoothProgress, "change", (latest) => {
    setScrollVal(latest)

    // Maintain the furthest scroll position to keep unlocked pins active and visible
    setMaxScrollVal((prev) => {
      const nextMax = Math.max(prev, latest)
      pathProgress.set(nextMax)
      return nextMax
    })

    // Find the furthest milestone that the scroll path has crossed
    const active = [...milestones].reverse().find(m => latest >= m.threshold) || milestones[0]
    setActiveMilestone(active)
  })

  const handleMilestoneClick = (m) => {
    setActiveMilestone(m)
    setMaxScrollVal((prev) => Math.max(prev, m.threshold))
    animate(pathProgress, m.threshold, {
      type: "spring",
      stiffness: 80,
      damping: 20
    })
  }

  const displayMilestone = hoveredMilestone || activeMilestone

  // Helper styles based on marker color
  const getColorClasses = (color) => {
    switch (color) {
      case "emerald":
        return {
          bg: "bg-emerald-500",
          text: "text-emerald-500",
          border: "border-emerald-500",
          glow: "shadow-emerald-500/35 dark:shadow-emerald-500/20",
          bgLight: "bg-emerald-500/10",
          borderLight: "border-emerald-500/20"
        }
      case "amber":
        return {
          bg: "bg-amber-500",
          text: "text-amber-500",
          border: "border-amber-500",
          glow: "shadow-amber-500/35 dark:shadow-amber-500/20",
          bgLight: "bg-amber-500/10",
          borderLight: "border-amber-500/20"
        }
      case "cyan":
        return {
          bg: "bg-cyan-500",
          text: "text-cyan-500",
          border: "border-cyan-500",
          glow: "shadow-cyan-500/35 dark:shadow-cyan-500/20",
          bgLight: "bg-cyan-500/10",
          borderLight: "border-cyan-500/20"
        }
      case "rose":
        return {
          bg: "bg-rose-500",
          text: "text-rose-500",
          border: "border-rose-500",
          glow: "shadow-rose-500/35 dark:shadow-rose-500/20",
          bgLight: "bg-rose-500/10",
          borderLight: "border-rose-500/20"
        }
      default:
        return {
          bg: "bg-blue-500",
          text: "text-blue-500",
          border: "border-blue-500",
          glow: "shadow-blue-500/35 dark:shadow-blue-500/20",
          bgLight: "bg-blue-500/10",
          borderLight: "border-blue-500/20"
        }
    }
  }

  return (
    <div ref={containerRef} className="flex flex-col gap-8 w-full scroll-mt-24">
      {/* Description header */}
      <div className="flex justify-between items-baseline text-left">
        <div>
          <span className="text-caption font-mono text-accent uppercase tracking-widest">FOUNDATIONS</span>
          <h2 className="text-heading-1 font-bold mt-1">Education Journey Roadmap</h2>
        </div>
        <span className="hidden md:inline font-mono text-[10px] text-text-muted">SCROLL OR CLICK PINS TO DRAW &bull; HOVER FOR PREVIEW</span>
      </div>

      {/* Desktop Roadmap view (side-by-side grid layout) */}
      <div className="hidden md:grid grid-cols-12 gap-8 items-stretch w-full">

        {/* Left column: SVG winding road map box */}
        <div className="col-span-8 relative h-[520px] border border-border/80 bg-card rounded-[32px] overflow-hidden shadow-[6px_6px_0px_#000000] dark:shadow-[6px_6px_0px_var(--accent)] p-6">
          {/* Asphalt road grid path overlay */}
          <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          {/* Winding Highway SVG */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1000 550"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="road-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="25%" stopColor="#f59e0b" />
                <stop offset="55%" stopColor="#3b82f6" />
                <stop offset="75%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#f43f5e" />
              </linearGradient>
              <filter id="neon-glow" x="-10%" y="-10%" width="120%" height="120%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Main roadbed guide layout */}
            <path
              d="M 50,450 C 200,450 250,280 350,280 C 450,280 500,430 650,430 C 780,430 550,130 680,130 C 780,130 800,220 950,220"
              stroke="currentColor"
              strokeWidth="28"
              className="text-muted/15 dark:text-muted/10"
              strokeLinecap="round"
            />
            {/* Street center-lane divider guide */}
            <path
              d="M 50,450 C 200,450 250,280 350,280 C 450,280 500,430 650,430 C 780,430 550,130 680,130 C 780,130 800,220 950,220"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="6,8"
              className="text-muted/30 dark:text-muted/20"
              strokeLinecap="round"
            />

            {/* Active Winding path (glowing neon line that draws in on scroll) */}
            <motion.path
              d="M 50,450 C 200,450 250,280 350,280 C 450,280 500,430 650,430 C 780,430 550,130 680,130 C 780,130 800,220 950,220"
              stroke="url(#road-gradient)"
              strokeWidth="4.5"
              style={{ pathLength: pathProgress }}
              filter="url(#neon-glow)"
              className="opacity-95"
              strokeLinecap="round"
            />

            {/* Center street divider line (draws dynamically on scroll) */}
            <motion.path
              d="M 50,450 C 200,450 250,280 350,280 C 450,280 500,430 650,430 C 780,430 550,130 680,130 C 780,130 800,220 950,220"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeDasharray="10,12"
              style={{ pathLength: pathProgress }}
              className="opacity-95"
              strokeLinecap="round"
            />
          </svg>

          {/* Render Map pins along the roadway */}
          {milestones.map((m) => {
            const colors = getColorClasses(m.color)
            const Icon = m.icon

            // A pin is unlocked when the scroll path has crossed its threshold (SSC is unlocked by default)
            const isUnlocked = m.id === "ssc" || maxScrollVal >= m.threshold
            const isSelected = displayMilestone.id === m.id

            return (
              <div
                key={m.id}
                className="absolute transition-transform duration-300 z-10"
                style={{
                  left: m.posDesktop.left,
                  top: m.posDesktop.top,
                  transform: "translate(-50%, -100%)"
                }}
              >
                {/* Animated pin container popping in when unlocked */}
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{
                    scale: isUnlocked ? 1 : 0.85,
                    opacity: isUnlocked ? 1 : 0.5
                  }}
                  transition={{ type: "spring", stiffness: 120, damping: 15 }}
                  className="relative"
                >
                  {/* Glowing concentric rings animation for selected/active pin */}
                  {isUnlocked && isSelected && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none -translate-y-[22px]">
                      <span className={`absolute w-16 h-16 rounded-full border-2 ${colors.border}/40 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]`} />
                      <span className={`absolute w-20 h-20 rounded-full border ${colors.border}/25 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] [animation-delay:0.5s]`} />
                    </div>
                  )}

                  {/* Pulsing ring for the active current phase B.Tech */}
                  {m.id === "btech" && !isSelected && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none -translate-y-5">
                      <span className="absolute w-14 h-14 rounded-full border border-blue-500/40 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
                    </div>
                  )}

                  <motion.button
                    onMouseEnter={() => isUnlocked && setHoveredMilestone(m)}
                    onMouseLeave={() => isUnlocked && setHoveredMilestone(null)}
                    onClick={() => isUnlocked && handleMilestoneClick(m)}
                    disabled={!isUnlocked}
                    whileHover={isUnlocked ? {
                      scale: 1.12,
                      y: -6,
                      transition: { type: "spring", stiffness: 400, damping: 15 }
                    } : {}}
                    whileTap={isUnlocked ? { scale: 0.95 } : {}}
                    className={`relative flex flex-col items-center focus:outline-none group ${isUnlocked ? "cursor-pointer" : "cursor-not-allowed"}`}
                  >
                    {/* Floating tooltip preview above the pin */}
                    {isUnlocked && (
                      <div className={`absolute bottom-full mb-3 px-3 py-1 text-[10px] font-mono font-bold tracking-wider rounded-lg border shadow-lg ${isSelected ? `${colors.bg} text-black border-transparent scale-105` : "bg-card text-text-secondary border-border/80"} transition-all duration-300 pointer-events-none whitespace-nowrap z-30`}>
                        {m.year}
                      </div>
                    )}

                    {/* Animated pin drop circle wrapper */}
                    <div className={`w-14 h-14 rounded-full border-2 ${isUnlocked && isSelected ? `${colors.border} bg-card scale-110 shadow-[0_0_20px_rgba(16,185,129,0.3)] ${colors.glow}` : "border-border bg-card"} transition-all duration-300 flex items-center justify-center relative z-10`}>
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${isUnlocked ? (isSelected ? colors.bg : "bg-muted text-text-secondary") : "bg-muted/40 text-text-muted/40"} transition-colors duration-300`}>
                        {isUnlocked ? (
                          <Icon className="size-5 group-hover:rotate-12 transition-transform duration-300" />
                        ) : (
                          <div className="w-2.5 h-2.5 rounded-full bg-border" />
                        )}
                      </div>
                    </div>

                    {/* Pin pointer triangle */}
                    <div className={`w-3 h-3 rotate-45 border-r-2 border-b-2 ${isUnlocked && isSelected ? `${colors.border} bg-card` : "border-border bg-card"} -mt-1.5 transition-all duration-300 relative z-10`} />
                  </motion.button>
                </motion.div>
              </div>
            )
          })}

          {/* Helper guide pointer */}
          <div className="absolute bottom-4 left-6 font-mono text-[9px] text-text-muted flex items-center gap-1.5 uppercase select-none">
            <FiStar className="size-3 text-accent animate-pulse" /> Interactive SVG roadmap. Click unlocked nodes to draw path!
          </div>
        </div>

        {/* Right column: The details HUD panel */}
        <div className="col-span-4 bg-card border border-border/80 rounded-[32px] p-6 shadow-[6px_6px_0px_#000000] dark:shadow-[6px_6px_0px_var(--accent)] text-left relative overflow-hidden flex flex-col justify-between h-[520px] transition-all duration-300">
          {/* Subtle color bar indicator */}
          <div className={`absolute top-0 left-0 w-2.5 h-full ${getColorClasses(displayMilestone.color).bg} transition-colors duration-500`} />

          {/* Dynamic background glow matching the milestone theme */}
          <div className={`absolute -right-24 -top-24 w-52 h-52 rounded-full blur-3xl opacity-20 transition-all duration-700 pointer-events-none ${getColorClasses(displayMilestone.color).bg}`} />

          <AnimatePresence mode="wait">
            <motion.div
              key={displayMilestone.id}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col justify-between h-full relative z-10"
            >
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold border uppercase tracking-wider ${getColorClasses(displayMilestone.color).bgLight} ${getColorClasses(displayMilestone.color).text} ${getColorClasses(displayMilestone.color).borderLight}`}>
                      {displayMilestone.badge}
                    </span>
                    {hoveredMilestone && (
                      <span className="px-2 py-0.5 rounded-full text-[8px] font-mono font-bold bg-accent/10 text-accent border border-accent/25 animate-pulse uppercase tracking-wider">
                        PREVIEW
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-text-muted">{displayMilestone.year}</span>
                </div>

                <h3 className="text-heading-2 font-black text-foreground uppercase tracking-tight leading-tight mt-1">
                  {displayMilestone.title}
                </h3>

                <div className="font-mono text-caption text-text-secondary leading-normal">
                  <span className="font-bold text-foreground">{displayMilestone.institution}</span>
                  <br />
                  <span className="text-text-muted text-[11px]">{displayMilestone.location}</span>
                </div>

                <p className="text-small text-text-secondary leading-relaxed font-sans font-light mt-2">
                  {displayMilestone.description}
                </p>
              </div>

              <div className="bg-muted/40 border border-border/60 p-4 rounded-xl flex flex-col gap-1 mt-auto shadow-inner select-none">
                <span className="text-[9px] font-mono text-text-muted uppercase tracking-wider">Performance Metric</span>
                <span className={`text-lg md:text-xl font-bold font-mono tracking-tight uppercase ${getColorClasses(displayMilestone.color).text} transition-colors duration-500`}>
                  {displayMilestone.score}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Timeline/Road view (vertical scroll layout) */}
      <div className="md:hidden flex flex-col gap-6 relative pl-6 border-l-4 border-dashed border-muted text-left">
        {milestones.map((m, idx) => {
          const colors = getColorClasses(m.color)
          const Icon = m.icon

          return (
            <motion.div
              key={m.id}
              whileTap={{ scale: 0.98 }}
              className="relative flex flex-col gap-3 pb-4 border-b border-border/40 last:border-b-0"
            >
              {/* Absolute Pin Node on the line */}
              <span className={`absolute -left-[37px] top-1 w-7 h-7 rounded-full flex items-center justify-center ${colors.bg} text-white shadow-lg`}>
                <Icon className="size-3.5" />
              </span>

              <div className="flex flex-col gap-1">
                <div className="flex justify-between items-baseline gap-2 flex-wrap">
                  <span className={`px-2 py-0.5 rounded-full text-[8px] font-mono font-bold border uppercase tracking-wider ${colors.bgLight} ${colors.text} ${colors.borderLight}`}>
                    {m.badge}
                  </span>
                  <span className="text-[9px] font-mono text-text-muted">{m.year}</span>
                </div>
                <h3 className="text-heading-3 font-bold text-foreground mt-1 uppercase tracking-tight">
                  {m.title}
                </h3>
                <p className="text-[10px] font-mono text-text-muted">
                  {m.institution} &bull; {m.location}
                </p>
              </div>

              <p className="text-small text-text-secondary leading-relaxed font-sans font-light">
                {m.description}
              </p>

              <div className="flex justify-between items-center bg-muted/20 border border-border/40 p-2.5 rounded-xl mt-1">
                <span className="text-[10px] font-mono text-text-muted uppercase">Performance Metric:</span>
                <span className={`text-[10px] font-mono font-black ${colors.text}`}>{m.score}</span>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
