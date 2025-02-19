'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { portfolioData } from '@/app/data/portfolio-data'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import { getTechnologyLogo } from '@/app/utils/technology-logos'

interface Screenshot {
  src: string
  alt?: string
}

interface Project {
  title: string
  description: string
  tech: string[]
  images: {
    screenshots: Screenshot[]
  }
  github?: string
  live?: string
}

export default function CreativeProjects() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0])

  return (
    <section ref={containerRef} className="min-h-screen py-20 relative overflow-hidden">
      {/* Fun Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Animated shapes */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: Math.random() * 100 + 50 + 'px',
              height: Math.random() * 100 + 50 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              background: `linear-gradient(135deg, ${
                ['#8B5CF6', '#60A5FA', '#F472B6', '#34D399'][i % 4]
              }15, transparent)`,
              borderRadius: ['30% 70% 70% 30% / 30% 30% 70% 70%', '60% 40% 30% 70% / 60% 30% 70% 40%'][i % 2],
            }}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              x: [0, 30, 0],
              y: [0, 30, 0],
              borderRadius: i % 2 === 0 
                ? ['30% 70% 70% 30% / 30% 30% 70% 70%', '60% 40% 30% 70% / 60% 30% 70% 40%']
                : ['60% 40% 30% 70% / 60% 30% 70% 40%', '30% 70% 70% 30% / 30% 30% 70% 70%'],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <motion.div style={{ y, opacity }} className="container mx-auto px-4">
        {/* Animated Title */}
        <motion.div 
          className="text-center mb-20 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400">
            Featured Projects
          </h2>
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

        {/* Projects Showcase */}
        <div className="max-w-7xl mx-auto">
          {portfolioData.projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-32 last:mb-0"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const [currentImage, setCurrentImage] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto slideshow
  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(() => {
        setCurrentImage((current) => 
          current === (project.images?.screenshots.length - 1) ? 0 : current + 1
        )
      }, 3000)
      return () => clearInterval(timer)
    }
  }, [project.images?.screenshots, isHovered])

  return (
    <motion.div
      ref={containerRef}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative"
    >
      {/* Main Content Container */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-b from-white/80 to-white/60 backdrop-blur-md border border-white/20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          {/* Image Showcase */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            {/* Main Image Carousel */}
            <div className="absolute inset-0 bg-black/5 rounded-2xl">
              {project.images?.screenshots.map((screenshot: Screenshot, imgIndex: number) => (
                <motion.div
                  key={imgIndex}
                  initial={{ opacity: 0, scale: 1.1, rotateY: 90 }}
                  animate={{ 
                    opacity: currentImage === imgIndex ? 1 : 0,
                    scale: currentImage === imgIndex ? 1 : 1.1,
                    rotateY: currentImage === imgIndex ? 0 : 90,
                  }}
                  transition={{ 
                    duration: 0.5,
                    type: "spring",
                    stiffness: 100
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={screenshot.src}
                    alt={screenshot.alt || project.title}
                    fill
                    className="object-cover rounded-2xl"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-project.png'
                    }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Image Navigation */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-2 bg-white/80 backdrop-blur-sm rounded-full">
              {project.images?.screenshots.map((_: Screenshot, imgIndex: number) => (
                <motion.button
                  key={imgIndex}
                  onClick={() => setCurrentImage(imgIndex)}
                  whileHover={{ scale: 1.2 }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentImage === imgIndex 
                      ? 'bg-purple-500 w-4' 
                      : 'bg-gray-400 hover:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Project Info */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {project.title}
              </h3>
              <p className="text-gray-600">
                {project.description}
              </p>
            </motion.div>

            {/* Tech Stack with Dynamic Colors */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex flex-wrap gap-3"
            >
              {project.tech.map((tech: string, techIndex: number) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ delay: techIndex * 0.1 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-gray-100"
                >
                  <div className="w-5 h-5 relative flex items-center justify-center">
                    {getTechnologyLogo(tech) ? (
                      <div 
                        className="w-full h-full"
                        style={{ 
                          maskImage: `url(${getTechnologyLogo(tech)})`,
                          WebkitMaskImage: `url(${getTechnologyLogo(tech)})`,
                          maskSize: 'contain',
                          WebkitMaskSize: 'contain',
                          maskRepeat: 'no-repeat',
                          WebkitMaskRepeat: 'no-repeat',
                          maskPosition: 'center',
                          WebkitMaskPosition: 'center',
                          backgroundColor: `hsl(${(techIndex * 47) % 360}, 70%, 50%)`
                        }}
                      />
                    ) : (
                      <div 
                        className="w-full h-full rounded-full flex items-center justify-center text-[10px] font-medium uppercase"
                        style={{
                          backgroundColor: `hsl(${(techIndex * 47) % 360}, 70%, 90%)`,
                          color: `hsl(${(techIndex * 47) % 360}, 70%, 30%)`
                        }}
                      >
                        {tech.slice(0, 2)}
                      </div>
                    )}
                  </div>
                  <span className="text-gray-700">{tech}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Project Links with Original Colors */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="flex gap-6 pt-4"
            >
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center gap-2 px-6 py-2 rounded-full bg-[#24292e] text-white hover:bg-[#1b1f23] transition-colors"
                >
                  <FiGithub className="w-5 h-5" />
                  <span>Source</span>
                </motion.a>
              )}
              {project.live && (
                <motion.a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center gap-2 px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 transition-colors"
                >
                  <FiExternalLink className="w-5 h-5" />
                  <span>Live Demo</span>
                </motion.a>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -inset-4 -z-10 bg-gradient-to-r from-purple-200/20 via-blue-200/20 to-pink-200/20 rounded-[2rem] blur-2xl opacity-50" />
      <div className="absolute -inset-2 -z-10 bg-gradient-to-r from-purple-100/30 via-blue-100/30 to-pink-100/30 rounded-[2rem] blur-xl" />
    </motion.div>
  )
} 