import React, { useState, useEffect } from 'react'
import { Briefcase, Plus, Trash2, Sparkles } from 'lucide-react'

const ExperienceForm = ({ initialData, onChange }) => {
  const [experiences, setExperiences] = useState([])
  const [isInitialized, setIsInitialized] = useState(false)
  const MAX_EXPERIENCES = 10

  useEffect(() => {
    if (initialData && initialData.length > 0 && !isInitialized) {
      setExperiences(initialData)
      setIsInitialized(true)
    }
  }, [initialData, isInitialized])

  const addExperience = () => {
    if (experiences.length >= MAX_EXPERIENCES) {
      alert(`Maximum ${MAX_EXPERIENCES} experiences allowed!`)
      return
    }
    
    const newExperience = {
      id: Date.now(),
      company: '',
      jobTitle: '',
      startDate: '',
      endDate: '',
      currentlyWorking: false,
      description: ''
    }
    setExperiences([...experiences, newExperience])
  }

  const removeExperience = (id) => {
    setExperiences(experiences.filter(exp => exp.id !== id))
  }

  const updateExperience = (id, field, value) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ))
  }

  const handleEnhanceDescription = (id) => {
    const experience = experiences.find(exp => exp.id === id)
    if (!experience.description.trim()) {
      alert('Please write some description first!')
      return
    }
    
    // Simulate AI enhancement
    alert('AI Enhancement feature coming soon!')
  }

  // NEW: Validation function to check if experience is complete
  const isExperienceValid = (exp) => {
    const hasCompany = exp.company && exp.company.trim() !== ''
    const hasStartDate = exp.startDate && exp.startDate.trim() !== ''
    const hasEndDateOrCurrent = exp.currentlyWorking || (exp.endDate && exp.endDate.trim() !== '')
    
    return hasCompany && hasStartDate && hasEndDateOrCurrent
  }

  const handleSubmit = () => {
    // NEW: Filter only valid/complete experiences before sending to parent
    const validExperiences = experiences.filter(exp => isExperienceValid(exp))
    
    // Optional: Show a message if some experiences were filtered out
    const filteredCount = experiences.length - validExperiences.length
    if (filteredCount > 0) {
      alert(`${filteredCount} incomplete experience(s) will not appear in preview. Please fill Company, Start Date, and either End Date or check "Currently working here".`)
    }
    
    // Send only valid experiences to parent component
    if (onChange) {
      onChange(validExperiences)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 w-full">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-1xl font-bold text-gray-900">Professional Experience</h2>
          <p className="text-gray-600 text-sm mt-1">Add your job experience</p>
        </div>
        <button
          type="button"
          onClick={addExperience}
          disabled={experiences.length >= MAX_EXPERIENCES}
          className="inline-flex items-center gap-1 px-2 py-1 bg-purple-50 text-green-600 rounded-lg hover:bg-purple-100 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus size={18} />
          Add Experience
        </button>
      </div>

      {/* Content Area */}
      <div className="min-h-[400px]">
        {/* Empty State */}
        {experiences.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
            <Briefcase size={64} className="text-gray-300 mb-4" strokeWidth={1.5} />
            <p className="text-gray-600 font-medium mb-1">No work experience added yet.</p>
            <p className="text-gray-400 text-sm">Click "Add Experience" to get started.</p>
          </div>
        ) : (
          /* Experience List */
          <div className="space-y-6">
            {experiences.map((exp, index) => {
              // NEW: Check if this experience is valid
              const isValid = isExperienceValid(exp)
              
              return (
                <div key={exp.id} className={`border rounded-lg p-6 bg-white ${!isValid ? 'border-yellow-300 bg-yellow-50' : 'border-gray-200'}`}>
                  {/* Experience Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Experience #{index + 1}
                      </h3>
                      {/* NEW: Show warning badge if incomplete */}
                      {!isValid && (
                        <span className="px-2 py-1 text-xs font-medium bg-yellow-200 text-yellow-800 rounded">
                          Incomplete
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => removeExperience(exp.id)}
                      className="text-red-400 hover:text-red-600 transition-colors p-1"
                      title="Remove Experience"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-4">
                    {/* Company Name & Job Title Row */}
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                        placeholder="Company Name *"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-700 placeholder-gray-400"
                      />
                      <input
                        type="text"
                        value={exp.jobTitle}
                        onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)}
                        placeholder="Job Title"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-700 placeholder-gray-400"
                      />
                    </div>

                    {/* Start Date & End Date Row */}
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                        placeholder="Start Date *"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-600"
                      />
                      <input
                        type="month"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                        placeholder="End Date *"
                        disabled={exp.currentlyWorking}
                        className=" w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-600 disabled:bg-gray-100  disabled:text-gray-400 disabled:cursor-not-allowed"
                      />
                    </div>

                    {/* Currently Working Checkbox */}
                    <div className="flex items-center gap-2.5 ">
                      <input
                        type="checkbox"
                        id={`currently-working-${exp.id}`}
                        checked={exp.currentlyWorking}
                        onChange={(e) => {
                          updateExperience(exp.id, 'currentlyWorking', e.target.checked)
                          if (e.target.checked) {
                            updateExperience(exp.id, 'endDate', '')
                          }
                        }}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                      />
                      <label 
                        htmlFor={`currently-working-${exp.id}`}
                        className="text-sm text-gray-700 cursor-pointer select-none"
                      >
                        Currently working here
                      </label>
                    </div>

                    {/* Job Description */}
                    <div>
                      <div className=" flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700">
                          Job Description
                        </label>
                        <button
                          type="button"
                          onClick={() => handleEnhanceDescription(exp.id)}
                          className=" inline-flex items-center gap-1.5 px-3 py-1.5 text-sm bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors font-medium"
                        >
                          <Sparkles size={14} />
                          Enhance with AI
                        </button>
                      </div>
                      <textarea
                        value={exp.description}
                        onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                        placeholder="Describe your key responsibilities and achievements..."
                        rows={5}
                        className="text-justify w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-justify resize-none text-gray-700 placeholder-gray-400"
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Experience Counter */}
      {experiences.length > 0 && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            {experiences.length} of {MAX_EXPERIENCES} experiences added
            {experiences.filter(exp => isExperienceValid(exp)).length < experiences.length && (
              <span className="text-yellow-600 ml-2">
                ({experiences.filter(exp => isExperienceValid(exp)).length} complete)
              </span>
            )}
          </p>
        </div>
      )}

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={handleSubmit}
          className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 focus:ring-4 transition-all"
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default ExperienceForm