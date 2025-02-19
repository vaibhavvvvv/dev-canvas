'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { portfolioData } from '@/app/data/portfolio-data'
import { getTechnologyLogo } from '@/app/utils/technology-logos'
import { SiGithub } from 'react-icons/si'
import { HiExternalLink } from 'react-icons/hi'

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0])

  return (
    <motion.section 
      ref={containerRef} 
      style={{ y, opacity }}
      className="min-h-screen py-20"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mb-16"
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1 }}
            className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500"
          />
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            Featured Projects
          </h2>
        </motion.div>

        <div className="space-y-32 pt-20">
          {portfolioData.projects
            .filter(project => project.featured)
            .map((project, index) => (
              <ProjectCard 
                key={project.title} 
                project={{
                  ...project,
                  images: {
                    thumbnail: project.images.screenshots[0].src,
                    banner: project.images.screenshots[0].src,
                    screenshots: project.images.screenshots.map(screenshot => ({
                      ...screenshot,
                      alt: project.title,
                      caption: project.title
                    }))
                  }
                }}
                index={index} 
              />
            ))}
        </div>
      </div>
    </motion.section>
  )
}

interface Project {
  title: string
  description: string
  tech: string[]
  github: string | null
  live: string | null
  featured: boolean
  images: {
    thumbnail: string
    banner: string
    screenshots: {
      src: string
      alt: string
      caption: string
    }[]
  }
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [currentImage, setCurrentImage] = useState(0)
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "center center"]
  })

  // Auto slideshow effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((current) => 
        current === project.images.screenshots.length - 1 ? 0 : current + 1
      )
    }, 3000) // Change image every 3 seconds

    return () => clearInterval(timer)
  }, [project.images.screenshots.length])

  const y = useTransform(scrollYProgress, [0, 1], [100, 0])
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <motion.div
      ref={cardRef}
      style={{ y, opacity }}
      className={`flex flex-col md:flex-row gap-8 items-center ${
        index % 2 === 0 ? '' : 'md:flex-row-reverse'
      }`}
    >
      {/* Image Section */}
      <div className="flex-1 relative group w-full">
        {/* Decorative Elements */}
        <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/50 to-blue-500/50 rounded-xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500" />
        
        {/* Corner Decorations */}
        <div className="absolute -top-2 -left-2 w-4 h-4 border-l-2 border-t-2 border-purple-500 rounded-tl-lg" />
        <div className="absolute -top-2 -right-2 w-4 h-4 border-r-2 border-t-2 border-purple-500 rounded-tr-lg" />
        <div className="absolute -bottom-2 -left-2 w-4 h-4 border-l-2 border-b-2 border-purple-500 rounded-bl-lg" />
        <div className="absolute -bottom-2 -right-2 w-4 h-4 border-r-2 border-b-2 border-purple-500 rounded-br-lg" />

        {/* Main Image Container */}
        <div className="relative overflow-hidden rounded-xl aspect-video bg-black/50 backdrop-blur-sm border border-white/10 group-hover:border-purple-500/50 transition-colors duration-500">
          {/* Animated Gradient Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 group-hover:opacity-75 transition-opacity"
          />
          
          {/* Animated Lines */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-slide-right" />
            <div className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-slide-left" />
            <div className="absolute left-0 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-purple-500 to-transparent animate-slide-down" />
            <div className="absolute right-0 bottom-0 w-[1px] h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent animate-slide-up" />
          </div>
          
          {/* Main Project Image */}
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-full h-full"
          >
            <Image
              src={project.images.screenshots[currentImage].src}
              alt={project.images.screenshots[currentImage].alt || project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </motion.div>

          {/* Image Navigation Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 p-2 bg-black/50 backdrop-blur-sm rounded-full">
            {project.images.screenshots.map((_, imgIndex) => (
              <button
                key={imgIndex}
                onClick={() => setCurrentImage(imgIndex)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentImage === imgIndex 
                    ? 'bg-purple-500 w-4' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>

          {/* Caption with Gradient */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent backdrop-blur-sm"
          >
            <p className="text-sm text-white/90">
              {project.images.screenshots[currentImage].caption || project.title}
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Project Info Section */}
      <div className="flex-1 space-y-4 w-full">
        <motion.h3 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold"
        >
          {project.title}
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-gray-300"
        >
          {project.description}
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-3"
        >
          {project.tech.map((tech: string) => (
            <div key={tech} className="flex items-center gap-2 px-3 py-1 bg-purple-500/20 rounded-full text-sm">
              <div 
                className="w-4 h-4"
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
            </div>
          ))}
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex gap-4 pt-2"
        >
          {project.github && (
            <a 
              href={project.github}
              className="flex items-center gap-2 text-white/80 hover:text-purple-400 transition-colors group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <SiGithub className="w-5 h-5" />
              </motion.div>
              <span className="group-hover:underline">GitHub</span>
            </a>
          )}
          {project.live && (
            <a 
              href={project.live}
              className="flex items-center gap-2 text-white/80 hover:text-purple-400 transition-colors group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <HiExternalLink className="w-5 h-5" />
              </motion.div>
              <span className="group-hover:underline">Live Demo</span>
            </a>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}