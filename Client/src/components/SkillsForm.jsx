import React, { useState, useEffect } from 'react'
import { Sparkles, X } from 'lucide-react'

const SkillsForm = ({ initialData, onChange }) => {
  const [skills, setSkills] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (initialData && initialData.length > 0 && !isInitialized) {
      setSkills(initialData)
      setIsInitialized(true)
    }
  }, [initialData, isInitialized])

  const addSkill = () => {
    if (!inputValue.trim()) {
      return
    }

    if (skills.includes(inputValue.trim())) {
      alert('This skill is already added!')
      return
    }

    setSkills([...skills, inputValue.trim()])
    setInputValue('')
  }

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addSkill()
    }
  }

  const handleSubmit = () => {
    // Send data to parent component when Save button is clicked
    if (onChange) {
      onChange(skills)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 w-full">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Skills</h2>
        <p className="text-gray-600 text-sm mt-1">Add your technical and soft skills</p>
      </div>

      {/* Input Area */}
      <div className="mb-6">
        <div className="flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter a skill (e.g., JavaScript, Project Management)"
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-gray-700 placeholder-gray-400"
          />
          <button
            type="button"
            onClick={addSkill}
            className="px-6 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Add
          </button>
        </div>
      </div>

      {/* Skills Display Area */}
      <div className="min-h-[300px] mb-6">
        {skills.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
            <Sparkles size={64} className="text-gray-300 mb-4" strokeWidth={1.5} />
            <p className="text-gray-600 font-medium mb-1">No skills added yet.</p>
            <p className="text-gray-400 text-sm">Add your technical and soft skills above.</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-green-700 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors group"
              >
                <span className="font-medium">{skill}</span>
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="text-blue-400 hover:text-blue-600 transition-colors"
                  title="Remove skill"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tip Box */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
        <p className="text-sm text-gray-700">
          <span className="font-semibold text-gray-900">Tip:</span> Add 8-12 relevant skills. Include both technical skills (programming languages, tools) and soft skills (leadership, communication).
        </p>
      </div>

      {/* Skills Counter */}
      {skills.length > 0 && (
        <div className="mb-4 text-center">
          <p className="text-sm text-gray-500">
            {skills.length} skill{skills.length !== 1 ? 's' : ''} added
          </p>
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end">
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

export default SkillsForm