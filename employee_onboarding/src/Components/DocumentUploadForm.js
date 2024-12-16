import React, { useState } from "react";
import axios from "axios";

const DocumentUploadForm = () => {
  const [formData, setFormData] = useState({
    resume: null,
    marksheet10: null,
    marksheet12: null,
    collegeMarksheet: null,
  });

  const handleInputChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("resume", formData.resume);
    data.append("marksheet10", formData.marksheet10);
    data.append("marksheet12", formData.marksheet12);
    data.append("collegeMarksheet", formData.collegeMarksheet);

    try {
      const response = await axios.post("http://localhost:3010/users/upload_documents", data);
      console.log(response.data.message);
      alert(response.data.message);
    } catch (error) {
      console.error("API Error:", error);
      alert("An error occurred while uploading documents.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Upload Documents</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Resume Upload */}
          <label className="block text-gray-700 font-medium">Resume</label>
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handleInputChange}
            className="w-full py-2 px-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

          {/* 10th Marksheet Upload */}
          <label className="block text-gray-700 font-medium mt-2">10th Marksheet</label>
          <input
            type="file"
            name="marksheet10"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleInputChange}
            className="w-full py-2 px-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

          {/* 12th Marksheet Upload */}
          <label className="block text-gray-700 font-medium mt-2">12th Marksheet</label>
          <input
            type="file"
            name="marksheet12"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleInputChange}
            className="w-full py-2 px-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

          {/* College Marksheet Upload */}
          <label className="block text-gray-700 font-medium mt-2">College Marksheet</label>
          <input
            type="file"
            name="collegeMarksheet"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleInputChange}
            className="w-full py-2 px-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg shadow hover:bg-blue-600 transition-colors"
          >
            Submit Documents
          </button>
        </form>
      </div>
    </div>
  );
};

export default DocumentUploadForm;
