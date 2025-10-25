import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import PersonalInfoForm from '../components/PersonalInfoForm'
import ResumePreview from '../components/Resumepreview'
import TemplateSelector from '../components/TemplateSelector'
import ColorPicker from '../components/ColorPicker'
import { dummyResumeData } from '../assets/assets'

const ResumeBuilder = () => {
  const { id } = useParams()
  const [currentStep, setCurrentStep] = useState('personal')
  const [resumeData, setResumeData] = useState({
    personal_info: null,
    professional_summary: '',
    skills: [],
    experience: [],
    education: [],
    project: [],
    template: 'minimal-image',
    accent_color: '#14B8A6'
  })

  // Load resume data when component mounts
  useEffect(() => {
    if (id) {
      const selectedResume = dummyResumeData.find(resume => resume._id === id)
      
      if (selectedResume) {
        setResumeData({
          personal_info: selectedResume.personal_info,
          professional_summary: selectedResume.professional_summary,
          skills: selectedResume.skills,
          experience: selectedResume.experience,
          education: selectedResume.education,
          project: selectedResume.project,
          template: selectedResume.template,
          accent_color: selectedResume.accent_color
        })
      }
    }
  }, [id])

  const handlePersonalInfoNext = (data) => {
    setResumeData(prev => ({
      ...prev,
      personal_info: {
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        location: data.location,
        profession: data.profession,
        linkedin: data.linkedin,
        website: data.portfolio,
        image: data.profileImage
      }
    }))
  }

  // Handle template change
  const handleTemplateChange = (templateId) => {
    setResumeData(prev => ({
      ...prev,
      template: templateId
    }))
  }

  // Handle color change
  const handleColorChange = (color) => {
    setResumeData(prev => ({
      ...prev,
      accent_color: color
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between mb-6">
        {/* Back to Dashboard Link */}
        <Link 
          to="/app" 
          className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Dashboard</span>
        </Link>

      </div>

      <div className="flex gap-6">
        {/* Left Panel - Form */}
        <div className="w-1/3 space-y-4">
          {/* Template & Accent Buttons */}
          <div className="flex gap-3">
            <TemplateSelector 
              selectedTemplate={resumeData.template}
              onChange={handleTemplateChange}
            />
            <ColorPicker 
              selectedColor={resumeData.accent_color}
              onChange={handleColorChange}
            />
          </div>

          {/* Personal Info Form */}
          {currentStep === 'personal' && (
            <PersonalInfoForm 
              onNext={handlePersonalInfoNext} 
              initialData={resumeData.personal_info}
            />
          )}
        </div>

        {/* Right Panel - Preview */}
        <div className="w-2/3">
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

export default ResumeBuilder