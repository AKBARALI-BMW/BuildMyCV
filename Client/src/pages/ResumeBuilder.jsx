import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const ResumeBuilder = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Back to Dashboard Link */}
      <Link 
        to="/app" 
        className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors mb-6"
      >
        <ArrowLeft size={20} />
        <span className="font-medium">Back to Dashboard</span>
      </Link>
    </div>
  )
}

export default ResumeBuilder