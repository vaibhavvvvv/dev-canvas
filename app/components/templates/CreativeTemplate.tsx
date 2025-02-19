'use client'

import { motion } from 'framer-motion'
// import { portfolioData } from '@/app/data/portfolio-data'
import CreativeNavbar from '../sections/creative/CreativeNavbar'
import CreativeHero from '../sections/creative/CreativeHero'
import CreativeAbout from '../sections/creative/CreativeAbout'
import CreativeProjects from '../sections/creative/CreativeProjects'
import CreativeExperience from '../sections/creative/CreativeExperience'
import CreativeContact from '../sections/creative/CreativeContact'

export default function CreativeTemplate() {

  // Updated floating stones with softer colors
  const floatingStones = [
    { color: '#FFB5B5', size: 300, blur: 30, opacity: 0.5, initialPosition: { x: '10%', y: '20%' } },
    { color: '#B5E8E4', size: 250, blur: 25, opacity: 0.4, initialPosition: { x: '80%', y: '15%' } },
    { color: '#B5D8E4', size: 280, blur: 28, opacity: 0.45, initialPosition: { x: '60%', y: '70%' } },
    { color: '#D6E4B5', size: 320, blur: 32, opacity: 0.4, initialPosition: { x: '5%', y: '60%' } },
    { color: '#FFE4B5', size: 200, blur: 20, opacity: 0.5, initialPosition: { x: '75%', y: '45%' } },
    { color: '#D8B5E4', size: 350, blur: 35, opacity: 0.45, initialPosition: { x: '30%', y: '85%' } },
    { color: '#FFB5E4', size: 270, blur: 27, opacity: 0.4, initialPosition: { x: '40%', y: '30%' } },
    { color: '#B5E4D4', size: 290, blur: 29, opacity: 0.45, initialPosition: { x: '85%', y: '80%' } },
  ]

  return (
    <>
      <style jsx global>{`
        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb {
          border-radius: 5px;
          background: linear-gradient(
            var(--scroll-gradient-start, #8B5CF6),
            var(--scroll-gradient-end, #6366F1)
          );
          animation: scrollbarGradient 5s ease infinite;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(
            var(--scroll-gradient-start, #7C3AED),
            var(--scroll-gradient-end, #4F46E5)
          );
        }

        /* Scrollbar Gradient Animation */
        @keyframes scrollbarGradient {
          0% {
            --scroll-gradient-start: #8B5CF6;
            --scroll-gradient-end: #6366F1;
          }
          25% {
            --scroll-gradient-start: #EC4899;
            --scroll-gradient-end: #8B5CF6;
          }
          50% {
            --scroll-gradient-start: #06B6D4;
            --scroll-gradient-end: #EC4899;
          }
          75% {
            --scroll-gradient-start: #10B981;
            --scroll-gradient-end: #06B6D4;
          }
          100% {
            --scroll-gradient-start: #8B5CF6;
            --scroll-gradient-end: #6366F1;
          }
        }

        /* Firefox Scrollbar */
        * {
          scrollbar-width: thin;
          scrollbar-color: #8B5CF6 #f1f1f1;
        }

        *:hover {
          scrollbar-color: #7C3AED #f1f1f1;
        }
      `}</style>

      <div className="relative min-h-screen bg-gradient-to-b from-white to-gray-50 overflow-hidden">
        {/* Decorative Background Text with Raleway Dots */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -right-20 top-40 rotate-90 opacity-5">
            <span className="font-dots text-9xl">Creative</span>
          </div>
          <div className="absolute -left-20 bottom-40 -rotate-90 opacity-5">
            <span className="font-dots text-9xl">Portfolio</span>
          </div>
        </div>

        {/* Floating Stones Background */}
        <div className="fixed inset-0 overflow-hidden">
          {floatingStones.map((stone, index) => (
            <motion.div
              key={index}
              className="absolute rounded-full"
              style={{
                width: stone.size,
                height: stone.size,
                filter: `blur(${stone.blur}px)`,
                opacity: stone.opacity,
                background: `radial-gradient(circle at 30% 30%, ${stone.color}, transparent 70%)`,
                left: stone.initialPosition.x,
                top: stone.initialPosition.y,
              }}
              animate={{
                x: [
                  0,
                  Math.random() * 300 - 150,
                  Math.random() * -300 + 150,
                  0
                ],
                y: [
                  0,
                  Math.random() * 300 - 150,
                  Math.random() * -300 + 150,
                  0
                ],
                scale: [1, 1.2, 0.8, 1],
                rotate: [0, 360, -360, 0],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: index * 0.2,
              }}
            />
          ))}

          {/* Additional small floating particles with faster movement */}
          {[...Array(15)].map((_, index) => (
            <motion.div
              key={`particle-${index}`}
              className="absolute w-4 h-4 rounded-full bg-white/40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [
                  0,
                  Math.random() * 400 - 200,
                  Math.random() * -400 + 200,
                  0
                ],
                y: [
                  0,
                  Math.random() * 400 - 200,
                  Math.random() * -400 + 200,
                  0
                ],
                scale: [0.8, 1.3, 0.5, 0.8],
                opacity: [0.4, 0.7, 0.3, 0.4],
              }}
              transition={{
                duration: 6 + Math.random() * 3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: index * 0.1,
              }}
            />
          ))}
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10">
          {/* Navbar with Outfit font */}
          <div className="font-outfit">
            <CreativeNavbar />
          </div>
          
          <main className="relative">
            {/* Hero with mixed fonts */}
            <section id="home" className="relative">
              <div className="absolute top-10 right-10 opacity-10 font-dots text-4xl">
                Developer
              </div>
              <CreativeHero />
            </section>
            
            {/* About with mixed fonts */}
            <section id="about" className="relative">
              <div className="absolute bottom-10 left-10 opacity-10 font-dots text-4xl">
                About
              </div>
              <CreativeAbout />
            </section>
            
            {/* Experience with Outfit and decorative dots */}
            <section id="experience" className="relative font-outfit">
              <div className="absolute top-10 left-10 opacity-10 font-dots text-4xl">
                Journey
              </div>
              <CreativeExperience />
            </section>
            
            {/* Projects with mixed fonts */}
            <section id="projects" className="relative">
              <div className="absolute top-10 right-10 opacity-10 font-dots text-4xl">
                Projects
              </div>
              <CreativeProjects />
            </section>
            
            {/* Contact with Outfit and dots */}
            <section id="contact" className="relative font-outfit">
              <div className="absolute bottom-10 right-10 opacity-10 font-dots text-4xl">
                Contact
              </div>
              <CreativeContact />
            </section>
          </main>
        </div>
      </div>
    </>
  )
}