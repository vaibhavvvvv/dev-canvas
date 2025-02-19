'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { portfolioData } from '@/app/data/portfolio-data'
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi'

export default function CreativeHero() {
  const containerRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  // Mouse move effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Fun gradient text style
  const gradientTextStyle = {
    background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1, #96C93D, #FED766)',
    backgroundSize: '300%',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    animation: 'funGradient 10s ease infinite',
  } as React.CSSProperties

  // Social media links with hover effects
  const socialLinks = [
    { icon: <FiGithub className="w-6 h-6" />, url: portfolioData.personal.social.github, label: 'GitHub' },
    { icon: <FiTwitter className="w-6 h-6" />, url: portfolioData.personal.social.twitter, label: 'Twitter' },
    { icon: <FiLinkedin className="w-6 h-6" />, url: portfolioData.personal.social.linkedin, label: 'LinkedIn' },
    { icon: <FiMail className="w-6 h-6" />, url: `mailto:${portfolioData.personal.email}`, label: 'Email' },
  ]

  // Add keyframes
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes funGradient {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-20px); }
      }
      @keyframes bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <section 
      ref={containerRef} 
      className="min-h-screen relative overflow-hidden"
    >
      <motion.div 
        style={{ y, opacity }} 
        className="container mx-auto px-4 pt-20 relative z-10"
      >
        <div className="flex flex-col items-center justify-center min-h-[80vh] relative">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center relative"
            style={{
              transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
            }}
          >
            {/* Location Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-4 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
            >
              <span className="text-gray-600">📍 {portfolioData.personal.location}</span>
            </motion.div>

            <motion.h1 
              className="text-6xl md:text-8xl font-bold mb-6"
              style={gradientTextStyle}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 }
              }}
            >
              {portfolioData.personal.name}
            </motion.h1>

            {/* Profile Image with lighter glow */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative w-64 h-64 md:w-80 md:h-80 mx-auto my-8"
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  position: 'absolute',
                  inset: '-10%',
                  background: 'conic-gradient(from 0deg, #FF6B6B, #4ECDC4, #45B7D1, #96C93D, #FED766, #FF6B6B)',
                  borderRadius: '50%',
                  filter: 'blur(20px)',
                  opacity: 0.2,
                }}
              />
              
              <motion.div
                className="relative w-full h-full rounded-full overflow-hidden shadow-lg"
                whileHover={{ scale: 1.05 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
              >
                <Image
                  src={portfolioData.personal.images.profile}
                  alt={portfolioData.personal.name}
                  fill
                  className="object-cover"
                  style={{
                    transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                    transition: 'transform 0.3s ease',
                  }}
                />
              </motion.div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-3xl md:text-4xl font-bold mb-6 text-gray-800"
            >
              {portfolioData.personal.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-xl md:text-2xl max-w-2xl mx-auto text-gray-600 mb-8"
            >
              {portfolioData.personal.summary}
            </motion.p>

            {/* Social Links */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex justify-center gap-6 mt-8"
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 
                    text-gray-600 hover:text-purple-600 hover:bg-white/20 transition-all duration-300
                    hover:border-purple-200 group"
                  title={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </motion.div>           
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}