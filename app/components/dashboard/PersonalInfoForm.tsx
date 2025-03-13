'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function PersonalInfoForm({ portfolioData, username }: { portfolioData: any, username: string }) {
  const [formData, setFormData] = useState({
    name: portfolioData.personal.name || '',
    title: portfolioData.personal.title || '',
    location: portfolioData.personal.location || '',
    email: portfolioData.personal.email || '',
    phone: portfolioData.personal.phone || '',
    summary: portfolioData.personal.summary || '',
    bio: portfolioData.personal.bio || '',
    github: portfolioData.personal.social?.github || '',
    twitter: portfolioData.personal.social?.twitter || '',
    linkedin: portfolioData.personal.social?.linkedin || '',
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  const handleSubmit = async (e: { preventDefault: () => void }) => {
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
      
      // Update the personal information
      const updatedPortfolioData = {
        ...data.portfolio_data,
        personal: {
          ...data.portfolio_data.personal,
          name: formData.name,
          title: formData.title,
          location: formData.location,
          email: formData.email,
          phone: formData.phone,
          summary: formData.summary,
          bio: formData.bio,
          social: {
            github: formData.github,
            twitter: formData.twitter,
            linkedin: formData.linkedin
          }
        }
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
      console.error('Error updating personal info:', err)
      setError('Failed to update personal information')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
      
      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400">
          Personal information updated successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-300 mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-gray-300 mb-2">Professional Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-300 mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="City, Country"
            />
          </div>
          
          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-gray-300 mb-2">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-gray-300 mb-2">Professional Summary</label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            required
            rows={2}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-gray-300 mb-2">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            required
            rows={4}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        
        <div className="border-t border-gray-800 pt-6">
          <h3 className="text-xl font-medium mb-4">Social Links</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-300 mb-2">GitHub URL</label>
              <input
                type="url"
                name="github"
                value={formData.github}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="https://github.com/username"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">Twitter URL</label>
              <input
                type="url"
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="https://twitter.com/username"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 mb-2">LinkedIn URL</label>
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="https://linkedin.com/in/username"
              />
            </div>
          </div>
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-70"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  )
} 