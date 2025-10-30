import React from 'react'
import { Check } from 'lucide-react'

const ProgressBar = ({ currentStep }) => {
  const steps = [
    { id: 'personal', label: 'Personal Info', order: 1 },
    { id: 'summary', label: 'Summary', order: 2 },
    { id: 'experience', label: 'Experience', order: 3 },
    { id: 'education', label: 'Education', order: 4 },
    { id: 'skills', label: 'Skills', order: 5 },
    { id: 'projects', label: 'Projects', order: 6 }
  ]

  const currentStepIndex = steps.findIndex(step => step.id === currentStep)

  const getStepStatus = (index) => {
    if (index < currentStepIndex) return 'completed'
    if (index === currentStepIndex) return 'active'
    return 'upcoming'
  }

  return (
    <div className="w-full bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      {/* Progress Bar Track */}
      <div className="relative">
        {/* Background Line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200" />
        
        {/* Active Progress Line */}
        <div 
          className="absolute top-5 left-0 h-0.5 bg-green-500 transition-all duration-500 ease-out"
          style={{ 
            width: `${(currentStepIndex / (steps.length - 1)) * 100}%` 
          }}
        />

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const status = getStepStatus(index)
            
            return (
              <div key={step.id} className="flex flex-col items-center">
                {/* Step Circle */}
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    transition-all duration-300 z-10 border-2
                    ${status === 'completed' 
                      ? 'bg-green-500 border-green-500' 
                      : status === 'active'
                      ? 'bg-white border-green-500 ring-4 ring-blue-100'
                      : 'bg-white border-gray-300'
                    }
                  `}
                >
                  {status === 'completed' ? (
                    <Check size={18} className="text-white" strokeWidth={3} />
                  ) : (
                    <span
                      className={`
                        text-sm font-semibold
                        ${status === 'active' ? 'text-green-500' : 'text-green-400'}
                      `}
                    >
                      {step.order}
                    </span>
                  )}
                </div>

                {/* Step Label */}
                <span
                  className={`
                    mt-2 text-xs font-medium text-center max-w-[80px]
                    ${status === 'active' 
                      ? 'text-green-600' 
                      : status === 'completed'
                      ? 'text-gray-700'
                      : 'text-gray-400'
                    }
                  `}
                >
                  {step.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Percentage Display */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Completion</span>
          <span className="font-semibold text-green-600">
            {Math.round(((currentStepIndex + 1) / steps.length) * 100)}%
          </span>
        </div>
        {/* Mini Progress Bar */}
        <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500 ease-out rounded-full"
            style={{ 
              width: `${((currentStepIndex + 1) / steps.length) * 100}%` 
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ProgressBar