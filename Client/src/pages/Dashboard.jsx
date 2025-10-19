import React, { useEffect, useState } from 'react';
import { Plus, Upload, Edit2, Trash2, FilePenLineIcon, X } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const colors = ["#b794f6", "#fbbf24", "#f87171", "#34d399"];
  const [allresume, setAllResumes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [resumeTitle, setResumeTitle] = useState('');
  const navigate = useNavigate(); // ✅ for navigation

  // Dummy data for demonstration
  const dummyResumeData = [
    { id: 1, name: "Alex's Resume", updatedAt: "9/23/2025" },
    { id: 2, name: "Jordan's Resume", updatedAt: "9/25/2025" },
    { id: 3, name: "Riley's Resume", updatedAt: "9/25/2025" }
  ];

  const loadAllResumes = async () => {
    setAllResumes(dummyResumeData);
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  const handleEdit = (id) => {
    console.log('Edit resume:', id);
  };

  const handleDelete = (id) => {
    console.log('Delete resume:', id);
  };

  const handleCreateResume = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setResumeTitle('');
  };

  const handleSubmitResume = () => {
    if (resumeTitle.trim()) {
      const randomId = Math.random().toString(36).substring(2, 7); // ✅ Generate unique ID
      console.log('Creating resume with title:', resumeTitle);
      navigate(`/app/builder/${randomId}`); // ✅ Navigate to builder page
      handleCloseModal();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Buttons Container */}
        <div className="flex gap-6 mb-8">
          {/* Create Resume Button */}
          <div
            onClick={handleCreateResume}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 w-50 flex flex-col items-center justify-center hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mb-4">
              <Plus className="w-8 h-8 text-white" strokeWidth={2.5} />
            </div>
            <h3 className="text-gray-700 font-medium text-base">Create Resume</h3>
          </div>

          {/* Upload Existing Button */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 w-50 flex flex-col items-center justify-center hover:shadow-md transition-shadow cursor-pointer">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mb-4">
              <Upload className="w-8 h-8 text-white" strokeWidth={2.5} />
            </div>
            <h3 className="text-gray-700 font-medium text-base">Upload Existing</h3>
          </div>
        </div>

        {/* Horizontal Line */}
        <hr className="border-gray-300 mb-8 w-105" />

        {/* Resume Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {allresume.map((resume, index) => (
            <div
              key={resume.id}
              className="rounded-2xl shadow-md p-8 relative group hover:shadow-lg transition-all cursor-pointer"
              style={{ backgroundColor: colors[index % colors.length] }}
            >
              {/* Edit and Delete Icons - Top Right */}
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(resume.id);
                  }}
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm"
                >
                  <Edit2 className="w-4 h-4 text-gray-700" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(resume.id);
                  }}
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>

              {/* Resume Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-opacity-30 rounded-lg flex items-center justify-center">
                  <FilePenLineIcon className="w-8 h-8 text-white" strokeWidth={2} />
                </div>
              </div>

              {/* Resume Name */}
              <h3 className="text-white text-center font-semibold text-lg mb-16">
                {resume.name}
              </h3>

              {/* Updated Date */}
              <p className="text-white text-opacity-80 text-center text-sm">
                Updated on {resume.updatedAt}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Create a Resume</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Input Field */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Enter resume title"
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Create Button */}
            <button
              onClick={handleSubmitResume}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors"
            >
              Create Resume
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
