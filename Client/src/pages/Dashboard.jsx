import React, { useEffect, useState } from "react";
import { Plus, Upload, Edit2, Trash2, FilePenLineIcon, X, UploadCloudIcon, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../configs/api";
import { toast } from "react-toastify";

const Dashboard = () => {
  const colors = ["#b794f6", "#fbbf24", "#f87171", "#34d399"];
  const [allresume, setAllResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [resumeTitle, setResumeTitle] = useState("");
  const [uploadTitle, setUploadTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [selectedResumeId, setSelectedResumeId] = useState(null);
  const [creatingResume, setCreatingResume] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const navigate = useNavigate();

  // Load resumes from backend
  const loadAllResumes = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await api.get('/api/users/resumes', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Transform backend data to match your display format
      const transformedData = data.resumes.map((resume) => ({
        id: resume._id,
        name: resume.title,
        updatedAt: new Date(resume.updatedAt).toLocaleDateString('en-US', {
          month: 'numeric',
          day: 'numeric',
          year: 'numeric'
        })
      }));
      setAllResumes(transformedData);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch resumes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  // ====== Edit Resume ======
  const handleEdit = (id) => {
    const selectedResume = allresume.find((r) => r.id === id);
    setEditTitle(selectedResume.name);
    setSelectedResumeId(id);
    setShowEditModal(true);
  };

  const handleUpdateResume = async () => {
    if (editTitle.trim()) {
      try {
        const token = localStorage.getItem('token');
        await api.put('/api/resumes/update', 
          { 
            resumeId: selectedResumeId,
            resumeData: JSON.stringify({ title: editTitle })
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        setAllResumes((prev) =>
          prev.map((resume) =>
            resume.id === selectedResumeId ? { ...resume, name: editTitle } : resume
          )
        );
        toast.success('Resume title updated successfully!');
        setShowEditModal(false);
        setEditTitle("");
        setSelectedResumeId(null);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to update resume');
      }
    }
  };

  // ====== Delete Resume ======
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this resume?");
    if (confirmDelete) {
      try {
        const token = localStorage.getItem('token');
        await api.delete(`/api/resumes/delete/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setAllResumes((prev) => prev.filter((resume) => resume.id !== id));
        toast.success('Resume deleted successfully!');
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete resume');
      }
    }
  };

  // ====== Create Resume ======
  const handleCreateResume = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setResumeTitle("");
  };

  const handleSubmitResume = async () => {
    if (resumeTitle.trim()) {
      setCreatingResume(true);
      try {
        const token = localStorage.getItem('token');
        const { data } = await api.post('/api/resumes/create', 
          { title: resumeTitle },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        toast.success('Resume created successfully!');
        navigate(`/app/builder/${data.resume._id}`);
        handleCloseModal();
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to create resume');
      } finally {
        setCreatingResume(false);
      }
    }
  };

  // ====== Upload Resume ======
  const handleOpenUploadModal = () => setShowUploadModal(true);
  
  const handleCloseUploadModal = () => {
    setShowUploadModal(false);
    setUploadTitle("");
    setSelectedFile(null);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
    } else {
      toast.error("Please select a PDF file");
    }
  };

  const handleUploadResume = async () => {
    if (uploadTitle.trim() && selectedFile) {
      setUploadingResume(true);
      try {
        // Read PDF file content
        const reader = new FileReader();
        reader.onload = async () => {
          // const pdfContent = e.target.result;
          
          // For now, we'll send a placeholder text
          // In production, you'd use a PDF parser library
          const resumeText = "PDF content placeholder - integrate PDF parser here";
          
          const token = localStorage.getItem('token');
          const { data } = await api.post('/api/ai/upload-resume',
            { 
              title: uploadTitle,
              resumeText: resumeText
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          
          toast.success('Resume uploaded successfully!');
          navigate(`/app/builder/${data.resumeId}`);
          handleCloseUploadModal();
        };
        
        reader.readAsText(selectedFile);
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to upload resume');
      } finally {
        setUploadingResume(false);
      }
    }
  };

  // ====== Resume Card Click ======
  const handleResumeClick = (resume) => {
    navigate(`/app/builder/${resume.id}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <Loader2 className="animate-spin" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Buttons Container */}
        <div className="flex gap-6 mb-8">
          {/* Create Resume */}
          <div
            onClick={handleCreateResume}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 w-50 flex flex-col items-center justify-center hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mb-4">
              <Plus className="w-8 h-8 text-white" strokeWidth={2.5} />
            </div>
            <h3 className="text-gray-700 font-medium text-base">Create Resume</h3>
          </div>

          {/* Upload Existing */}
          <div
            onClick={handleOpenUploadModal}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 w-50 flex flex-col items-center justify-center hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mb-4">
              <Upload className="w-8 h-8 text-white" strokeWidth={2.5} />
            </div>
            <h3 className="text-gray-700 font-medium text-base">Upload Existing</h3>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-300 mb-8 w-105" />

        {/* Empty State */}
        {allresume.length === 0 ? (
          <div className="text-center py-16">
            <FilePenLineIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No resumes yet</h3>
            <p className="text-gray-600">Create your first resume to get started</p>
          </div>
        ) : (
          /* Resume Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {allresume.map((resume, index) => (
              <div
                key={resume.id}
                onClick={() => handleResumeClick(resume)}
                className="rounded-2xl shadow-md p-8 relative group hover:shadow-lg transition-all cursor-pointer"
                style={{ backgroundColor: colors[index % colors.length] }}
              >
                {/* Edit & Delete Icons */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(resume.id);
                    }}
                    className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 shadow-sm"
                  >
                    <Edit2 className="w-4 h-4 text-gray-700" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(resume.id);
                    }}
                    className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 shadow-sm"
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
        )}
      </div>

      {/* === Create Resume Modal === */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Create a Resume</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Enter resume title"
              value={resumeTitle}
              onChange={(e) => setResumeTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 mb-6"
            />
            <button
              onClick={handleSubmitResume}
              disabled={creatingResume}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
            >
              {creatingResume ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Creating...
                </>
              ) : (
                'Create Resume'
              )}
            </button>
          </div>
        </div>
      )}

      {/* === Edit Resume Modal === */}
      {showEditModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Edit Resume Title</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 mb-6"
            />
            <button
              onClick={handleUpdateResume}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg"
            >
              Update
            </button>
          </div>
        </div>
      )}

      {/* === Upload Resume Modal === */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Upload Resume</h2>
              <button
                onClick={handleCloseUploadModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <input
              type="text"
              placeholder="Create your title"
              value={uploadTitle}
              onChange={(e) => setUploadTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 mb-4"
            />

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition-colors mb-6">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex flex-col items-center">
                  <UploadCloudIcon className="w-12 h-12 text-gray-400 mb-3" />
                  {selectedFile ? (
                    <p className="text-green-600 font-medium">{selectedFile.name}</p>
                  ) : (
                    <p className="text-green-500 text-sm">Click to upload PDF</p>
                  )}
                </div>
              </label>
            </div>

            <button
              onClick={handleUploadResume}
              disabled={!uploadTitle.trim() || !selectedFile || uploadingResume}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2"
            >
              {uploadingResume ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Uploading...
                </>
              ) : (
                'Upload Resume'
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;