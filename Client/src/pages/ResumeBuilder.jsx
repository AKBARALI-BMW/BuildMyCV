import React, { useState, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ChevronLeft, ChevronRight, Edit, Download, Share2, Eye, EyeOff, X, Check } from 'lucide-react'
import PersonalInfoForm from '../components/PersonalinfoForm'
import ProfessionalSummaryForm from '../components/ProfessionalSummaryForm'
import ExperienceForm from '../components/ExperienceForm'
import EducationForm from '../components/EducationForm'
import SkillsForm from '../components/SkillsForm'
import ProjectsForm from '../components/ProjectsForm'
import ResumePreview from '../components/Resumepreview'
import TemplateSelector from '../components/TemplateSelector'
import ColorPicker from '../components/ColorPicker'
import ProgressBar from '../components/ProgressBar'
import { dummyResumeData } from '../assets/assets'

const ResumeBuilder = () => {
  const { resumeId } = useParams()  // Changed from 'id' to 'resumeId' to match route
  const [currentStep, setCurrentStep] = useState('personal')
  const [showPreview, setShowPreview] = useState(false)
  
  // New states for Share/Public/Download functionality
  const [isPublic, setIsPublic] = useState(true)
  const [showShareModal, setShowShareModal] = useState(false)
  const [copied, setCopied] = useState(false)
  
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

  // Temporary storage for form data
  const tempPersonalData = useRef(null)
  const tempSummaryData = useRef(null)
  const tempExperienceData = useRef(null)
  const tempEducationData = useRef(null)
  const tempSkillsData = useRef(null)
  const tempProjectsData = useRef(null)

  // FIXED: Generate shareable URL with correct path
  const shareUrl = `${window.location.origin}/app/view/${resumeId || 'new'}`

  // Load resume data when component mounts
  useEffect(() => {
    if (resumeId) {
      const selectedResume = dummyResumeData.find(resume => resume._id === resumeId)
      
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
  }, [resumeId])

  // Handle Download - Triggers print dialog for PDF download
  const handleDownload = () => {
    const resumeElement = document.getElementById('resume-preview')
    
    if (resumeElement) {
      window.print()
    } else {
      alert('Resume preview not found!')
    }
  }

  // Toggle Public/Private
  const handleTogglePublic = () => {
    setIsPublic(!isPublic)
  }

  // Handle Share - Opens share modal
  const handleShare = () => {
    setShowShareModal(true)
  }

  // Copy URL to clipboard
  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (_err) {
      alert('Failed to copy URL')
    }
  }

  // Handle Personal Info Save button click
  const handlePersonalInfoChange = (data) => {
    tempPersonalData.current = data
    
    // Update resumeData immediately when Save is clicked
    setResumeData(prev => ({
      ...prev,
      personal_info: {
        full_name: data.fullName || '',
        email: data.email || '',
        phone: data.phone || '',
        location: data.location || '',
        profession: data.profession || '',
        linkedin: data.linkedin || '',
        website: data.portfolio || '',
        image: data.profileImage || null
      }
    }))
    
    // Show preview
    setShowPreview(true)
  }

  // Handle Professional Summary Save
  const handleSummaryChange = (summaryText) => {
    tempSummaryData.current = summaryText
    
    setResumeData(prev => ({
      ...prev,
      professional_summary: summaryText
    }))
    
    setShowPreview(true)
  }

  const handleExperienceChange = (experienceData) => {
    tempExperienceData.current = experienceData
    
    setResumeData(prev => ({
      ...prev,
      experience: experienceData
    }))
    
    setShowPreview(true)
  }

  const handleEducationChange = (educationData) => {
    tempEducationData.current = educationData
    
    setResumeData(prev => ({
      ...prev,
      education: educationData
    }))
    
    setShowPreview(true)
  }

  const handleSkillsChange = (skillsData) => {
    tempSkillsData.current = skillsData
    
    setResumeData(prev => ({
      ...prev,
      skills: skillsData
    }))
    
    setShowPreview(true)
  }

  const handleProjectsChange = (projectsData) => {
    tempProjectsData.current = projectsData
    
    setResumeData(prev => ({
      ...prev,
      project: projectsData
    }))
    
    setShowPreview(true)
  }

  // Template & Color Handlers
  const handleTemplateChange = (templateId) => {
    setResumeData(prev => ({
      ...prev,
      template: templateId
    }))
  }

  const handleColorChange = (color) => {
    setResumeData(prev => ({
      ...prev,
      accent_color: color
    }))
  }

  // Navigation - Previous button
  const handlePrevious = () => {
    const steps = ['personal', 'summary', 'experience', 'education', 'skills', 'projects']
    const currentIndex = steps.indexOf(currentStep)
    
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1])
      setShowPreview(false)
    }
  }

  // Navigation - Next button
  const handleNext = () => {
    const steps = ['personal', 'summary', 'experience', 'education', 'skills', 'projects']
    const currentIndex = steps.indexOf(currentStep)
    
    // Move to next step
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1])
      setShowPreview(false)
    }
  }

  // Back to Form from Preview
  const handleBackToForm = () => {
    setShowPreview(false)
  }

  // Determine if Previous/Next buttons should be shown
  const showPrevious = currentStep !== 'personal'
  const showNext = currentStep !== 'projects'

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between mb-6">
        <Link 
          to="/app" 
          className="inline-flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Dashboard</span>
        </Link>
      </div>

      <div className="flex gap-4">
        {/* Left Panel - Form or Preview */}
        <div className="w-1/3 space-y-3">
          {/* Template & Accent Buttons */}
          <div className="flex gap-0 mr-8">
            <TemplateSelector 
              selectedTemplate={resumeData.template}
              onChange={handleTemplateChange}
            />
            
            <ColorPicker 
              selectedColor={resumeData.accent_color}
              onChange={handleColorChange}
            />
          </div>

          {/* Progress Bar */}
          <ProgressBar currentStep={currentStep} />

          {/* Navigation Buttons */}
          {!showPreview && (
            <div className="rounded-lg">
              <div className="flex items-center justify-between">
                {showPrevious ? (
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium"
                  >
                    <ChevronLeft size={18} />
                    Previous
                  </button>
                ) : (
                  <div></div>
                )}
                
                {showNext && (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium ml-auto"
                  >
                    Next
                    <ChevronRight size={18} />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Show Form or Preview Message */}
          {!showPreview ? (
            <>
              {/* Personal Info Form */}
              {currentStep === 'personal' && (
                <PersonalInfoForm 
                  onChange={handlePersonalInfoChange}
                  initialData={resumeData.personal_info}
                />
              )}

              {/* Professional Summary Form */}
              {currentStep === 'summary' && (
                <ProfessionalSummaryForm 
                  onChange={handleSummaryChange}
                  initialData={resumeData.professional_summary}
                />
              )}

              {/* Experience Form */}
              {currentStep === 'experience' && (
                <ExperienceForm 
                  onChange={handleExperienceChange}
                  initialData={resumeData.experience}
                />
              )}

              {/* Education Form */}
              {currentStep === 'education' && (
                <EducationForm 
                  onChange={handleEducationChange}
                  initialData={resumeData.education}
                />
              )}

              {/* Skills Form */}
              {currentStep === 'skills' && (
                <SkillsForm 
                  onChange={handleSkillsChange}
                  initialData={resumeData.skills}
                />
              )}

              {/* Projects Form */}
              {currentStep === 'projects' && (
                <ProjectsForm 
                  onChange={handleProjectsChange}
                  initialData={resumeData.project}
                />
              )}
            </>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              <div className="text-center">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Data Saved!</h3>
                  <p className="text-gray-600 mb-6">Your information has been saved. Check the preview on the right.</p>
                </div>
                
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={handleBackToForm}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium"
                  >
                    <Edit size={18} />
                    Back to Edit
                  </button>
                  
                  {showNext && (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >
                      Next Section
                      <ChevronRight size={18} />
                    </button>
                  )}
                  
                  {showPrevious && (
                    <button
                      type="button"
                      onClick={handlePrevious}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 text-green-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      <ChevronLeft size={18} />
                      Previous Section
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - Preview with Action Buttons */}
        <div className="w-2/3">
          {/* Action Buttons - Share, Public/Private, Download */}
          <div className="flex items-center justify-end gap-3 mb-4">
            {/* Share Button - Only show when Public */}
            {isPublic && (
              <button
                onClick={handleShare}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium"
              >
                <Share2 size={18} />
                Share
              </button>
            )}

            {/* Public/Private Toggle */}
            <button
              onClick={handleTogglePublic}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium ${
                isPublic 
                  ? 'bg-purple-50 text-purple-600 hover:bg-purple-100' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {isPublic ? <Eye size={18} /> : <EyeOff size={18} />}
              {isPublic ? 'Public' : 'Private'}
            </button>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors font-medium"
            >
              <Download size={18} />
              Download
            </button>
          </div>

          {/* Resume Preview */}
          <ResumePreview 
            data={resumeData} 
            template={resumeData.template} 
            accentColor={resumeData.accent_color}
          />
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
            {/* Close Button */}
            <button
              onClick={() => setShowShareModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <Share2 size={24} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Share Resume</h3>
              <p className="text-gray-600 text-sm">Anyone with this link can view your resume</p>
            </div>

            {/* URL Display */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shareable Link
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 text-sm"
                />
                <button
                  onClick={handleCopyUrl}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                    copied 
                      ? 'bg-green-500 text-white' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check size={16} />
                      Copied
                    </>
                  ) : (
                    'Copy'
                  )}
                </button>
              </div>
            </div>

            {/* Social Share Buttons */}
            <div className="border-t pt-4">
              <p className="text-sm font-medium text-gray-700 mb-3">Share via</p>
              <div className="flex gap-2">
                <button
                  onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank')}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  LinkedIn
                </button>
                <button
                  onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=Check out my resume!`, '_blank')}
                  className="flex-1 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors text-sm font-medium"
                >
                  Twitter
                </button>
                <button
                  onClick={() => window.open(`mailto:?subject=My Resume&body=Check out my resume: ${shareUrl}`, '_blank')}
                  className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
                >
                  Email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ResumeBuilder