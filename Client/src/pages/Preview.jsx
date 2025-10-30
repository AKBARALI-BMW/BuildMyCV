import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, AlertCircle } from 'lucide-react'
import ResumePreview from '../components/Resumepreview'
import { dummyResumeData } from '../assets/assets'
import Loader from '../components/Loader'

const Preview = () => {
  const { resumeId } = useParams()
  const [resumeData, setResumeData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    // Debug: Log available resume IDs
    console.log('Looking for resume ID:', resumeId)
    console.log('Available resume IDs:', dummyResumeData.map(r => r._id))

    // Simulate loading delay
    const timer = setTimeout(() => {
      if (resumeId) {
        // Find the resume by ID
        const foundResume = dummyResumeData.find(resume => resume._id === resumeId)
        
        if (foundResume) {
          console.log('✅ Resume found!')
          setResumeData(foundResume)
          setNotFound(false)
        } else {
          console.log('❌ Resume not found')
          setNotFound(true)
        }
      } else {
        setNotFound(true)
      }
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [resumeId])

  // Show loader while loading
  if (loading) {
    return <Loader />
  }

  // Show "Resume not found" if ID doesn't exist
  if (notFound || !resumeData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mb-6">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-10 h-10 text-red-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Resume not found</h1>
              <p className="text-gray-600 mb-4">
                The resume you're looking for doesn't exist or has been removed.
              </p>
              
              {/* Debug Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <p className="text-sm font-medium text-gray-700 mb-2">Debug Info:</p>
                <p className="text-xs text-gray-600 mb-1">
                  <span className="font-semibold">Requested ID:</span> {resumeId || 'none'}
                </p>
                <p className="text-xs text-gray-600">
                  <span className="font-semibold">Available IDs:</span>
                </p>
                <div className="mt-2 space-y-1">
                  {dummyResumeData.map(resume => (
                    <div key={resume._id} className="text-xs text-gray-500 font-mono">
                      • {resume._id}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <Link 
              to="/app" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <ArrowLeft size={20} />
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Show the resume preview
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header with back button */}
        <div className="flex items-center justify-between mb-6">
          <Link 
            to="/app" 
            className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Dashboard</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              Public Resume
            </span>
          </div>
        </div>

        {/* Resume Preview */}
        <div className="bg-white rounded-lg shadow-lg">
          <ResumePreview 
            data={resumeData} 
            template={resumeData.template} 
            accentColor={resumeData.accent_color}
          />
        </div>
      </div>
    </div>
  )
}

export default Preview