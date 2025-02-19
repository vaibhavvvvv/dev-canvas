'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { portfolioData } from '@/app/data/portfolio-data'
import { getTechnologyLogo } from '@/app/utils/technology-logos'

export default function Hero() {
  const containerRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  
  const socialIcons = [
    { name: 'github', href: portfolioData.personal.social.github },
    { name: 'X', href: portfolioData.personal.social.twitter },
  ]

  // Add keyframes animation dynamically
  const gradientTextStyle = {
    background: 'linear-gradient(-45deg, #A855F7, #3B82F6, #8B5CF6, #6366F1)',
    backgroundSize: '300%',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    animation: 'gradient 10s ease infinite',
  } as React.CSSProperties

  // Add keyframes to document head
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      @keyframes gradient {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <section ref={containerRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/10 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.1),rgba(0,0,0,0))]" />
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ 
                opacity: [0.2, 0.5, 0.2], 
                scale: [1, 2, 1],
                x: [Math.random() * 100, Math.random() * -100, Math.random() * 100],
                y: [Math.random() * 100, Math.random() * -100, Math.random() * 100],
              }}
              transition={{ 
                duration: Math.random() * 10 + 10, 
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute w-1 h-1 bg-purple-500/50 rounded-full blur-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>

      <motion.div 
        style={{ y, opacity }} 
        className="container mx-auto px-4 z-20"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content - Added order classes */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-center lg:text-left order-2 lg:order-1"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold mb-4"
            >
              <motion.span
                style={gradientTextStyle}
                whileHover={{
                  backgroundSize: '400%',
                  transition: { duration: 0.3 }
                }}
              >
                {portfolioData.personal.name}
              </motion.span>
            </motion.h1>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl md:text-3xl text-gray-300 mb-6"
            >
              {portfolioData.personal.title}
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0 mb-8"
            >
              {portfolioData.personal.summary}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8"
            >
              {socialIcons.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div 
                    className="relative w-full h-full"
                    style={{ 
                      maskImage: `url(${getTechnologyLogo(social.name)})`,
                      WebkitMaskImage: `url(${getTechnologyLogo(social.name)})`,
                      maskSize: 'contain',
                      WebkitMaskSize: 'contain',
                      maskRepeat: 'no-repeat',
                      WebkitMaskRepeat: 'no-repeat',
                      maskPosition: 'center',
                      WebkitMaskPosition: 'center',
                      backgroundColor: 'currentColor'
                    }}
                  />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Profile Image - Added order classes */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-[150px] md:max-w-md lg:flex-1 order-1 mt-20 lg:mt-0 lg:order-2"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 -z-10">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 15 + i * 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute inset-0"
                >
                  <div className={`absolute inset-0 rounded-full border-2 border-purple-500/20 ${
                    i === 0 ? 'animate-spin-slow' : 
                    i === 1 ? 'animate-spin-slower' : 
                    'animate-spin-slowest'
                  }`} 
                  style={{ transform: `scale(${1 + i * 0.1})` }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Floating Dots */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                }}
                className="absolute w-2 h-2 bg-purple-500/50 rounded-full blur-sm"
                style={{
                  left: `${50 + 35 * Math.cos(i * Math.PI / 4)}%`,
                  top: `${50 + 35 * Math.sin(i * Math.PI / 4)}%`,
                }}
              />
            ))}

            {/* Main Image Container */}
            <motion.div
              animate={{
                rotate: isHovered ? [0, 10, -10, 0] : 0,
              }}
              transition={{ duration: 0.5 }}
              className="relative z-10"
            >
              {/* Corner Decorations */}
              <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-purple-500 rounded-tl-lg" />
              <div className="absolute -top-4 -right-4 w-8 h-8 border-r-2 border-t-2 border-purple-500 rounded-tr-lg" />
              <div className="absolute -bottom-4 -left-4 w-8 h-8 border-l-2 border-b-2 border-purple-500 rounded-bl-lg" />
              <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-purple-500 rounded-br-lg" />

              {/* Glowing Border */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-75 blur group-hover:opacity-100 transition-opacity" />
              
              {/* Image Container */}
              <div className="relative w-full aspect-square rounded-full overflow-hidden border-2 border-purple-500/50">
                <Image
                  src={portfolioData.personal.images.profile}
                  alt={portfolioData.personal.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 280px, (max-width: 1200px) 400px, 450px"
                  priority
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20"
                  animate={{
                    opacity: isHovered ? 0.8 : 0.4
                  }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Animated Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-8 border-2 border-dashed border-purple-500/20 rounded-full"
              />
            </motion.div>

            {/* Background Glow */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 360],
              }}
              transition={{ duration: 20, repeat: Infinity }}
              className="absolute inset-0 -z-10"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl" />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-2"
          >
            <motion.div
              animate={{ height: ["20%", "80%", "20%"] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 bg-purple-500 rounded-full"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

