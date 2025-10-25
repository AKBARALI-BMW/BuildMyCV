import React, { useState, useEffect } from 'react'
import { User, Mail, Phone, MapPin, Briefcase, Linkedin, Globe } from 'lucide-react'

const PersonalInfoForm = ({ onNext, initialData }) => {
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

  // Load initial data when component mounts or initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData({
        fullName: initialData.full_name || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        location: initialData.location || '',
        profession: initialData.profession || '',
        linkedin: initialData.linkedin || '',
        portfolio: initialData.website || ''
      })
      
      // Set profile image if it exists
      if (initialData.image) {
        setProfileImage(initialData.image)
      }
    }
  }, [initialData])

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Pass data to parent component
    onNext({ ...formData, profileImage, removeBackground })
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 w-full">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Information</h2>
        <p className="text-gray-600">Get Started with the personal information</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Profile Image Upload */}
        <div className="mb-8">
          <div className="flex items-center gap-6">
            {/* Image Preview */}
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

            {/* Upload Text */}
            <div className="flex-1">
              <label 
                htmlFor="profile-upload" 
                className="text-gray-700 font-medium cursor-pointer hover:text-gray-900 transition-colors"
              >
                upload user image
              </label>
            </div>

            {/* Remove Background Toggle */}
            {profileImage && (
              <div className="flex items-center gap-3">
                <span className="text-gray-700 font-medium">Remove Background</span>
                <button
                  type="button"
                  onClick={() => setRemoveBackground(!removeBackground)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    removeBackground ? 'bg-blue-600' : 'bg-gray-300'
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
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2 flex">
              <User size={18} className="text-gray-400 mr-2" />
             Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="John Doe"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 flex">
              <Mail size={18} className="text-gray-400 mr-2" />
             Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="john@example.com"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2 flex">
              <Phone size={18} className="text-gray-400 mr-2" />
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="+1 (555) 000-0000"
            />
          </div>

          {/* Location */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2 flex">
               <MapPin size={18} className="text-gray-400 mr-2" /> Location *
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="New York, NY"
            />
          </div>

          {/* Profession */}
          <div>
            <label htmlFor="profession" className="block text-sm font-medium text-gray-700 mb-2 flex">
              <Briefcase size={18} className="text-gray-400 mr-2" />
              Profession *
            </label>
            <input
              type="text"
              id="profession"
              name="profession"
              value={formData.profession}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Software Engineer"
            />
          </div>

          {/* LinkedIn */}
          <div>
            <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-2 flex ">
              <Linkedin size={18} className="text-gray-400 mr-2"  /> LinkedIn Profile
            </label>
            <input
              type="url"
              id="linkedin"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="linkedin.com/in/johndoe"
            />
          </div>

          {/* Portfolio */}
          <div>
            <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 mb-2 flex">
                  <Globe size={19} className="text-gray-400 mr-2" /> Portfolio Website
            </label>
            <input
              type="url"
              id="portfolio"
              name="portfolio"
              value={formData.portfolio}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="www.johndoe.com"
            />
          </div>
        </div>

        {/* Next Button */}
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:ring-4 focus:ring-blue-200"
          >
            Next →
          </button>
        </div>
      </form>
    </div>
  )
}

export default PersonalInfoForm