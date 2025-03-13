'use client'

import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { FiPlus, FiTrash, FiEdit } from 'react-icons/fi'

export default function SkillsForm({ portfolioData, username }) {
  const [skills, setSkills] = useState(portfolioData.skills || {})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  
  // For adding new categories
  const [newCategory, setNewCategory] = useState('')
  const [newTech, setNewTech] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(Object.keys(portfolioData.skills || {})[0] || '')
  
  const addCategory = () => {
    if (!newCategory.trim()) return
    
    // Check if category already exists
    if (skills[newCategory]) {
      setError(`Category "${newCategory}" already exists`)
      setTimeout(() => setError(''), 3000)
      return
    }
    
    setSkills(prev => ({
      ...prev,
      [newCategory]: []
    }))
    
    setSelectedCategory(newCategory)
    setNewCategory('')
  }
  
  const deleteCategory = (category) => {
    if (!confirm(`Are you sure you want to delete the "${category}" category and all its skills?`)) return
    
    setSkills(prev => {
      const newSkills = { ...prev }
      delete newSkills[category]
      return newSkills
    })
    
    if (selectedCategory === category) {
      setSelectedCategory(Object.keys(skills).filter(k => k !== category)[0] || '')
    }
  }
  
  const addTech = () => {
    if (!newTech.trim() || !selectedCategory) return
    
    // Check if tech already exists in this category
    if (skills[selectedCategory].includes(newTech)) {
      setError(`"${newTech}" already exists in ${selectedCategory}`)
      setTimeout(() => setError(''), 3000)
      return
    }
    
    setSkills(prev => ({
      ...prev,
      [selectedCategory]: [...prev[selectedCategory], newTech]
    }))
    
    setNewTech('')
  }
  
  const removeTech = (category, techIndex) => {
    setSkills(prev => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== techIndex)
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
      
      // Update the skills section
      const updatedPortfolioData = {
        ...data.portfolio_data,
        skills: skills
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
      console.error('Error updating skills:', err)
      setError('Failed to update skills')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Skills & Technologies</h2>
      
      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400">
          Skills updated successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Categories List */}
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <h3 className="text-lg font-medium mb-4">Skill Categories</h3>
            
            <div className="space-y-2 mb-4 max-h-[300px] overflow-y-auto">
              {Object.keys(skills).map(category => (
                <div 
                  key={category}
                  className={`flex justify-between items-center p-2 rounded-lg ${
                    selectedCategory === category ? 'bg-purple-500/20 border border-purple-500/30' : 'hover:bg-gray-700/50'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className="text-left flex-1"
                  >
                    {category} <span className="text-gray-400 text-sm">({skills[category].length})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteCategory(category)}
                    className="text-red-400 hover:text-red-300 p-1"
                  >
                    <FiTrash size={16} />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="flex-1 p-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="New category"
              />
              <button
                type="button"
                onClick={addCategory}
                disabled={!newCategory.trim()}
                className="p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50"
              >
                <FiPlus size={20} />
              </button>
            </div>
          </div>
          
          {/* Technologies in Selected Category */}
          <div className="md:col-span-2 bg-gray-800/50 p-4 rounded-lg border border-gray-700">
            <h3 className="text-lg font-medium mb-4">
              {selectedCategory ? `Technologies in "${selectedCategory}"` : 'Select a category'}
            </h3>
            
            {selectedCategory ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-4 max-h-[300px] overflow-y-auto">
                  {skills[selectedCategory].map((tech, index) => (
                    <div 
                      key={index}
                      className="flex justify-between items-center p-2 bg-gray-700/30 rounded-lg"
                    >
                      <span className="truncate">{tech}</span>
                      <button
                        type="button"
                        onClick={() => removeTech(selectedCategory, index)}
                        className="text-red-400 hover:text-red-300 ml-2"
                      >
                        <FiTrash size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTech}
                    onChange={(e) => setNewTech(e.target.value)}
                    className="flex-1 p-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="New technology"
                  />
                  <button
                    type="button"
                    onClick={addTech}
                    disabled={!newTech.trim()}
                    className="p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50"
                  >
                    <FiPlus size={20} />
                  </button>
                </div>
              </>
            ) : (
              <div className="text-gray-400 text-center py-8">
                Select a category or create a new one to add technologies
              </div>
            )}
          </div>
        </div>
        
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading || Object.keys(skills).length === 0}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 disabled:opacity-70"
          >
            {loading ? 'Saving...' : 'Save Skills'}
          </button>
        </div>
      </form>
      
      <div className="mt-8 p-4 bg-gray-800/30 rounded-lg border border-gray-700">
        <h3 className="text-lg font-medium mb-2">Tips</h3>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li>Group your skills into meaningful categories (e.g., Frontend, Backend, DevOps)</li>
          <li>Be specific with technology names to ensure proper logo display</li>
          <li>Include programming languages, frameworks, tools, and platforms</li>
          <li>List skills in order of proficiency (most proficient first)</li>
        </ul>
      </div>
    </div>
  )
} 