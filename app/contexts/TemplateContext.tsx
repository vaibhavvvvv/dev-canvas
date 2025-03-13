'use client'

import { createContext, useContext, useState } from 'react'

// Define Template type
type Template = string

interface TemplateContextType {
  currentTemplate: Template
  setTemplate: (template: Template) => void
  portfolioData: any // Use a more specific type based on your data structure
}

const TemplateContext = createContext<TemplateContextType | undefined>(undefined)

export function TemplateProvider({ 
  children, 
  initialData 
}: { 
  children: React.ReactNode,
  initialData: any // Use a more specific type based on your data structure
}) {
  // Use the default template from the provided data
  const [currentTemplate, setCurrentTemplate] = useState<Template>(
    initialData.settings.defaultTemplate || 'modern'
  )

  const setTemplate = (template: Template) => {
    setCurrentTemplate(template)
  }

  return (
    <TemplateContext.Provider value={{ 
      currentTemplate, 
      setTemplate,
      portfolioData: initialData
    }}>
      {children}
    </TemplateContext.Provider>
  )
}

export const useTemplate = () => {
  const context = useContext(TemplateContext)
  if (!context) throw new Error('useTemplate must be used within TemplateProvider')
  return context
}