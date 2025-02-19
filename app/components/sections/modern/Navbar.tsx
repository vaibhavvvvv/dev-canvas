'use client'

import { motion, useScroll } from 'framer-motion'
import { useState, useEffect } from 'react'

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('')
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Update navbar background on scroll
  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50)
    })
  }, [scrollY])

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => ({
        id: item.name.toLowerCase(),
        offset: document.getElementById(item.name.toLowerCase())?.offsetTop || 0
      }))

      const scrollPosition = window.scrollY + window.innerHeight / 2

      const currentSection = sections.reduce((acc, section) => {
        return scrollPosition >= section.offset ? section.id : acc
      }, sections[0].id)

      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }
  return (
    <div className="fixed top-4 left-0 right-0 z-50 px-4">
      {/* Desktop Navbar */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`max-w-xl mx-auto rounded-full transition-all duration-300 ${
          isScrolled ? 'bg-black/80 backdrop-blur-lg' : 'bg-black/40 backdrop-blur-sm'
        } hidden md:block`} // Hide on mobile, show on desktop
      >
        <div className="relative px-4 py-3">
          <ul className="flex items-center justify-center space-x-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => handleClick(item.href)}
                  className="relative px-4 py-2 rounded-full text-sm font-medium transition-all"
                >
                  <span className={`relative z-10 ${
                    activeSection === item.name.toLowerCase()
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}>
                    {item.name}
                  </span>
                  
                  {activeSection === item.name.toLowerCase() && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full backdrop-blur-sm"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Decorative Border */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 -z-10 blur-sm" />
          <div className="absolute inset-0 rounded-full border border-white/10" />
        </div>
      </motion.nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden absolute left-4 top-1">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-full bg-black/80 backdrop-blur-lg hover:bg-black/90 transition-colors"
          aria-label="Toggle menu"
        >
          <motion.div
            animate={isMenuOpen ? "open" : "closed"}
            className="w-6 h-5 relative"
          >
            <motion.span
              className="absolute w-6 h-0.5 bg-purple-300 transform-gpu"
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: 45, y: 10 },
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="absolute w-6 h-0.5 bg-purple-400 top-2 transform-gpu"
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 },
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="absolute w-6 h-0.5 bg-purple-600 top-4 transform-gpu"
              variants={{
                closed: { rotate: 0, y: 0 },
                open: { rotate: -45, y: -10 },
              }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden"
          style={{ zIndex: 40 }}
        />
      )}

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{
          opacity: isMenuOpen ? 1 : 0,
          pointerEvents: isMenuOpen ? 'auto' : 'none',
        }}
        className="absolute top-16 left-4 right-4 bg-black/80 backdrop-blur-lg rounded-2xl p-4 shadow-lg md:hidden"
        style={{ zIndex: 45 }}
      >
        <ul className="space-y-1">
          {navItems.map((item) => (
            <motion.li
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <button
                onClick={() => handleClick(item.href)}
                className={`w-full px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeSection === item.name.toLowerCase()
                    ? 'text-white bg-white/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.name}
              </button>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  )
}