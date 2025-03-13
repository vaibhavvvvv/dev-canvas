'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { TemplateProvider } from '../contexts/TemplateContext'
import ModernTemplate from '../components/templates/ModernTemplate'
import CreativeTemplate from '../components/templates/CreativeTemplate'
import TemplateSwitch from '../components/TemplateSwitch'
import CustomCursor from '../components/CustomCursor'
import LoadingScreen from '../components/LoadingScreen'
import { useTemplate } from '../contexts/TemplateContext'

export default function PortfolioPage({ params }: { params: { username: string } }) {
  const [portfolioData, setPortfolioData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    async function fetchPortfolioData() {
      try {
        const { data, error } = await supabase
          .from('portfolios')
          .select('portfolio_data')
          .eq('username', params.username)
          .single()
          
        if (error) throw error
        
        if (!data) {
          setError(null)
          setPortfolioData(null)
        } else {
          setPortfolioData(data.portfolio_data)
        }
      } catch (err) {
        console.error('Error fetching portfolio data:', err)
        setError(null)
        setPortfolioData(null)
      } finally {
        setLoading(false)
      }
    }
    
    fetchPortfolioData()
  }, [params.username])
  
  if (loading) return <LoadingScreen />
  
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>
  
  if (portfolioData) {
    return (
      <TemplateProvider initialData={portfolioData}>
        <div className="min-h-screen">
          <CustomCursor />
          <TemplateSwitch />
          <ClientTemplate />
        </div>
      </TemplateProvider>
    )
  }
  
  return <div className="min-h-screen flex items-center justify-center">Portfolio not found</div>
}

function ClientTemplate() {
  const { currentTemplate } = useTemplate()
  
  return (
    <>
      {currentTemplate === 'modern' ? <ModernTemplate /> : <CreativeTemplate />}
    </>
  )
} 