import React from 'react'

const Loader = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        {/* Spinning loader */}
        <div className="relative w-20 h-20 mx-auto mb-4">
          <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-green-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
        
        {/* Loading text */}
        <p className="text-gray-600 font-medium">Loading resume...</p>
      </div>
    </div>
  )
}

export default Loader