'use client'

import { TemplateProvider, useTemplate } from './contexts/TemplateContext'
import ModernTemplate from './components/templates/ModernTemplate'
import CreativeTemplate from './components/templates/CreativeTemplate'
import TemplateSwitch from './components/TemplateSwitch'
import CustomCursor from './components/CustomCursor'

export default function Home() {
  return (
    <TemplateProvider>
      <div className="min-h-screen">
        <CustomCursor />
        <TemplateSwitch />
        <ClientTemplate />
      </div>
    </TemplateProvider>
  )
}

function ClientTemplate() {
  const { currentTemplate } = useTemplate()
  
  return (
    <>
      {currentTemplate === 'modern' ? <ModernTemplate /> : <CreativeTemplate />}
    </>
  )
}