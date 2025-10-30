import React, { useState, useEffect } from 'react'
import { User, Mail, Phone, MapPin, Briefcase, Linkedin, Globe } from 'lucide-react'

const PersonalInfoForm = ({ initialData, onChange }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    profession: '',
    linkedin: '',
    portfolio: ''
  })
  
  const [profileImage, setProfileImage] = useState(null)
  const [removeBackground, setRemoveBackground] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  // Load initial data only once when component mounts
  useEffect(() => {
    if (initialData && !isInitialized) {
      setFormData({
        fullName: initialData.full_name || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        location: initialData.location || '',
        profession: initialData.profession || '',
        linkedin: initialData.linkedin || '',
        portfolio: initialData.website || ''
      })
      
      if (initialData.image) {
        setProfileImage(initialData.image)
      }
      
      setIsInitialized(true)
    }
  }, [initialData, isInitialized])

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const imageData = reader.result
        setProfileImage(imageData)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    const updatedFormData = {
      ...formData,
      [name]: value
    }
    
    setFormData(updatedFormData)
  }

  const handleSubmit = () => {
    // Send data to parent component when Save button is clicked
    if (onChange) {
      onChange({
        ...formData,
        profileImage: profileImage
      })
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 w-full">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
      
      </div>

      {/* Profile Image Upload */}
      <div className="mb-8">
        <div className="flex items-center gap-6">
          <div className="relative">
            <label 
              htmlFor="profile-upload" 
              className="cursor-pointer block"
            >
              {profileImage ? (
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
                />
              ) : (
                <div className="w-20 h-20 rounded-full border-2 border-gray-300 flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors">
                  <User size={32} className="text-gray-400" />
                </div>
              )}
            </label>
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          <div className="flex">
            <label 
              htmlFor="profile-upload" 
              className="text-gray-700  inline font-medium cursor-pointer hover:text-gray-900 transition-colors"
            >
              <small className='flex'>
              Upload user image
              </small>
            </label>
          </div>

          {profileImage && (
            <div className="flex items-center gap-3">
              <span className="text-gray-700"><small className='flex inline'>Remove Background</small></span>
              <button
                type="button"
                onClick={() => setRemoveBackground(!removeBackground)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  removeBackground ? 'bg-green-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    removeBackground ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-200 mb-8" />

      {/* Form Fields */}
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label htmlFor="fullName" className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <User size={18} className="text-gray-400 mr-2" />
            Full Name <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Mail size={18} className="text-gray-400 mr-2" />
            Email Address <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="enter you email "
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Phone size={18} className="text-gray-400 mr-2" />
            Phone Number <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="+923568790805"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <MapPin size={18} className="text-gray-400 mr-2" />
            Location <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="Enter your Address"
          />
        </div>

        <div>
          <label htmlFor="profession" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Briefcase size={18} className="text-gray-400 mr-2" />
            Profession <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            id="profession"
            name="profession"
            value={formData.profession}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="Enter your profession"
          />
        </div>

        <div>
          <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Linkedin size={18} className="text-gray-400 mr-2" />
            LinkedIn Profile
          </label>
          <input
            type="url"
            id="linkedin"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="enter you linkedin account url"
          />
        </div>

        <div>
          <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
            <Globe size={18} className="text-gray-400 mr-2" />
            Portfolio Website
          </label>
          <input
            type="url"
            id="portfolio"
            name="portfolio"
            value={formData.portfolio}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            placeholder="Enter your protfolio url"
          />
        </div>
      </div>

      {/* Submit Button */}
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

export default PersonalInfoForm