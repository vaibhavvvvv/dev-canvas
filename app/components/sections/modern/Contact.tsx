'use client'

import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { portfolioData } from '@/app/data/portfolio-data'
import { FiMail, FiPhone, FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi'

export default function Contact() {
  const containerRef = useRef(null)
  const [copied, setCopied] = useState<string | null>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const contactMethods = [
    {
      name: 'Email',
      value: portfolioData.personal.email,
      icon: <FiMail className="w-6 h-6" />,
      action: 'Copy',
      href: `mailto:${portfolioData.personal.email}`,
      color: 'from-red-500/20 to-orange-500/20'
    },
    {
      name: 'Phone',
      value: portfolioData.personal.phone,
      icon: <FiPhone className="w-6 h-6" />,
      action: 'Copy',
      href: `tel:${portfolioData.personal.phone}`,
      color: 'from-green-500/20 to-emerald-500/20'
    },
    {
      name: 'GitHub',
      value: portfolioData.personal.social.github,
      icon: <FiGithub className="w-6 h-6" />,
      action: 'Visit',
      href: portfolioData.personal.social.github,
      color: 'from-gray-500/20 to-gray-600/20'
    },
    {
      name: 'LinkedIn',
      value: portfolioData.personal.name,
      icon: <FiLinkedin className="w-6 h-6" />,
      action: 'Visit',
      href: portfolioData.personal.social.linkedin,
      color: 'from-blue-500/20 to-blue-600/20'
    },
    {
      name: 'Twitter',
      value: portfolioData.personal.social.twitter,
      icon: <FiTwitter className="w-6 h-6" />,
      action: 'Visit',
      href: portfolioData.personal.social.twitter,
      color: 'from-sky-500/20 to-blue-500/20'
    }
  ]

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value)
    setCopied(value)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <section ref={containerRef} className="min-h-screen py-20 relative mt-20 overflow-hidden">

      <motion.div 
        style={{ y, opacity }} 
        className="container mx-auto px-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16 relative"
        >
          {/* Profile Image */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            className="w-24 h-24 mx-auto mb-6 relative mt-24 sm:mt-12 rounded-full overflow-hidden border-2 border-purple-500/50"
          >
            <Image
              src={portfolioData.personal.images.profile}
              alt={portfolioData.personal.name}
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            Let&apos;s Connect
          </h2>
          <p className="text-lg text-gray-400">
            Feel free to reach out for collaborations or just a friendly hello
          </p>
        </motion.div>

        {/* Updated Contact Methods - All in same style */}
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                {method.action === 'Copy' ? (
                  <motion.button
                    onClick={() => handleCopy(method.value)}
                    whileHover={{ y: -5 }}
                    className="flex items-center gap-3 px-6 py-3 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-300"
                  >
                    <span className="text-white/80 group-hover:text-purple-400 transition-colors">
                      {method.icon}
                    </span>
                    <div className="text-left">
                      <span className="block text-white font-medium">{method.name}</span>
                      <span className="block text-sm text-gray-400">{method.value}</span>
                    </div>
                    <span className="ml-2 text-sm text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      {copied === method.value ? '✓' : 'Copy'}
                    </span>
                  </motion.button>
                ) : (
                  <motion.a
                    href={method.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -5 }}
                    className="flex items-center gap-3 px-6 py-3 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-300"
                  >
                    <span className="text-white/80 group-hover:text-purple-400 transition-colors">
                      {method.icon}
                    </span>
                    <div className="text-left">
                      <span className="block text-white font-medium">{method.name}</span>
                      <span className="block text-sm text-gray-400">{method.value}</span>
                    </div>
                    <span className="ml-2 text-sm text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      Visit →
                    </span>
                  </motion.a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
} 