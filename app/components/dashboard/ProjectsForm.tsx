'use client'

import { AwaitedReactNode, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { FiPlus, FiTrash, FiEdit, FiChevronDown, FiChevronUp, FiLink, FiGithub } from 'react-icons/fi'

export default function ProjectsForm({ portfolioData, username }: { portfolioData: { projects?: any[] }, username: string }) {
  const [projects, setProjects] = useState(portfolioData.projects || [])
  const [expandedIndex, setExpandedIndex] = useState(-1)
  const [editingIndex, setEditingIndex] = useState(-1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    live: '',
    github: '',
    featured: false,
    tech: [''],
    highlights: ['']
  })
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement  // Type assertion for checkbox
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }
  
  const handleHighlightChange = (index: number, value: string) => {
    setFormData(prev => {
      const newHighlights = [...prev.highlights]
      newHighlights[index] = value
      return { ...prev, highlights: newHighlights }
    })
  }
  
  const addHighlight = () => {
    setFormData(prev => ({
      ...prev,
      highlights: [...prev.highlights, '']
    }))
  }
  
  const removeHighlight = (index: number) => {
    setFormData(prev => {
      const newHighlights = [...prev.highlights]
      newHighlights.splice(index, 1)
      return { ...prev, highlights: newHighlights }
    })
  }
  
  const handleTechChange = (index: number, value: string) => {
    setFormData(prev => {
      const newTech = [...prev.tech]
      newTech[index] = value
      return { ...prev, tech: newTech }
    })
  }
  
  const addTech = () => {
    setFormData(prev => ({
      ...prev,
      tech: [...prev.tech, '']
    }))
  }
  
  const removeTech = (index: number) => {
    setFormData(prev => {
      const newTech = [...prev.tech]
      newTech.splice(index, 1)
      return { ...prev, tech: newTech }
    })
  }
  
  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? -1 : index)
  }
  
  const startEditing = (index: number) => {
    setEditingIndex(index)
    setFormData(projects[index])
  }
  
  const resetForm = () => {
    setEditingIndex(-1)
    setFormData({
      name: '',
      description: '',
      image: '',
      live: '',
      github: '',
      featured: false,
      tech: [''],
      highlights: ['']
    })
  }
  
  const deleteProject = async (index: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return
    
    setLoading(true)
    setError('')
    
    try {
      const updatedProjects = [...projects]
      updatedProjects.splice(index, 1)
      
      // Get the current portfolio data
      const { data, error: fetchError } = await supabase
        .from('portfolios')
        .select('portfolio_data')
        .eq('username', username)
        .single()
      
      if (fetchError) throw fetchError
      
      // Update the projects section
      const updatedPortfolioData = {
        ...data.portfolio_data,
        projects: updatedProjects
      }
      
      // Update the database
      const { error: updateError } = await supabase
        .from('portfolios')
        .update({ portfolio_data: updatedPortfolioData })
        .eq('username', username)
      
      if (updateError) throw updateError
      
      setProjects(updatedProjects)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      console.error('Error deleting project:', err)
      setError('Failed to delete project')
    } finally {
      setLoading(false)
    }
  }
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)
    
    try {
      // Filter out empty highlights and tech
      const highlights = formData.highlights.filter(h => h.trim() !== '')
      const tech = formData.tech.filter(t => t.trim() !== '')
      
      const projectData = {
        ...formData,
        highlights,
        tech
      }
      
      let updatedProjects = [...projects]
      
      if (editingIndex >= 0) {
        // Update existing project
        updatedProjects[editingIndex] = projectData
      } else {
        // Add new project
        updatedProjects = [...projects, projectData]
      }
      
      // Get the current portfolio data
      const { data, error: fetchError } = await supabase
        .from('portfolios')
        .select('portfolio_data')
        .eq('username', username)
        .single()
      
      if (fetchError) throw fetchError
      
      // Update the projects section
      const updatedPortfolioData = {
        ...data.portfolio_data,
        projects: updatedProjects
      }
      
      // Update the database
      const { error: updateError } = await supabase
        .from('portfolios')
        .update({ portfolio_data: updatedPortfolioData })
        .eq('username', username)
      
      if (updateError) throw updateError
      
      setProjects(updatedProjects)
      resetForm()
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      console.error('Error updating projects:', err)
      setError('Failed to update projects')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Projects</h2>
      
      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400">
          Projects updated successfully!
        </div>
      )}
      
      {/* List of existing projects */}
      {projects.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-medium mb-4">Your Projects</h3>
          
          <div className="space-y-4">
            {projects.map((project, index) => (
              <div key={index} className="bg-gray-800/50 rounded-lg border border-gray-700 overflow-hidden">
                <div 
                  className="flex justify-between items-center p-4 cursor-pointer"
                  onClick={() => toggleExpand(index)}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      {project.featured && (
                        <span className="text-yellow-400 text-xs font-bold">★</span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{project.name}</h4>
                      <p className="text-sm text-gray-400 line-clamp-1">{project.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        startEditing(index)
                      }}
                      className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <FiEdit />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteProject(index)
                      }}
                      className="p-2 text-red-400 hover:text-red-300 transition-colors"
                    >
                      <FiTrash />
                    </button>
                    {expandedIndex === index ? <FiChevronUp /> : <FiChevronDown />}
                  </div>
                </div>
                
                {expandedIndex === index && (
                  <div className="p-4 border-t border-gray-700 bg-gray-800/30">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h5 className="text-sm font-medium text-gray-300 mb-1">Image URL</h5>
                        <p className="text-sm text-gray-400">{project.image || 'No image URL'}</p>
                      </div>
                      
                      <div className="flex gap-4">
                        {project.github && (
                          <div>
                            <h5 className="text-sm font-medium text-gray-300 mb-1">GitHub</h5>
                            <a 
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
                            >
                              <FiGithub /> Repository
                            </a>
                          </div>
                        )}
                        
                        {project.live && (
                          <div>
                            <h5 className="text-sm font-medium text-gray-300 mb-1">Live Demo</h5>
                            <a 
                              href={project.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
                            >
                              <FiLink /> View Demo
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h5 className="text-sm font-medium text-gray-300 mb-1">Technologies</h5>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech: string, techIndex: number) => (
                          <span 
                            key={techIndex}
                            className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium text-gray-300 mb-1">Highlights</h5>
                      <ul className="list-disc list-inside text-sm text-gray-300">
                        {project.highlights.map((highlight: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined, hIndex: Key | null | undefined) => (
                          <li key={hIndex}>{highlight}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Add/Edit Project Form */}
      <form onSubmit={handleSubmit} className="bg-gray-800/50 rounded-lg border border-gray-700 p-6">
        <h3 className="text-xl font-medium mb-4">
          {editingIndex >= 0 ? 'Edit Project' : 'Add New Project'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-300 mb-2">Project Name</label>
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
            <label className="block text-gray-300 mb-2">Image URL</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={3}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-300 mb-2">GitHub URL</label>
            <input
              type="url"
              name="github"
              value={formData.github}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="https://github.com/username/repo"
            />
          </div>
          
          <div>
            <label className="block text-gray-300 mb-2">Live Demo URL</label>
            <input
              type="url"
              name="live"
              value={formData.live}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="https://example.com"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label className="flex items-center gap-2 text-gray-300">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              className="w-4 h-4 rounded border-gray-700 text-purple-500 focus:ring-purple-500"
            />
            Featured Project (will be highlighted in your portfolio)
          </label>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Technologies</label>
          {formData.tech.map((tech, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={tech}
                onChange={(e) => handleTechChange(index, e.target.value)}
                className="flex-1 p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Technology name (e.g., React, Node.js)"
              />
              <button
                type="button"
                onClick={() => removeTech(index)}
                className="p-3 text-red-400 hover:text-red-300 transition-colors"
                disabled={formData.tech.length <= 1}
              >
                <FiTrash />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addTech}
            className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1"
          >
            <FiPlus /> Add Technology
          </button>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Highlights</label>
          {formData.highlights.map((highlight, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                value={highlight}
                onChange={(e) => handleHighlightChange(index, e.target.value)}
                className="flex-1 p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Project highlight or key feature"
              />
              <button
                type="button"
                onClick={() => removeHighlight(index)}
                className="p-3 text-red-400 hover:text-red-300 transition-colors"
                disabled={formData.highlights.length <= 1}
              >
                <FiTrash />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addHighlight}
            className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1"
          >
            <FiPlus /> Add Highlight
          </button>
        </div>
        
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-70"
          >
            {loading ? 'Saving...' : (editingIndex >= 0 ? 'Update Project' : 'Add Project')}
          </button>
          
          {editingIndex >= 0 && (
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-3 bg-gray-700 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
} 