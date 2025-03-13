'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { FiPlus, FiTrash, FiEdit, FiChevronDown, FiChevronUp } from 'react-icons/fi'

interface Project {
  name: string;
  description: string;
  highlights: string[];
  tech: string[];
}

export default function ExperienceForm({ portfolioData, username }: { portfolioData: any, username: string }) {
  const [experiences, setExperiences] = useState(portfolioData.experience || [])
  const [expandedIndex, setExpandedIndex] = useState(-1)
  const [editingIndex, setEditingIndex] = useState(-1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  
  const [formData, setFormData] = useState<{
    title: string;
    company: string;
    location: string;
    period: string;
    type: string;
    description: string;
    projects: Project[];
  }>({
    title: '',
    company: '',
    location: '',
    period: '',
    type: '',
    description: '',
    projects: []
  })
  
  const [projectFormData, setProjectFormData] = useState({
    name: '',
    description: '',
    highlights: [''],
    tech: ['']
  })
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  const handleProjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProjectFormData(prev => ({ ...prev, [name]: value }))
  }
  const handleHighlightChange = (index: number, value: string) => {
    setProjectFormData(prev => {
      const newHighlights = [...prev.highlights]
      newHighlights[index] = value
      return { ...prev, highlights: newHighlights }
    })
  }
  
  const addHighlight = () => {
    setProjectFormData(prev => ({
      ...prev,
      highlights: [...prev.highlights, '']
    }))
  }
  
  const removeHighlight = (index: number) => {
    setProjectFormData(prev => {
      const newHighlights = [...prev.highlights]
      newHighlights.splice(index, 1)
      return { ...prev, highlights: newHighlights }
    })
  }
  
  const handleTechChange = (index: number, value: string) => {
    setProjectFormData(prev => {
      const newTech = [...prev.tech]
      newTech[index] = value
      return { ...prev, tech: newTech }
    })
  }
  
  const addTech = () => {
    setProjectFormData(prev => ({
      ...prev,
      tech: [...prev.tech, '']
    }))
  }
  
  const removeTech = (index: number) => {
    setProjectFormData(prev => {
      const newTech = [...prev.tech]
      newTech.splice(index, 1)
      return { ...prev, tech: newTech }
    })
  }
  
  const addProject = () => {
    // Filter out empty highlights and tech
    const highlights = projectFormData.highlights.filter(h => h.trim() !== '')
    const tech = projectFormData.tech.filter(t => t.trim() !== '')
    
    const newProject = {
      name: projectFormData.name,
      description: projectFormData.description,
      highlights,
      tech
    }
    
    setFormData(prev => {
      const updatedProjects = [...prev.projects, newProject]
      return {
        ...prev,
        projects: updatedProjects
      }
    })
    
    // Reset project form
    setProjectFormData({
      name: '',
      description: '',
      highlights: [''],
      tech: ['']
    })
  }
  
  const removeProject = (index: number) => {
    setFormData(prev => {
      const newProjects = [...prev.projects]
      newProjects.splice(index, 1)
      return { ...prev, projects: newProjects }
    })
  }
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)
    
    try {
      let updatedExperiences = [...experiences]
      
      if (editingIndex >= 0) {
        // Update existing experience
        updatedExperiences[editingIndex] = formData
      } else {
        // Add new experience
        updatedExperiences = [...experiences, formData]
      }
      
      // Get the current portfolio data
      const { data, error: fetchError } = await supabase
        .from('portfolios')
        .select('portfolio_data')
        .eq('username', username)
        .single()
      
      if (fetchError) throw fetchError
      
      // Update the experience section
      const updatedPortfolioData = {
        ...data.portfolio_data,
        experience: updatedExperiences
      }
      
      // Update the database
      const { error: updateError } = await supabase
        .from('portfolios')
        .update({ portfolio_data: updatedPortfolioData })
        .eq('username', username)
      
      if (updateError) throw updateError
      
      setExperiences(updatedExperiences)
      setSuccess(true)
      resetForm()
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      console.error('Error updating experience:', err)
      setError('Failed to update experience information')
    } finally {
      setLoading(false)
    }
  }
  
  const editExperience = (index:number) => {
    setEditingIndex(index)
    setFormData(experiences[index])
  }
  
  const deleteExperience = async (index:number) => {
    if (!confirm('Are you sure you want to delete this experience?')) return
    
    setLoading(true)
    setError('')
    
    try {
      const updatedExperiences = [...experiences]
      updatedExperiences.splice(index, 1)
      
      // Get the current portfolio data
      const { data, error: fetchError } = await supabase
        .from('portfolios')
        .select('portfolio_data')
        .eq('username', username)
        .single()
      
      if (fetchError) throw fetchError
      
      // Update the experience section
      const updatedPortfolioData = {
        ...data.portfolio_data,
        experience: updatedExperiences
      }
      
      // Update the database
      const { error: updateError } = await supabase
        .from('portfolios')
        .update({ portfolio_data: updatedPortfolioData })
        .eq('username', username)
      
      if (updateError) throw updateError
      
      setExperiences(updatedExperiences)
    } catch (err) {
      console.error('Error deleting experience:', err)
      setError('Failed to delete experience')
    } finally {
      setLoading(false)
    }
  }
  
  const resetForm = () => {
    setFormData({
      title: '',
      company: '',
      location: '',
      period: '',
      type: '',
      description: '',
      projects: []
    })
    setEditingIndex(-1)
  }
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Work Experience</h2>
      
      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400">
          Experience information updated successfully!
        </div>
      )}
      
      {/* List of existing experiences */}
      <div className="mb-8 space-y-4">
        {experiences.length === 0 ? (
          <p className="text-gray-400 italic">No work experience added yet.</p>
        ) : (
          experiences.map((exp:any, index:number) => (
            <div key={index} className="bg-gray-800/50 rounded-lg border border-gray-700">
              <div className="p-4 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium text-white">{exp.title}</h3>
                  <p className="text-purple-400">{exp.company}</p>
                  <p className="text-sm text-gray-400">{exp.period} • {exp.location}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setExpandedIndex(expandedIndex === index ? -1 : index)}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    {expandedIndex === index ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                  <button
                    type="button"
                    onClick={() => editExperience(index)}
                    className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <FiEdit />
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteExperience(index)}
                    className="p-2 text-red-400 hover:text-red-300 transition-colors"
                  >
                    <FiTrash />
                  </button>
                </div>
              </div>
              
              {expandedIndex === index && (
                <div className="px-4 pb-4 border-t border-gray-700 pt-3">
                  <p className="text-gray-300 mb-3">{exp.description}</p>
                  
                  {exp.projects && exp.projects.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-md font-medium text-purple-400 mb-2">Projects</h4>
                      <div className="space-y-3">
                        {exp.projects.map((project:any, pIndex:number) => (
                          <div key={pIndex} className="bg-gray-800/80 p-3 rounded-lg">
                            <h5 className="font-medium text-white">{project.name}</h5>
                            <p className="text-sm text-gray-300 mb-2">{project.description}</p>
                            
                            {project.highlights && project.highlights.length > 0 && (
                              <div className="mb-2">
                                <h6 className="text-xs font-medium text-gray-400 mb-1">Highlights:</h6>
                                <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                                  {project.highlights.map((highlight:any, hIndex:number) => (
                                    <li key={hIndex}>{highlight}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            {project.tech && project.tech.length > 0 && (
                              <div>
                                <h6 className="text-xs font-medium text-gray-400 mb-1">Technologies:</h6>
                                <div className="flex flex-wrap gap-1">
                                  {project.tech.map((tech:any, tIndex:number) => (
                                    <span key={tIndex} className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">
                                      {tech}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
      
      {/* Experience Form */}
      <form onSubmit={handleSubmit} className="bg-gray-800/30 border border-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-medium mb-4">
          {editingIndex >= 0 ? 'Edit Experience' : 'Add New Experience'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-gray-300 mb-2">Job Title</label>
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
          
          <div>
            <label className="block text-gray-300 mb-2">Company</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Acme Inc."
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-gray-300 mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="San Francisco, CA"
            />
          </div>
          
          <div>
            <label className="block text-gray-300 mb-2">Period</label>
            <input
              type="text"
              name="period"
              value={formData.period}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Jan 2020 - Present"
            />
          </div>
          
          <div>
            <label className="block text-gray-300 mb-2">Employment Type</label>
            <input
              type="text"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Full-time"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Describe your responsibilities and achievements..."
          />
        </div>
        
        {/* Projects Section */}
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-3">Projects</h4>
          
          {formData.projects && formData.projects.length > 0 && (
            <div className="space-y-4 mb-6">
              {formData.projects.map((project, index) => (
                <div key={index} className="bg-gray-800/80 p-4 rounded-lg relative">
                  <button
                    type="button"
                    onClick={() => removeProject(index)}
                    className="absolute top-2 right-2 text-red-400 hover:text-red-300"
                  >
                    <FiTrash />
                  </button>
                  
                  <h5 className="font-medium text-white mb-1">{project.name}</h5>
                  <p className="text-sm text-gray-300 mb-2">{project.description}</p>
                  
                  <div className="mb-2">
                    <h6 className="text-xs font-medium text-gray-400 mb-1">Highlights:</h6>
                    <ul className="list-disc list-inside text-sm text-gray-300">
                      {project.highlights.map((highlight, hIndex) => (
                        <li key={hIndex}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h6 className="text-xs font-medium text-gray-400 mb-1">Technologies:</h6>
                    <div className="flex flex-wrap gap-1">
                      {project.tech.map((tech, tIndex) => (
                        <span key={tIndex} className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Add Project Form */}
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <h5 className="font-medium text-white mb-3">Add Project</h5>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-300 mb-2 text-sm">Project Name</label>
                <input
                  type="text"
                  name="name"
                  value={projectFormData.name}
                  onChange={handleProjectChange}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  placeholder="Project Name"
                />
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2 text-sm">Description</label>
                <input
                  type="text"
                  name="description"
                  value={projectFormData.description}
                  onChange={handleProjectChange}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                  placeholder="Brief description"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-300 mb-2 text-sm">Highlights</label>
              {projectFormData.highlights.map((highlight, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={highlight}
                    onChange={(e) => handleHighlightChange(index, e.target.value)}
                    className="flex-1 p-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    placeholder="Project highlight"
                  />
                  <button
                    type="button"
                    onClick={() => removeHighlight(index)}
                    className="p-2 text-red-400 hover:text-red-300 transition-colors"
                    disabled={projectFormData.highlights.length <= 1}
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
            
            <div className="mb-4">
              <label className="block text-gray-300 mb-2 text-sm">Technologies</label>
              {projectFormData.tech.map((tech, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tech}
                    onChange={(e) => handleTechChange(index, e.target.value)}
                    className="flex-1 p-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    placeholder="Technology name"
                  />
                  <button
                    type="button"
                    onClick={() => removeTech(index)}
                    className="p-2 text-red-400 hover:text-red-300 transition-colors"
                    disabled={projectFormData.tech.length <= 1}
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
            
            <button
              type="button"
              onClick={addProject}
              disabled={!projectFormData.name || !projectFormData.description}
              className="px-4 py-2 bg-purple-500/30 text-purple-300 rounded-lg hover:bg-purple-500/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Project
            </button>
          </div>
        </div>
        
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-70"
          >
            {loading ? 'Saving...' : (editingIndex >= 0 ? 'Update Experience' : 'Add Experience')}
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