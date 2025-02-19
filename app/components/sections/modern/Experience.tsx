'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { portfolioData } from '@/app/data/portfolio-data'
import { getTechnologyLogo } from '@/app/utils/technology-logos'

export default function Experience() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section ref={containerRef} className="min-h-screen py-20 relative">
      <motion.div style={{ y, opacity }} className="container mx-auto px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500"
        >
          Professional Journey
        </motion.h2>

        {portfolioData.experience.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-20"
          >
            {/* Company Header */}
            <div className="relative mb-8">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1 }}
                className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"
              />
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-white">{exp.title}</h3>
                  <p className="text-purple-400 text-lg">{exp.company}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400">{exp.period}</p>
                  <p className="text-gray-400">{exp.location}</p>
                </div>
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exp.projects.map((project, pIndex) => (
                <motion.div
                  key={pIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: pIndex * 0.1 }}
                  className="group"
                >
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity blur-lg" />
                    <div className="relative p-6 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 group-hover:border-purple-500/50 transition-all duration-300">
                      <div className="flex flex-col gap-4">
                        <div>
                          <h4 className="text-lg font-semibold text-blue-400 mb-2">{project.name}</h4>
                          <p className="text-gray-300 text-sm">{project.description}</p>
                        </div>

                        <ul className="space-y-2">
                          {project.highlights.map((highlight, hIndex) => (
                            <motion.li
                              key={hIndex}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 + hIndex * 0.1 }}
                              className="text-gray-400 text-sm flex items-start gap-2"
                            >
                              <span className="text-purple-400 mt-1">•</span>
                              {highlight}
                            </motion.li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/10">
                          {project.tech.map((tech, tIndex) => (
                            <motion.div 
                              key={tIndex}
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3 + tIndex * 0.05 }}
                              className="flex items-center gap-1 px-2 py-1 rounded-full bg-purple-500/10 text-xs group-hover:bg-purple-500/20 transition-colors"
                            >
                              <div 
                                className="w-3 h-3"
                                style={{
                                  maskImage: `url(${getTechnologyLogo(tech)})`,
                                  WebkitMaskImage: `url(${getTechnologyLogo(tech)})`,
                                  maskSize: 'contain',
                                  WebkitMaskSize: 'contain',
                                  maskRepeat: 'no-repeat',
                                  WebkitMaskRepeat: 'no-repeat',
                                  maskPosition: 'center',
                                  WebkitMaskPosition: 'center',
                                  backgroundColor: 'currentColor'
                                }}
                              />
                              {tech}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
} 