'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { portfolioData } from '@/app/data/portfolio-data'
import { FiCode} from 'react-icons/fi'
import { Icon } from '@iconify/react'

const CreativeAbout = () => {
  const containerRef = useRef(null)
  const username = portfolioData.personal.social.github.split('/').pop() || ''
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0])

  const gradientStyles = {
    primary: {
      background: 'linear-gradient(45deg, #FF4D4D, #FF8F40, #FFD700)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent',
    },
    secondary: {
      background: 'linear-gradient(45deg, #4158D0, #C850C0, #FFCC70)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent',
    }
  }

  const titleVariants = {
    initial: { opacity: 0, y: 50 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  }

  const letterVariants = {
    initial: { opacity: 0, y: 50 },
    animate: {
      opacity: 1,
      y: 0
    }
  }

  const renderTechIcon = (skill: string) => {
    return (
      <Icon 
        icon={`devicon:${skill.toLowerCase()}`}
        width={32}
        height={32}
        className="w-8 h-8"

        style={{ color: 'currentColor' }}  // This will use original icon colors
      />
    )
  }

  return (
    <section ref={containerRef} className="min-h-screen py-20 relative overflow-hidden ">
      <motion.div style={{ y, opacity }} className="container mx-auto px-4">
        {/* Bio Section with animated title */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={titleVariants}
          className="max-w-4xl mx-auto mb-20 text-center"
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-8 relative overflow-hidden"
            style={{
              background: 'linear-gradient(-45deg, #FF4D4D, #FF8F40, #4158D0, #C850C0)',
              backgroundSize: '300% 300%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            {'About Me'.split('').map((letter, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className="inline-block"
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
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
                style={{ background: i === 0 ? '#FF6B6B' : i === 1 ? '#4ECDC4' : '#45B7D1' }}
              />
            ))}
          </div>
          <p className="text-xl mt-4 leading-relaxed text-gray-700">
            {portfolioData.personal.bio}
          </p>
        </motion.div>

        {/* GitHub Stats Grid */}
        <div className="max-w-6xl mx-auto mb-20">
          {/* Top row with two cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <motion.div
              className="w-full p-2 bg-white rounded-lg shadow-lg"
              whileHover={{ y: -5 }}
            >
              <img
                src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=light&hide_border=true&title_color=6366f1&text_color=475569&bg_color=ffffff`}
                alt="Most Used Languages"
                width={445}
                height={120}
                className="w-full h-[180px] object-contain"
              />
            </motion.div>
            <motion.div
              className="w-full p-2 bg-white rounded-lg shadow-lg"
              whileHover={{ y: -5 }}
            >
              <img
                src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=light&hide_border=true&ring=6366f1&fire=6366f1&currStreakLabel=6366f1`}
                alt="GitHub Streak"
                width={445}
                height={120}
                className="w-full h-[180px] object-contain"
              />
            </motion.div>
          </div>
          {/* Bottom row with contribution chart */}
          <motion.div
            className="w-full p-2 bg-white rounded-lg shadow-lg"
            whileHover={{ y: -5 }}
          >
            <img
              src={`https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=minimal&hide_border=true&color=6366f1&line=6366f1&point=6366f1&area=true&hide_title=true`}
              alt="GitHub Contributions"
              width={1100}
              height={120}
              className="w-full h-[380px] object-contain"
            />
          </motion.div>
        </div>

        {/* Skills Section */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold mb-12 text-center" style={gradientStyles.secondary}>
            Skills
          </h3>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <motion.button
              onClick={() => setActiveFilter(null)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-3 py-1.5 rounded-full text-sm"
              style={{
                background: !activeFilter ? '#6366F1' : 'white',
                color: !activeFilter ? 'white' : '#6366F1',
                border: '2px solid #6366F1'
              }}
            >
              All
            </motion.button>
            {Object.keys(portfolioData.skills).map((category) => {
              return (
                <motion.button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    background: activeFilter === category ? '#6366F1' : 'white',
                    color: activeFilter === category ? 'white' : '#6366F1',
                    border: '2px solid #6366F1'
                  }}
                  className="px-3 py-1.5 rounded-full text-sm flex items-center gap-2"
                >
                  {category}
                </motion.button>
              )
            })}
          </div>

          {/* Updated Skills Grid with improved flipping and consistent sizing */}
          <motion.div layout className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {Object.entries(portfolioData.skills)
              .filter(([category]) => !activeFilter || category === activeFilter)
              .map(([category, skills]) => (
                <AnimatePresence key={category}>
                  {skills.map((skill) => {
                    return (
                      <motion.div
                        key={skill}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="relative group h-[80px]"
                        style={{ perspective: '1000px' }}
                      >
                        <motion.div
                          className="absolute inset-0 cursor-pointer"
                          animate={{ rotateY: 0 }}
                          whileHover={{ rotateY: 180 }}
                          transition={{ duration: 0.6 }}
                          style={{ transformStyle: 'preserve-3d' }}
                        >
                          {/* Front */}
                          <motion.div
                            className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3"
                            style={{
                              background: 'white',
                              borderRadius: '12px',
                              border: `2px solid #A5B4FC`,
                              backfaceVisibility: 'hidden'
                            }}
                          >
                            {renderTechIcon(skill)} 
                            <span className="text-xs font-medium text-center" style={{ color: '#A5B4FC' }}>
                              {skill}
                            </span>
                          </motion.div>

                          {/* Back with enhanced swirling gradient */}
                          <motion.div
                            className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3"
                            style={{
                              borderRadius: '12px',
                                border: `2px solid #A5B4FC`,
                              backfaceVisibility: 'hidden',
                              transform: 'rotateY(180deg)',
                              overflow: 'hidden'
                            }}
                          >
                            {/* Animated gradient background */}
                            <motion.div
                              className="absolute inset-0"
                              style={{
                                background: `linear-gradient(45deg, 
                                  #A5B4FC40 0%, 
                                  #A5B4FC20 25%, 
                                  #A5B4FC60 50%, 
                                  #A5B4FC20 75%, 
                                  #A5B4FC40 100%
                                )`,
                                backgroundSize: '400% 400%'
                              }}
                              animate={{
                                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: 'linear'
                              }}
                            />
                            {/* Content */}
                            <div className="relative z-10">
                              <div className="w-8 h-8 flex items-center justify-center" style={{ color: 'white' }}>
                                  <FiCode className="w-6 h-6" />
                              </div>
                              <span className="text-xs font-medium text-white">
                                {skill}
                              </span>
                            </div>
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default CreativeAbout 