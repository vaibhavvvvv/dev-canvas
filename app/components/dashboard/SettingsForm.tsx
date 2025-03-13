'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import Image from 'next/image'
import { FiCheck, FiInfo } from 'react-icons/fi'

export default function SettingsForm({ portfolioData, username }) {
  const [settings, setSettings] = useState({
    defaultTemplate: portfolioData.settings?.defaultTemplate || 'modern',
    seo: {
      title: portfolioData.settings?.seo?.title || `${portfolioData.personal?.name || username}'s Portfolio`,
      description: portfolioData.settings?.seo?.description || `Professional portfolio of ${portfolioData.personal?.name || username}`,
      keywords: portfolioData.settings?.seo?.keywords || 'portfolio, developer, software engineer'
    },
    customDomain: portfolioData.settings?.customDomain || '',
    analytics: {
      googleAnalyticsId: portfolioData.settings?.analytics?.googleAnalyticsId || ''
    }
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  
  // Available templates
  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean and professional design with smooth animations',
      thumbnail: '/images/templates/modern.jpg'
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Artistic and dynamic layout for creative professionals',
      thumbnail: '/images/templates/creative.jpg'
    }
    // Add more templates as they become available
  ]
  
  const handleChange = (e) => {
    const { name, value } = e.target
    
    // Handle nested properties
    if (name.includes('.')) {
      const [parent, child] = name.split('.')
      setSettings(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }))
    } else {
      setSettings(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }
  
  const selectTemplate = (templateId) => {
    setSettings(prev => ({
      ...prev,
      defaultTemplate: templateId
    }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)
    
    try {
      // Get the current portfolio data
      const { data, error: fetchError } = await supabase
        .from('portfolios')
        .select('portfolio_data')
        .eq('username', username)
        .single()
      
      if (fetchError) throw fetchError
      
      // Update the settings section
      const updatedPortfolioData = {
        ...data.portfolio_data,
        settings: settings
      }
      
      // Update the database
      const { error: updateError } = await supabase
        .from('portfolios')
        .update({ portfolio_data: updatedPortfolioData })
        .eq('username', username)
      
      if (updateError) throw updateError
      
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      console.error('Error updating settings:', err)
      setError('Failed to update settings')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Portfolio Settings</h2>
      
      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400">
          Settings updated successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Template Selection */}
        <div>
          <h3 className="text-xl font-medium mb-4">Template</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map(template => (
              <div 
                key={template.id}
                className={`relative rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                  settings.defaultTemplate === template.id 
                    ? 'border-purple-500 shadow-lg shadow-purple-500/20' 
                    : 'border-gray-700 hover:border-gray-500'
                }`}
                onClick={() => selectTemplate(template.id)}
              >
                <div className="aspect-video relative bg-gray-800">
                  {template.thumbnail ? (
                    <Image
                      src={template.thumbnail}
                      alt={template.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                      No preview
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{template.name}</h4>
                    {settings.defaultTemplate === template.id && (
                      <span className="text-purple-400">
                        <FiCheck />
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{template.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* SEO Settings */}
        <div>
          <h3 className="text-xl font-medium mb-4">SEO Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Page Title</label>
              <input
                type="text"
                name="seo.title"
                value={settings.seo.title}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Your Name - Software Developer"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Meta Description</label>
              <textarea
                name="seo.description"
                value={settings.seo.description}
                onChange={handleChange}
                rows={2}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="A brief description of your professional background and expertise"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Keywords</label>
              <input
                type="text"
                name="seo.keywords"
                value={settings.seo.keywords}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="portfolio, developer, software engineer, your specialties"
              />
              <p className="text-sm text-gray-400 mt-1">Separate keywords with commas</p>
            </div>
          </div>
        </div>
        
        {/* Custom Domain (Premium Feature) */}
        <div className="opacity-60">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-xl font-medium">Custom Domain</h3>
            <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">Premium</span>
          </div>
          
          <div className="relative">
            <input
              type="text"
              name="customDomain"
              value={settings.customDomain}
              onChange={handleChange}
              disabled
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="yourdomain.com"
            />
            <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] flex items-center justify-center rounded-lg">
              <div className="flex items-center gap-2 text-gray-300">
                <FiInfo /> Coming soon in premium plan
              </div>
            </div>
          </div>
        </div>
        
        {/* Analytics (Premium Feature) */}
        <div className="opacity-60">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-xl font-medium">Analytics</h3>
            <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">Premium</span>
          </div>
          
          <div className="relative">
            <div>
              <label className="block text-gray-300 mb-2">Google Analytics ID</label>
              <input
                type="text"
                name="analytics.googleAnalyticsId"
                value={settings.analytics.googleAnalyticsId}
                onChange={handleChange}
                disabled
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="G-XXXXXXXXXX"
              />
            </div>
            <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] flex items-center justify-center rounded-lg">
              <div className="flex items-center gap-2 text-gray-300">
                <FiInfo /> Coming soon in premium plan
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-70"
          >
            {loading ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  )
} 