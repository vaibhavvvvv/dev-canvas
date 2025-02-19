'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { portfolioData } from '@/app/data/portfolio-data'
import { FiMail, FiPhone, FiGithub, FiTwitter, FiLinkedin, FiMapPin } from 'react-icons/fi'
import Image from 'next/image'

export default function CreativeContact() {
  const containerRef = useRef(null)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0])

  const contactMethods = [
    {
      id: 'email',
      icon: <FiMail className="w-6 h-6" />,
      label: 'Email',
      value: portfolioData.personal.email,
      href: `mailto:${portfolioData.personal.email}`,
    },
    {
      id: 'phone',
      icon: <FiPhone className="w-6 h-6" />,
      label: 'Phone',
      value: portfolioData.personal.phone,
      href: `tel:${portfolioData.personal.phone}`,
    },
    {
      id: 'location',
      icon: <FiMapPin className="w-6 h-6" />,
      label: 'Location',
      value: portfolioData.personal.location,
    },
    {
      id: 'github',
      icon: <FiGithub className="w-6 h-6" />,
      label: 'GitHub',
      value: 'View Profile',
      href: portfolioData.personal.social.github,
    },
    {
      id: 'twitter',
      icon: <FiTwitter className="w-6 h-6" />,
      label: 'Twitter',
      value: 'Follow Me',
      href: portfolioData.personal.social.twitter,
    },
    {
      id: 'linkedin',
      icon: <FiLinkedin className="w-6 h-6" />,
      label: 'LinkedIn',
      value: 'Connect',
      href: portfolioData.personal.social.linkedin,
    }
  ]

  return (
    <section ref={containerRef} className="min-h-screen py-20 relative pt-32 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 -z-10">
        {contactMethods.map((method, index) => (
          <motion.div
            key={method.id}
            animate={{
              scale: hoveredCard === method.id ? [1, 1.2, 1] : 1,
              opacity: hoveredCard === method.id ? 0.3 : 0.1,
            }}
            transition={{ duration: 2, repeat: hoveredCard === method.id ? Infinity : 0 }}
            className="absolute w-40 h-40 rounded-full blur-3xl"
            style={{
              background: `hsl(${(index * 60) % 360}, 70%, 85%)`,
              left: `${(index % 3) * 33 + Math.random() * 20}%`,
              top: `${Math.floor(index / 3) * 33 + Math.random() * 20}%`,
            }}
          />
        ))}
      </div>

      <motion.div style={{ y, opacity }} className="container mx-auto px-4">
        {/* Two-column layout for medium/large screens */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12 max-w-6xl mx-auto">
          {/* Messages Column */}
          <div className="flex-1">
            <motion.div className="text-center md:text-left mb-8 relative">
              <div className="text-5xl md:text-6xl lg:text-7xl font-bold relative z-10 mb-12"
                style={{
                  background: 'linear-gradient(135deg, rgb(72 235 146) 0%, rgb(55 161 153) 50%, rgb(113 195 255) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Get in Touch

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
              </div>
               
         

              {/* WhatsApp Style Message */}
              <div className="max-w-md mx-auto md:mx-0 mt-8 relative">
                {/* Profile Picture and Typing Indicator */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-start gap-3 mb-2"
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-teal-500/20">
                    <Image
                      src={portfolioData.personal.images.profile}
                      alt="Profile"
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 0.5, repeat: 3, repeatType: "reverse" }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-gray-500 mt-3"
                  >
                    typing...
                  </motion.div>
                </motion.div>

                {/* First Message */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                  className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-4 rounded-2xl rounded-tl-none max-w-[80%] ml-10 relative mb-4"
                >
                  <div className="absolute -left-2 -top-0 w-4 h-4 bg-teal-500 clip-message" />
                  Feel free to reach out for collaborations
                </motion.div>

                {/* Second Message */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 3, duration: 0.5 }}
                  className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-4 rounded-2xl rounded-tl-none max-w-[80%] ml-10 relative"
                >
                  <div className="absolute -left-2 -top-0 w-4 h-4 bg-teal-500 clip-message" />
                  or just to say hello! 👋
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Smartphone Column */}
          <div className="flex-1 max-w-[350px] ">
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative bg-gray-900 rounded-[3rem] p-4 pb-8 shadow-2xl border-8 border-gray-800"
            >
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-2xl" />
              
              {/* Screen */}
              <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl p-4 min-h-[550px] relative overflow-hidden">
                {/* Wallpaper */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20" />
                  <div className="absolute inset-0 backdrop-blur-xl">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.1),_rgba(0,0,0,0.1))]" />
                    <div className="absolute w-[500px] h-[500px] -top-48 -left-48 bg-purple-500/30 rounded-full mix-blend-overlay filter blur-xl opacity-50 animate-blob" />
                    <div className="absolute w-[400px] h-[400px] -bottom-48 -right-48 bg-blue-500/30 rounded-full mix-blend-overlay filter blur-xl opacity-50 animate-blob animation-delay-2000" />
                    <div className="absolute w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-teal-500/30 rounded-full mix-blend-overlay filter blur-xl opacity-50 animate-blob animation-delay-4000" />
                  </div>
                </div>

                {/* App Icons Grid */}
                <div className="grid grid-cols-2 gap-8 mt-12 relative z-10">
                  {contactMethods.map((method, index) => (
                    <motion.a
                      key={method.id}
                      href={method.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                      className="aspect-square relative group"
                      onMouseEnter={() => setHoveredCard(method.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      {/* App Icon Background */}
                      <div 
                        className="absolute inset-0 rounded-2xl opacity-80 transition-all duration-300 group-hover:opacity-100 backdrop-blur-md"
                        style={{
                          background: `linear-gradient(135deg, 
                            hsl(${(index * 60) % 360}, 70%, 85%), 
                            hsl(${((index * 60) + 30) % 360}, 70%, 85%)
                          )`,
                        }}
                      />
                      
                      {/* Icon */}
                      <div className="relative h-full flex items-center justify-center">
                        <div className="text-gray-800 w-8 h-8">
                          {method.icon}
                        </div>
                      </div>
                      
                      {/* App Name */}
                      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-300 whitespace-nowrap">
                        {method.label}
                      </div>
                    </motion.a>
                  ))}
                </div>

                {/* Home Indicator */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-700 rounded-full" />
              </div>
            </motion.div>

            {/* Phone Reflections */}
            <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
            <div className="absolute inset-0 rounded-[3rem] bg-gradient-to-bl from-white/5 to-transparent pointer-events-none" />
          </div>
        </div>
      </motion.div>

      {/* Add these styles to your global CSS or in a style tag */}
      <style jsx>{`
        .clip-message {
          clip-path: polygon(0 0, 100% 0, 100% 100%);
        }
        
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  )
} 