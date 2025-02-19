'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { portfolioData } from '@/app/data/portfolio-data'
import { Icon } from '@iconify/react'
import { getTechnologyLogo } from '@/app/utils/technology-logos'

export default function CreativeExperience() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0])

  const colors = {
    primary: '#8B5CF6',    // Purple
    secondary: '#60A5FA',  // Blue
    accent: '#F472B6',     // Pink
    success: '#34D399',    // Green
    text: {
      primary: '#1F2937',  // Dark gray for main text
      secondary: '#4B5563' // Medium gray for secondary text
    }
  }

  // Logo handling function
  const renderCompanyLogo = (logoPath: string | undefined, companyName: string) => {
    if (!logoPath) {
      return (
        <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-purple-100 to-blue-100 flex items-center justify-center">
          <span className="text-2xl font-bold text-purple-500">
            {companyName.charAt(0)}
          </span>
        </div>
      )
    }

    return (
      <div className="w-16 h-16 relative rounded-xl overflow-hidden bg-white shadow-sm">
        <Image
          src={logoPath}
          alt={companyName}
          fill
          className="object-contain p-2"
        />
      </div>
    )
  }

  // Tech icon handling function
  const renderTechIcon = (tech: string) => {
    return (
      <div className="w-4 h-4">
        <Icon 
          icon={`devicon:${tech.toLowerCase()}`}
          width="100%"
          height="100%"
          onError={() => (
            <Icon 
              icon={`simple-icons:${tech.toLowerCase()}`}
              width="100%"
              height="100%"
              onError={() => {
                const localLogo = getTechnologyLogo(tech)
                if (localLogo) {
                  return (
                    <Image
                      src={localLogo}
                      alt={tech}
                      width={16}
                      height={16}
                      className="w-full h-full"
                    />
                  )
                }
                return (
                  <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-[8px] font-bold text-gray-600">
                      {tech.charAt(0)}
                    </span>
                  </div>
                )
              }}
            />
          )}
        />
      </div>
    )
  }

  return (
    <section ref={containerRef} className="min-h-screen py-20 relative">
      <motion.div style={{ y, opacity }} className="container mx-auto px-4">
        {/* Section Title */}
        <motion.div className="text-center mb-20">
          <motion.h2 
            className="text-5xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{
              backgroundImage: 'linear-gradient(45deg, #6366f1, #8b5cf6, #d946ef)',
              backgroundSize: '200% auto',
            }}
          >
            My Journey
          </motion.h2>
          {/* Decorative dots */}
          <div className="flex justify-center gap-2 mt-4">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: i === 0 ? '#FF6B6B' : i === 1 ? '#4ECDC4' : '#45B7D1',
                    opacity: 0.8 - i * 0.2,
                  }}
                />
              ))}
            </div>
        </motion.div>
        

        {/* Journey Path */}
        <div className="max-w-6xl mx-auto relative">
          {/* Enhanced Timeline Path */}
          <div className="absolute left-1/2 h-full -translate-x-1/2">
            <svg 
              className="h-full w-[200px]" 
              viewBox="0 0 200 800"
              preserveAspectRatio="xMidYMid meet"
              style={{ position: 'absolute', left: '-100px' }}
            >
              {/* Animated gradient for the path */}
              <defs>
                <linearGradient id="gradient" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="100">
                  <stop offset="0%" stopColor="#8B5CF6">
                    <animate
                      attributeName="stop-color"
                      values="#8B5CF6; #60A5FA; #F472B6; #8B5CF6"
                      dur="4s"
                      repeatCount="indefinite"
                    />
                  </stop>
                  <stop offset="50%" stopColor="#60A5FA">
                    <animate
                      attributeName="stop-color"
                      values="#60A5FA; #F472B6; #8B5CF6; #60A5FA"
                      dur="4s"
                      repeatCount="indefinite"
                    />
                  </stop>
                  <stop offset="100%" stopColor="#F472B6">
                    <animate
                      attributeName="stop-color"
                      values="#F472B6; #8B5CF6; #60A5FA; #F472B6"
                      dur="4s"
                      repeatCount="indefinite"
                    />
                  </stop>
                </linearGradient>
                
                {/* Glow effect */}
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Start Node */}
              <motion.circle
                cx="100"
                cy="20"
                r="8"
                fill="url(#gradient)"
                filter="url(#glow)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              />

              {/* Background path (for glow effect) */}
              <motion.path
                d="M100 20 C130 200, 70 400, 100 600 C130 700, 70 780, 100 780"
                fill="none"
                strokeWidth="6"
                stroke="rgba(139, 92, 246, 0.2)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />

              {/* Main animated path */}
              <motion.path
                d="M100 20 C130 200, 70 400, 100 600 C130 700, 70 780, 100 780"
                fill="none"
                strokeWidth="3"
                stroke="url(#gradient)"
                filter="url(#glow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />

              {/* End Node */}
              <motion.circle
                cx="100"
                cy="780"
                r="8"
                fill="url(#gradient)"
                filter="url(#glow)"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 2, duration: 0.5 }}
              />

              {/* Animated dots along the path */}
              <motion.circle
                r="4"
                fill="#8B5CF6"
                filter="url(#glow)"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  offsetDistance: ['0%', '100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  offsetPath: "path('M100 20 C130 200, 70 400, 100 600 C130 700, 70 780, 100 780')",
                }}
              />
            </svg>
          </div>

          {/* Experience Cards */}
          {portfolioData.experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`relative mb-16 last:mb-0 flex ${
                index % 2 === 0 ? 'justify-start' : 'justify-end'
              }`}
            >
              {/* Experience Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`w-[90%] md:w-[45%] relative`}
              >
                <motion.div
                  className="relative rounded-2xl overflow-hidden backdrop-blur-sm p-6"
                  style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.8)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <div className="flex gap-4 items-start">
                    {/* Company Logo */}
                    {renderCompanyLogo(exp.images?.company_logo, exp.company)}

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold" style={{ color: colors.text.primary }}>
                        {exp.title}
                      </h3>
                      <h4 className="text-lg mb-1" style={{ color: colors.text.secondary }}>
                        {exp.company}
                      </h4>
                      <p className="text-sm text-gray-500 mb-4">
                        {exp.period} • {exp.location}
                      </p>

                      {/* Projects */}
                      {exp.projects && (
                        <div className="space-y-3">
                          {exp.projects.map((project, pIndex) => (
                            <motion.div
                              key={pIndex}
                              className="p-3 rounded-xl"
                              style={{
                                background: `linear-gradient(135deg, ${colors.primary}08, ${colors.secondary}08)`
                              }}
                            >
                              <h5 className="text-base font-semibold mb-2" style={{ color: colors.text.primary }}>
                                {project.name}
                              </h5>
                              <p className="text-sm mb-2" style={{ color: colors.text.secondary }}>
                                {project.description}
                              </p>
                              
                              {/* Tech Stack */}
                              <div className="flex flex-wrap gap-2">
                                {project.tech?.map((tech, tIndex) => (
                                  <motion.div
                                    key={tIndex}
                                    whileHover={{ scale: 1.05 }}
                                    className="flex items-center gap-1.5 px-2 py-1 rounded-full"
                                    style={{
                                      background: `linear-gradient(135deg, ${colors.primary}10, ${colors.secondary}10)`,
                                      border: '1px solid rgba(139, 92, 246, 0.1)'
                                    }}
                                  >
                                    {renderTechIcon(tech)}
                                    <span className="text-xs" style={{ color: colors.text.secondary }}>
                                      {tech}
                                    </span>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
} 