'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function PortfolioForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    title: '',
    email: '',
    phone: '',
    summary: '',
    bio: '',
    github: '',
    twitter: '',
    linkedin: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      // Check if username already exists
      const { data: existingUser } = await supabase
        .from('portfolios')
        .select('username')
        .eq('username', formData.username)
        .single()
      
      if (existingUser) {
        setError('Username already taken. Please choose another one.')
        setLoading(false)
        return
      }
      
      // Create portfolio data structure based on your schema
      const portfolioData = {
        settings: {
          defaultTemplate: 'modern',
          availableTemplates: [
            {
              id: 'modern',
              name: 'Modern',
              description: 'Clean and professional design',
              thumbnail: '/images/templates/modern.jpg'
            },
            {
              id: 'creative',
              name: 'Creative',
              description: 'Artistic and dynamic layout',
              thumbnail: '/images/templates/creative.jpg'
            }
          ]
        },
        personal: {
          name: formData.name,
          title: formData.title,
          email: formData.email,
          phone: formData.phone,
          summary: formData.summary,
          bio: formData.bio,
          social: {
            github: formData.github,
            twitter: formData.twitter,
            linkedin: formData.linkedin
          },
          images: {
            profile: "/images/profile.jpg", // Default images
            background: "/images/background.jpg",
            contact: "/images/contact.jpg"
          }
        },
        // Add empty arrays for other sections that will be filled later
        experience: [],
        projects: [],
        skills: {
          "Programming Languages": [],
          "Libraries & Frameworks": [],
          "Tools & Platforms": [],
          "Databases": []
        },
        education: []
      }
      
      // Insert into Supabase
      const { error: insertError } = await supabase
        .from('portfolios')
        .insert({
          username: formData.username,
          portfolio_data: portfolioData
        })
      
      if (insertError) throw insertError
      
      // Save username to localStorage
      localStorage.setItem('portfolioUsername', formData.username)
      
      setSuccess(true)
      // Redirect to the dashboard after a delay
      setTimeout(() => {
        router.push('/dashboard')
      }, 2000)
      
    } catch (err) {
      console.error('Error creating portfolio:', err)
      setError('Failed to create portfolio. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="bg-gray-900 p-8 rounded-xl max-w-md w-full text-center">
          <h2 className="text-2xl text-green-400 mb-4">Portfolio Created Successfully!</h2>
          <p className="text-gray-300 mb-4">
            Your portfolio is now available at: <br/>
            <span className="text-purple-400 font-bold">devcanvas.com/{formData.username}</span>
          </p>
          <p className="text-gray-400">Redirecting you to your portfolio...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4 bg-black">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
          Create Your Developer Portfolio
        </h1>
        
        <div className="bg-gray-900 p-8 rounded-xl shadow-lg">
          {error && (
            <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-200">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-gray-300 mb-2">Username (URL identifier)</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                pattern="[a-zA-Z0-9_-]+"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., johndoe"
              />
              <p className="mt-1 text-sm text-gray-400">
                This will be your portfolio URL: devcanvas.com/<span className="text-purple-400">{formData.username || 'username'}</span>
              </p>
            </div>
            
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
                  placeholder="John Doe"
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
                  placeholder="Software Engineer"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="+1 234 567 8900"
                />
              </div>
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
                placeholder="A passionate developer specializing in..."
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
                placeholder="I'm a software engineer with experience in..."
              />
            </div>
            
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
            
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-70"
              >
                {loading ? 'Creating Portfolio...' : 'Create Portfolio'}
              </button>
              <p className="mt-4 text-sm text-gray-400 text-center">
                You'll be able to add more details and customize your portfolio after creation.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 