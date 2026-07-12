"use client"

import * as React from "react"
import { FiAward, FiExternalLink, FiCpu, FiDatabase, FiCode } from "react-icons/fi"
import { SiGooglecloud, SiAnthropic } from "react-icons/si"
import { TbCertificate } from "react-icons/tb"
import { certifications } from "@/data/certifications"
import { achievements } from "@/data/achievements"

// Icon mapping to convert stored string name to component
const iconMap = {
  FiAward: FiAward,
  FiCpu: FiCpu,
  FiDatabase: FiDatabase,
  FiCode: FiCode,
  SiGooglecloud: SiGooglecloud,
  SiAnthropic: SiAnthropic,
  TbCertificate: TbCertificate
}

export default function CertificationsShowcase({ limit }) {
  // Merge certifications and achievements dynamically
  const unifiedItems = React.useMemo(() => {
    const list = [
      ...achievements.map(item => ({
        id: item.id,
        title: item.title,
        issuer: item.organization,
        year: item.year,
        description: item.description,
        link: item.link,
        theme: item.theme || "theme-orange",
        icon: iconMap[item.icon] || FiAward,
        badge: item.badge || "ACHIEVEMENT",
        priority: item.priority || 999
      })),
      ...certifications.map(item => ({
        id: item.id,
        title: item.title,
        issuer: item.issuer,
        year: item.year,
        description: item.description,
        link: item.credentialLink,
        theme: item.theme || "theme-blue",
        icon: iconMap[item.icon] || TbCertificate,
        badge: item.badge || "CERTIFICATION",
        priority: item.priority || 999
      }))
    ]
    // Sort primarily by priority ascending, then by year descending
    const sorted = list.sort((a, b) => {
      if (a.priority !== b.priority) {
        return a.priority - b.priority
      }
      return b.year - a.year
    })

    return limit ? sorted.slice(0, limit) : sorted
  }, [limit])

  return (
    <div className="flex flex-col gap-8 w-full text-left">
      <div>
        <p className="text-small text-text-muted uppercase font-mono">HOVER FOR GLOW &bull; CLICK TO VERIFY DOCUMENTATION</p>
      </div>

      {/* Styled Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 justify-items-center w-full mt-2">
        {unifiedItems.map((cert) => {
          const Icon = cert.icon
          const cardContent = (
            <div className={`cert-box ${cert.theme}`}>
              {/* Decorative corner node bubbles */}
              <span className="cert-decor" />
              
              {/* Glassmorphic content block */}
              <div className="cert-content">
                <div className="flex flex-col gap-3">
                  {/* Top Row: Category tag and Icon */}
                  <div className="flex justify-between items-start">
                    <span className="px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-[8px] font-mono tracking-wider text-white/70 uppercase">
                      {cert.badge}
                    </span>
                    <Icon className="size-4.5 text-white/80 group-hover:text-accent group-hover:scale-110 transition-all duration-300" />
                  </div>
                  
                  {/* Title */}
                  <div className="flex flex-col gap-1 mt-2">
                    <h3 className="text-body font-black text-white uppercase tracking-tight leading-tight group-hover:text-accent transition-colors duration-300">
                      {cert.title}
                    </h3>
                  </div>
                  
                  {/* Description with HTML rendering support */}
                  <p 
                    className="text-[11px] text-white/70 leading-relaxed font-sans font-light mt-3"
                    dangerouslySetInnerHTML={{ __html: cert.description }}
                  />
                </div>
                
                {/* Bottom Link indicator & Issuer */}
                <div className="border-t border-white/10 pt-3 flex flex-col gap-1.5 select-none">
                  <div className="flex justify-between items-center text-[9px] font-mono text-white/40 group-hover:text-accent transition-colors duration-300">
                    <span>{cert.link ? "VERIFY CREDENTIAL" : "AWARD ACQUIRED"}</span>
                    {cert.link && <FiExternalLink className="size-3" />}
                  </div>
                  <div className="text-[10px] font-mono text-accent/90 font-bold uppercase tracking-wider group-hover:text-accent transition-colors duration-300 truncate text-left">
                    {cert.issuer}
                  </div>
                </div>
              </div>
            </div>
          )

          return (
            <div key={cert.id} className="relative group">
              {cert.link ? (
                <a 
                  href={cert.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block focus:outline-none"
                >
                  {cardContent}
                </a>
              ) : (
                <div className="block focus:outline-none cursor-default">
                  {cardContent}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Embedded Uiverse Glassmorphic styling */}
      <style dangerouslySetInnerHTML={{ __html: `
        .cert-box {
          position: relative;
          width: 270px;
          height: 350px;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: 0.5s;
          z-index: 1;
        }

        .cert-box::before {
          content: ' ';
          position: absolute;
          top: 0;
          left: 50px;
          width: 50%;
          height: 100%;
          text-decoration: none;
          background: #fff;
          border-radius: 12px;
          transform: skewX(15deg);
          transition: 0.5s;
        }

        .cert-box::after {
          content: '';
          position: absolute;
          top: 0;
          left: 50px;
          width: 50%;
          height: 100%;
          background: #fff;
          border-radius: 12px;
          transform: skewX(15deg);
          transition: 0.5s;
          filter: blur(30px);
          opacity: 0.25;
        }

        .cert-box:hover::before,
        .cert-box:hover::after {
          transform: skewX(0deg) scaleX(1.3);
        }

        /* Color theme variations */
        .cert-box.theme-orange::before,
        .cert-box.theme-orange::after {
          background: linear-gradient(315deg, #ffbc00, #ff0058);
        }

        .cert-box.theme-purple::before,
        .cert-box.theme-purple::after {
          background: linear-gradient(315deg, #a855f7, #6366f1);
        }

        .cert-box.theme-blue::before,
        .cert-box.theme-blue::after {
          background: linear-gradient(315deg, #06b6d4, #3b82f6);
        }

        .cert-box.theme-green::before,
        .cert-box.theme-green::after {
          background: linear-gradient(315deg, #10b981, #059669);
        }

        .cert-box span.cert-decor {
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 5;
          pointer-events: none;
        }

        .cert-box span.cert-decor::before {
          content: '';
          position: absolute;
          top: -20px;
          left: 20px;
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
          transition: 0.5s;
        }

        .cert-box span.cert-decor::after {
          content: '';
          position: absolute;
          bottom: -20px;
          right: 20px;
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
          transition: 0.5s;
        }

        .cert-box:hover span.cert-decor::before {
          top: -10px;
          left: 10px;
          width: 48px;
          height: 48px;
        }

        .cert-box:hover span.cert-decor::after {
          bottom: -10px;
          right: 10px;
          width: 48px;
          height: 48px;
        }

        .cert-content {
          position: relative;
          width: 240px;
          height: 320px;
          padding: 24px;
          background: rgba(15, 15, 15, 0.7);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          z-index: 10;
          transition: 0.5s;
          color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .cert-box:hover .cert-content {
          border-color: rgba(255, 255, 255, 0.2);
          background: rgba(10, 10, 10, 0.85);
        }
      `}} />
    </div>
  )
}
