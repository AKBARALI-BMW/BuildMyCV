import React from 'react'
import ClassicTemplate from '../components/templates/ClassicTemplate'
import MinimalImageTemplate from '../components/templates/MinimalImageTemplate'
import ModernTemplate from '../components/templates/ModernTemplate'
// import MinimalTemplate from '../components/templates/MinimalTemplate' // Add if you have this

const ResumePreview = ({ data, template = 'minimal-image', accentColor = '#3b82f6', classes = "" }) => {

  const renderTemplate = () => {
    // Switch based on template type
    switch(template) {
      case 'classic':
        return <ClassicTemplate data={data} accentColor={accentColor} />
      case 'modern':
        return <ModernTemplate data={data} accentColor={accentColor} />
      case 'minimal-image':
        return <MinimalImageTemplate data={data} accentColor={accentColor} />
      // Uncomment when you add MinimalTemplate
      // case 'minimal':
      //   return <MinimalTemplate data={data} accentColor={accentColor} />
      default:
        return <MinimalImageTemplate data={data} accentColor={accentColor} />
    }
  }

  return (
    <div className='w-full h-full' id="resume-preview">
      <div className='bg-gray-100 p-4 rounded-lg shadow-sm  overflow-y-auto'>
        <div className={"bg-white border border-gray-200 shadow-lg print:shadow-none print:border-none " + classes}>
          {renderTemplate()}
        </div>
      </div>
      
      <style jsx>{`
        @page {
          size: letter;
          margin: 0;
        }
        @media print {
          html, body {
            width: 8.5in;
            height: 11in;
            overflow: hidden;
          }
          body * {
            visibility: hidden;
          }
          #resume-preview, #resume-preview * {
            visibility: visible;
          }
          #resume-preview {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: auto;
            margin: 0;
            padding: 0;
            box-shadow: none !important;
            border: none !important;
          }
        }
      `}</style>
    </div>
  )
}

export default ResumePreview