'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabaseClient'
import LoadingScreen from '../components/LoadingScreen'
import PersonalInfoForm from '../components/dashboard/PersonalInfoForm'
import ExperienceForm from '../components/dashboard/ExperienceForm'
import ProjectsForm from '../components/dashboard/ProjectsForm'
import SkillsForm from '../components/dashboard/SkillsForm'
import SettingsForm from '../components/dashboard/SettingsForm'

export default function Dashboard() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [portfolioData, setPortfolioData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  
  // Check if user has a portfolio
  useEffect(() => {
    const checkPortfolio = async () => {
      try {
        // For now, we'll use a simple username from localStorage
        // In a real app, you'd use authentication
        const storedUsername = localStorage.getItem('portfolioUsername')
        
        if (!storedUsername) {
          router.push('/')
          return
        }
        
        setUsername(storedUsername)
        
        // Fetch the portfolio data
        const { data, error } = await supabase
          .from('portfolios')
          .select('portfolio_data')
          .eq('username', storedUsername)
          .single()
          
        if (error) throw error
        
        if (data) {
          setPortfolioData(data.portfolio_data)
        }
      } catch (err) {
        console.error('Error fetching portfolio:', err)
        setError('Failed to load your portfolio')
      } finally {
        setLoading(false)
      }
    }
    
    checkPortfolio()
  }, [router])
  
  if (loading) return <LoadingScreen />
  
  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="bg-gray-900 p-8 rounded-xl max-w-md w-full text-center">
          <h2 className="text-2xl text-red-400 mb-4">Error</h2>
          <p className="text-gray-300 mb-4">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-gray-900 border-b border-gray-800 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            Portfolio Dashboard
          </h1>
          <div className="flex items-center gap-4">
            <a 
              href={`/${username}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              View Portfolio
            </a>
            <button
              onClick={() => {
                localStorage.removeItem('portfolioUsername')
                router.push('/')
              }}
              className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
            >
              Log Out
            </button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <DashboardTabs portfolioData={portfolioData} username={username} />
      </main>
    </div>
  )
}

function DashboardTabs({ portfolioData, username }: { portfolioData: any, username: string }) {
  const [activeTab, setActiveTab] = useState('personal')
  
  const tabs = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'settings', label: 'Settings' }
  ]
  
  return (
    <div>
      <div className="flex border-b border-gray-800 mb-6 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-medium transition-colors ${
              activeTab === tab.id 
                ? 'text-purple-400 border-b-2 border-purple-400' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className="bg-gray-900 rounded-xl p-6">
        {activeTab === 'personal' && (
          <PersonalInfoForm portfolioData={portfolioData} username={username} />
        )}
        {activeTab === 'experience' && (
          <ExperienceForm portfolioData={portfolioData} username={username} />
        )}
        {activeTab === 'projects' && (
          <ProjectsForm portfolioData={portfolioData} username={username} />
        )}
        {activeTab === 'skills' && (
          <SkillsForm portfolioData={portfolioData} username={username} />
        )}
        {activeTab === 'settings' && (
          <SettingsForm portfolioData={portfolioData} username={username} />
        )}
      </div>
    </div>
  )
}

// function SettingsForm({ portfolioData, username }) {
//   return <div>Settings Form - Coming Soon</div>
// } 