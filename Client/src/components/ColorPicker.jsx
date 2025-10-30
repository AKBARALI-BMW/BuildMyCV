import React, { useState } from 'react'
import { Check, ChevronDown, ChevronUp } from 'lucide-react'

const ColorPicker = ({ selectedColor, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)

  const colors = [
    { name: "Blue", value: "#3B82F6" },
    { name: "Indigo", value: "#6366F1" },
    { name: "Purple", value: "#8B5CF6" },
    { name: "Green", value: "#10B981" },
    { name: "Red", value: "#EF4444" },
    { name: "Orange", value: "#F59E0B" },
    { name: "Teal", value: "#14B8A6" },
    { name: "Pink", value: "#EC4899" },
    { name: "Gray", value: "#6B7280" },
    { name: "Black", value: "#1F2937" }
  ]

  const handleColorSelect = (colorValue) => {
    onChange(colorValue)
    setIsOpen(false)
  }

  const currentColor = colors.find(c => c.value === selectedColor) || colors[6]

  return (
    <div className="w-190  ">
      {/* Accent Button Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-2 py-2 bg-purple-50 text-green-600 rounded-lg hover:bg-purple-100 transition-colors font-medium"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
        Accent
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {/* Color Selection Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">Accent</h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Color Grid */}
            <div className="p-6">
              <div className="grid grid-cols-5 gap-4">
                {colors.map((color) => {
                  const isSelected = selectedColor === color.value
                  
                  return (
                    <button
                      key={color.value}
                      onClick={() => handleColorSelect(color.value)}
                      className="flex flex-col items-center gap-2 group"
                      title={color.name}
                    >
                      <div
                        className={`w-14 h-14 rounded-full transition-all ${
                          isSelected
                            ? 'ring-4 ring-offset-2'
                            : 'hover:scale-110'
                        }`}
                        style={{
                          backgroundColor: color.value,
                          ringColor: isSelected ? color.value : 'transparent'
                        }}
                      >
                        {isSelected && (
                          <div className="w-full h-full flex items-center justify-center">
                            <Check size={24} className="text-white drop-shadow-lg" strokeWidth={3} />
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-gray-600 font-medium">
                        {color.name}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ColorPicker