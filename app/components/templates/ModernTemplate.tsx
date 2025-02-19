'use client'

import { motion } from 'framer-motion'
// import { portfolioData } from '@/app/data/portfolio-data'
import Navbar from '../sections/modern/Navbar'
import Hero from '../sections/modern/Hero'
import About from '../sections/modern/About'
import Projects from '../sections/modern/Projects'
import Experience from '../sections/modern/Experience'
// import Skills from '../sections/modern/Skills'
import Contact from '../sections/modern/Contact'

export default function ModernTemplate() {
  return (
    <>
      <style jsx global>{`
        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb {
          border-radius: 5px;
          background: linear-gradient(
            var(--scroll-gradient-start),
            var(--scroll-gradient-end)
          );
          animation: scrollbarGradient 5s ease infinite;
        }

        ::-webkit-scrollbar-thumb:hover {
          opacity: 0.8;
        }

        /* Scrollbar Gradient Animation */
        @keyframes scrollbarGradient {
          0%, 100% {
            --scroll-gradient-start: rgba(255, 255, 255, 0.3);
            --scroll-gradient-end: rgba(139, 92, 246, 0.3);
          }
          25% {
            --scroll-gradient-start: rgba(236, 72, 153, 0.3);
            --scroll-gradient-end: rgba(139, 92, 246, 0.3);
          }
          50% {
            --scroll-gradient-start: rgba(6, 182, 212, 0.3);
            --scroll-gradient-end: rgba(236, 72, 153, 0.3);
          }
          75% {
            --scroll-gradient-start: rgba(16, 185, 129, 0.3);
            --scroll-gradient-end: rgba(6, 182, 212, 0.3);
          }
        }

        /* Set initial values for the CSS variables */
        :root {
          --scroll-gradient-start: rgba(255, 255, 255, 0.3);
          --scroll-gradient-end: rgba(139, 92, 246, 0.3);
        }

        /* Firefox Scrollbar */
        * {
          scrollbar-width: thin;
          scrollbar-color: rgba(139, 92, 246, 0.3) rgba(255, 255, 255, 0.1);
        }

        *:hover {
          scrollbar-color: rgba(139, 92, 246, 0.4) rgba(255, 255, 255, 0.1);
        }
      `}</style>

      <Navbar />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-white"
      >
        <section id="home">
          <Hero />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="experience">
          <Experience />
        </section>
        <section id="projects">
          <Projects />
        </section>
        {/* <Skills /> */}
        <section id="contact">
          <Contact />
        </section>
      </motion.div>
    </>
  )
}