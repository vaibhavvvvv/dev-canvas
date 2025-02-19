'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { portfolioData } from '@/app/data/portfolio-data'
import { getTechnologyLogo } from '@/app/utils/technology-logos'

const TechStackItem = ({ tech, index }: { tech: string; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="relative group"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
    <div className="relative p-4 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 group-hover:border-purple-500/50 transition-all duration-300 group-hover:-translate-y-1">
      <div className="flex flex-col items-center gap-2">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-md transform scale-110 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Image
            src={getTechnologyLogo(tech)}
            alt={tech}
            width={32}
            height={32}
            className="relative w-8 h-8 group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <span className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors">{tech}</span>
      </div>
    </div>
  </motion.div>
);

export default function About() {
  const sectionRef = useRef(null)
  const username = portfolioData.personal.social.github.split('/').pop() || ''
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const categories = ['All', ...Object.keys(portfolioData.skills)]

  return (
    <section ref={sectionRef} className="min-h-screen py-24 relative">
      <motion.div style={{ y, opacity }} className="container mx-auto px-4 space-y-20">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1 }}
            className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500"
          />
          <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            About Me
          </h2>
        </motion.div>

        {/* Bio Text - Full width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-4">
            {portfolioData.personal.bio.split('\n').map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-lg text-gray-300 leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </motion.div>

        {/* GitHub Stats Cards - Side by side */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Most Used Languages Card */}
          <motion.div 
            className="relative group h-full"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
            <div className="relative h-full p-2 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 group-hover:border-purple-500/50 transition-all flex items-center justify-center">
              <Image
                src={`https://github-readme-stats.vercel.app/api/top-langs?username=${username}&show_icons=true&locale=en&layout=compact&theme=dark&text_color=ffffff&title_color=a855f7&hide_border=true&bg_color=00000000`}
                alt="Most Used Languages"
                width={350}
                height={180}
                className="rounded-lg w-full h-[180px] object-contain"
              />
            </div>
          </motion.div>

          {/* GitHub Streak Stats Card */}
          <motion.div 
            className="relative group h-full"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
            <div className="relative h-full p-2 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 group-hover:border-purple-500/50 transition-all flex items-center justify-center">
              <Image
                src={`https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=dark&hide_border=true&ring=a855f7&fire=a855f7&currStreakLabel=a855f7&background=00000000`}
                alt="GitHub Streak Stats"
                width={350}
                height={180}
                className="rounded-lg w-full h-[180px] object-contain"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Contribution Graph */}
        <motion.div 
          className="relative group"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
          <div className="relative p-3 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 group-hover:border-purple-500/50 transition-all">
            <Image
              src={`https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=dark&hide_border=true&color=a855f7&line=a855f7&point=a855f7&area=true&hide_title=true&bg_color=00000000`}
              alt="GitHub Contribution Graph"
              width={1000}
              height={300}
              className="w-full h-[450px] rounded-lg"
            />
          </div>
        </motion.div>

        {/* Tech Stack Section */}
        <div className="space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center space-y-4"
          >
            <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
              Tech Stack
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Technologies and tools I&apos;ve worked with
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 pt-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                      : 'bg-black/20 text-gray-400 hover:bg-black/40 hover:text-white backdrop-blur-sm'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-2xl blur-3xl" />
            <div className="relative p-8 rounded-2xl border border-white/10">
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {Object.entries(portfolioData.skills)
                  .filter(([category]) => selectedCategory === 'All' || category === selectedCategory)
                  .map(([category, technologies]) => (
                    technologies.map((tech, index) => (
                      <TechStackItem key={`${category}-${tech}`} tech={tech} index={index} />
                    ))
                  ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Background effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-purple-900/5 to-black/0" />
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent" />
      </div>
    </section>
  )
}
