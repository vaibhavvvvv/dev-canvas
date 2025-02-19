'use client'

import { useTemplate } from '../contexts/TemplateContext'
import { useEffect, useState } from 'react'
import { portfolioData } from '../data/portfolio-data'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

// Define Template type based on portfolio data
type Template = typeof portfolioData.settings.availableTemplates[number]['id']

export default function TemplateSwitch() {
  const { currentTemplate, setTemplate } = useTemplate()
  const [isOpen, setIsOpen] = useState(false)

  // Initialize template from localStorage or default
  useEffect(() => {
    const savedTemplate = localStorage.getItem('selectedTemplate')
    if (savedTemplate && isValidTemplate(savedTemplate)) {
      setTemplate(savedTemplate as Template)
    } else {
      setTemplate(portfolioData.settings.defaultTemplate as Template)
    }
  }, [setTemplate])

  // Type guard to validate template
  const isValidTemplate = (template: string): template is Template => {
    return portfolioData.settings.availableTemplates.map(t => t.id).includes(template)
  }

  // Save template choice to localStorage
  const handleTemplateChange = (templateId: Template) => {
    setTemplate(templateId)
    localStorage.setItem('selectedTemplate', templateId)
    setIsOpen(false)
  }

  return (
    <>
      {/* Template Selector Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-[51] px-4 py-2.5 rounded-full 
          bg-white/90 hover:bg-white shadow-lg border border-purple-200
          text-gray-900 hover:text-purple-600 transition-all duration-300
          flex items-center gap-2 group"
      >
        <svg
          className="w-5 h-5 text-purple-500 group-hover:text-purple-600 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
        <span className="font-medium sm:inline hidden">Templates</span>
      </button>

      {/* Template Selection Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed m-2 right-0 -translate-x-1/2 -translate-y-1/2 
                z-[9999] w-[95%] max-w-2xl bg-white rounded-2xl shadow-2xl 
                p-4 sm:p-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white pb-4 z-10">
                <h2 className="text-2xl font-bold text-gray-900">Select Template</h2>
                
                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-0 right-0 p-2 rounded-full 
                    text-gray-400 hover:text-gray-600 hover:bg-gray-100 
                    transition-all duration-200"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              
              {/* Templates Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {portfolioData.settings.availableTemplates.map((template) => (
                  <motion.button
                    key={template.id}
                    onClick={() => handleTemplateChange(template.id)}
                    whileHover={{ scale: 1.02 }}
                    className={`relative p-3 sm:p-4 rounded-xl border-2 transition-all ${
                      currentTemplate === template.id
                        ? 'border-purple-500 bg-purple-50/80'
                        : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
                    }`}
                  >
                    {/* Template Preview */}
                    <div className="relative w-full aspect-video mb-3 rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={template.thumbnail}
                        alt={template.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Template Info */}
                    <div className="text-left">
                      <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{template.description}</p>
                    </div>

                    {/* Selected Indicator */}
                    {currentTemplate === template.id && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-purple-500 rounded-full 
                        flex items-center justify-center shadow-lg">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}