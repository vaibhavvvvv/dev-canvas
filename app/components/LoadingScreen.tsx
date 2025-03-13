'use client'

import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-16 h-16 mx-auto mb-4 border-t-2 border-b-2 border-purple-500 rounded-full"
        />
        <h2 className="text-xl text-purple-400">Loading portfolio...</h2>
      </motion.div>
    </div>
  )
} 