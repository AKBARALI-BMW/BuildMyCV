import React, { useState, useEffect } from 'react'
import { GraduationCap, Plus, Trash2 } from 'lucide-react'

const EducationForm = ({ initialData, onChange }) => {
  const [educations, setEducations] = useState([])
  const [isInitialized, setIsInitialized] = useState(false)
  const MAX_EDUCATION = 10

  useEffect(() => {
    if (initialData && initialData.length > 0 && !isInitialized) {
      setEducations(initialData)
      setIsInitialized(true)
    }
  }, [initialData, isInitialized])

  const addEducation = () => {
    if (educations.length >= MAX_EDUCATION) {
      alert(`Maximum ${MAX_EDUCATION} education entries allowed!`)
      return
    }
    
    const newEducation = {
      id: Date.now(),
      institution: '',
      degree: '',
      fieldOfStudy: '',
      graduationDate: '',
      gpa: ''
    }
    setEducations([...educations, newEducation])
  }

  const removeEducation = (id) => {
    setEducations(educations.filter(edu => edu.id !== id))
  }

  const updateEducation = (id, field, value) => {
    setEducations(educations.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ))
  }

  const handleSubmit = () => {
    // Send data to parent component when Save button is clicked
    if (onChange) {
      onChange(educations)
    }
  }
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 w-full">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Education</h2>
          <p className="text-gray-600 text-sm mt-1">Add your education details</p>
        </div>
        <button
          type="button"
          onClick={addEducation}
          disabled={educations.length >= MAX_EDUCATION}
          className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-600 rounded-lg hover:bg-teal-100 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus size={18} />
          Add Education
        </button>
      </div>

      {/* Content Area */}
      <div className="min-h-[400px]">
        {/* Empty State */}
        {educations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
            <GraduationCap size={64} className="text-gray-300 mb-4" strokeWidth={1.5} />
            <p className="text-gray-600 font-medium mb-1">No education added yet.</p>
            <p className="text-gray-400 text-sm">Click "Add Education" to get started.</p>
          </div>
        ) : (
          /* Education List */
          <div className="space-y-6">
            {educations.map((edu, index) => (
              <div key={edu.id} className="border border-gray-200 rounded-lg p-6 bg-white">
                {/* Education Header */}
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Education #{index + 1}
                  </h3>
                  <button
                    type="button"
                    onClick={() => removeEducation(edu.id)}
                    className="text-red-400 hover:text-red-600 transition-colors p-1"
                    title="Remove Education"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  {/* Institution Name & Degree Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                      placeholder="Institution Name"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-700 placeholder-gray-400"
                    />
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                      placeholder="Degree (e.g., Bachelor's, Master's)"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-700 placeholder-gray-400"
                    />
                  </div>

                  {/* Field of Study & Graduation Date Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={edu.fieldOfStudy}
                      onChange={(e) => updateEducation(edu.id, 'fieldOfStudy', e.target.value)}
                      placeholder="Field of Study"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-700 placeholder-gray-400"
                    />
                    <input
                      type="month"
                      value={edu.graduationDate}
                      onChange={(e) => updateEducation(edu.id, 'graduationDate', e.target.value)}
                      placeholder="Graduation Date"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-600"
                    />
                  </div>

                  {/* GPA (Optional) */}
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={edu.gpa}
                      onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                      placeholder="GPA (optional)"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-700 placeholder-gray-400"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Education Counter */}
      {educations.length > 0 && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            {educations.length} of {MAX_EDUCATION} education entries added
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

export default EducationForm