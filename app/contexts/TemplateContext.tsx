'use client'

import { createContext, useContext, useState } from 'react'
import { portfolioData } from '../data/portfolio-data'

// Define available template IDs from portfolio data
type Template = typeof portfolioData.settings.availableTemplates[number]['id']

interface TemplateContextType {
  currentTemplate: Template
  setTemplate: (template: Template) => void
}

const TemplateContext = createContext<TemplateContextType | undefined>(undefined)

export function TemplateProvider({ children }: { children: React.ReactNode }) {
  const [currentTemplate, setCurrentTemplate] = useState<Template>(portfolioData.settings.defaultTemplate as Template)

  const setTemplate = (template: Template) => {
    setCurrentTemplate(template)
  }

  return (
    <TemplateContext.Provider value={{ currentTemplate, setTemplate }}>
      {children}
    </TemplateContext.Provider>
  )
}

export const useTemplate = () => {
  const context = useContext(TemplateContext)
  if (!context) throw new Error('useTemplate must be used within TemplateProvider')
  return context
}