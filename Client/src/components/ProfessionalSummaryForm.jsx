import React, { useState, useEffect } from 'react'
import { Sparkles } from 'lucide-react'

const ProfessionalSummaryForm = ({ initialData, onChange }) => {
  const [summary, setSummary] = useState('')
  const [isEnhancing, setIsEnhancing] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Load initial data only once when component mounts
  useEffect(() => {
    if (initialData && !isInitialized) {
      setSummary(initialData)
      setIsInitialized(true)
    }
  }, [initialData, isInitialized])

  const handleAIEnhance = async () => {
    if (!summary.trim()) {
      alert('Please write some text first to enhance!')
      return
    }

    setIsEnhancing(true)
    
    // Simulate AI enhancement (replace with actual API call)
    setTimeout(() => {
      const enhanced = `${summary}\n\n[AI Enhanced Version]`
      setSummary(enhanced)
      setIsEnhancing(false)
    }, 1500)
  }

  const handleSubmit = () => {
    // Send data to parent component when Save button is clicked
    if (onChange) {
      onChange(summary)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 w-full">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-1xl font-bold text-gray-900">Professional Summary</h2>
          <button
            type="button"
            onClick={handleAIEnhance}
            disabled={isEnhancing}
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles size={19} className={isEnhancing ? 'animate-spin' : ''} />
            {isEnhancing ? 'Enhancing...' : 'AI Enhance'}
          </button>
        </div>
        <p className="text-gray-600">Add summary for your resume here</p>
      </div>

      {/* Textarea */}
      <div className="mb-4">
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Write a compelling professional summary that highlights your key strengths and career objectives..."
          rows={8}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none text-gray-700"
        />
      </div>
      
      {/* Tip */}
      <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
        <p className="text-sm text-gray-600 text-center">
          <span className="font-semibold text-gray-700">Tip:</span> Keep it concise (3-4 sentences) and focus on your most relevant achievements and skills.
        </p>
      </div>

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

export default ProfessionalSummaryForm