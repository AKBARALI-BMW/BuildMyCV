import React, { useState, useEffect } from 'react'
import { FolderKanban, Plus, Trash2 } from 'lucide-react'

const ProjectsForm = ({ initialData, onChange }) => {
  const [projects, setProjects] = useState([])
  const [isInitialized, setIsInitialized] = useState(false)
  const MAX_PROJECTS = 10

  useEffect(() => {
    if (initialData && initialData.length > 0 && !isInitialized) {
      setProjects(initialData)
      setIsInitialized(true)
    }
  }, [initialData, isInitialized])

  const addProject = () => {
    if (projects.length >= MAX_PROJECTS) {
      alert(`Maximum ${MAX_PROJECTS} projects allowed!`)
      return
    }
    
    const newProject = {
      id: Date.now(),
      name: '',
      type: '',
      description: ''
    }
    setProjects([...projects, newProject])
  }

  const removeProject = (id) => {
    setProjects(projects.filter(proj => proj.id !== id))
  }

  const updateProject = (id, field, value) => {
    setProjects(projects.map(proj => 
      proj.id === id ? { ...proj, [field]: value } : proj
    ))
  }

  const handleSubmit = () => {
    // Send data to parent component when Save button is clicked
    if (onChange) {
      onChange(projects)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 w-full">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Projects</h2>
          <p className="text-gray-600 text-sm mt-1">Add your projects</p>
        </div>
        <button
          type="button"
          onClick={addProject}
          disabled={projects.length >= MAX_PROJECTS}
          className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-600 rounded-lg hover:bg-teal-100 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus size={18} />
          Add Project
        </button>
      </div>

      {/* Content Area */}
      <div className="min-h-[400px]">
        {/* Empty State */}
        {projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
            <FolderKanban size={64} className="text-gray-300 mb-4" strokeWidth={1.5} />
            <p className="text-gray-600 font-medium mb-1">No projects added yet.</p>
            <p className="text-gray-400 text-sm">Click "Add Project" to get started.</p>
          </div>
        ) : (
          /* Projects List */
          <div className="space-y-6">
            {projects.map((proj, index) => (
              <div key={proj.id} className="border border-gray-200 rounded-lg p-6 bg-white">
                {/* Project Header */}
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Project #{index + 1}
                  </h3>
                  <button
                    type="button"
                    onClick={() => removeProject(proj.id)}
                    className="text-red-400 hover:text-red-600 transition-colors p-1"
                    title="Remove Project"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                {/* Form Fields */}
                <div className="space-y-4">
                  {/* Project Name */}
                  <div>
                    <input
                      type="text"
                      value={proj.name}
                      onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                      placeholder="Project Name"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-700 placeholder-gray-400"
                    />
                  </div>

                  {/* Project Type */}
                  <div>
                    <input
                      type="text"
                      value={proj.type}
                      onChange={(e) => updateProject(proj.id, 'type', e.target.value)}
                      placeholder="Project Type"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-700 placeholder-gray-400"
                    />
                  </div>

                  {/* Project Description */}
                  <div>
                    <textarea
                      value={proj.description}
                      onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                      placeholder="Describe your project..."
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none text-gray-700 placeholder-gray-400"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Projects Counter */}
      {projects.length > 0 && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            {projects.length} of {MAX_PROJECTS} projects added
          </p>
        </div>
      )}

      {/* Save Button */}
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

export default ProjectsForm