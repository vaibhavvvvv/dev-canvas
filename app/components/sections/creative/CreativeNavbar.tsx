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

export default function CreativeNavbar() {
  const [activeSection, setActiveSection] = useState('')
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 0)
    })
  }, [scrollY])

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => ({
        id: item.name.toLowerCase(),
        element: document.querySelector(item.href)
      }))
      
      const currentSection = sections.find(section => {
        if (!section.element) return false
        const rect = section.element.getBoundingClientRect()
        return rect.top <= 100 && rect.bottom >= 100
      })
      
      setActiveSection(currentSection?.id || '')
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false) // Close mobile menu after click
    }
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`relative px-4 py-4 transition-all duration-300 ${
          isScrolled ? 'bg-white/10 backdrop-blur-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-xl mx-auto relative">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-white/10 transition-colors z-50 mt-6"
            aria-label="Toggle menu"
          >
            <motion.div
              animate={isMenuOpen ? "open" : "closed"}
              className="w-6 h-5 relative"
            >
              <motion.span
                className="absolute w-6 h-0.5 bg-gray-600 transform-gpu"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 10 },
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="absolute w-6 h-0.5 bg-gray-600 top-2 transform-gpu"
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="absolute w-6 h-0.5 bg-gray-600 top-4 transform-gpu"
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -10 },
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </button>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center justify-center space-x-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => handleClick(item.href)}
                  onMouseEnter={() => setHoveredItem(item.name.toLowerCase())}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="relative px-4 py-2 rounded-xl text-sm font-medium transition-all"
                >
                  <motion.span
                    className={`relative z-10 ${
                      activeSection === item.name.toLowerCase()
                        ? 'text-purple-600'
                        : 'text-gray-600 hover:text-purple-600'
                    }`}
                  >
                    {item.name}
                  </motion.span>
                  
                  {/* Active/Hover Indicator */}
                  {(activeSection === item.name.toLowerCase() || hoveredItem === item.name.toLowerCase()) && (
                    <motion.div
                      layoutId="navIndicator"
                      className="absolute inset-0 rounded-xl bg-white/50"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Overlay */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-white/90 backdrop-blur-sm md:hidden"
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
            className="absolute top-16 left-0 right-0 bg-white/50 backdrop-blur-lg rounded-2xl p-4 shadow-lg md:hidden"
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
                        ? 'text-purple-600 bg-purple-50/50'
                        : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50/30'
                    }`}
                  >
                    {item.name}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.nav>
    </div>
  )
}