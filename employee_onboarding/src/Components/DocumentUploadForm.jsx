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
    
    const dat = JSON.parse(localStorage.getItem("User_Detial"));
    console.log(dat);
    const userId = dat._id;
    const data = new FormData();
    data.append("userId", userId);
    data.append("resume", formData.resume);
    data.append("marksheet10", formData.marksheet10);
    data.append("marksheet12", formData.marksheet12);
    data.append("collegeMarksheet", formData.collegeMarksheet);

    try {
      const response = await axios.post(
        "http://localhost:3010/users/upload_documents",
        data
      );
      console.log(response.data.message);
      window.location.reload();
    } catch (error) {
      console.error("API Error:", error);
      alert("An error occurred while uploading documents.");
    }
  };

  return (
    <div className=" flex items-center justify-center">
      <div className="bg-white w-full">
        <h2 className="text-xl font-semibold mb-2"> Documents Upload </h2>

        <form onSubmit={handleSubmit} className="space-y-4 flex flex-wrap justify-between items-center">
        <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
            <label className="block text-gray-400 text-sm mt-2">Resume</label>
            <input
              type="file"
              name="resume"
              accept=".pdf"
              required
              onChange={handleInputChange}
              className="w-full py-2 px-4 rounded-sm border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-400 text-sm mt-2">
              10th Marksheet
            </label>
            <input
              type="file"
              name="marksheet10"
              accept=".pdf"
              required
              onChange={handleInputChange}
              className="w-full py-2 px-4 rounded-sm border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mt-2">
              12th Marksheet
            </label>
            <input
              type="file"
              name="marksheet12"
              required
              accept=".pdf"
              onChange={handleInputChange}
              className="w-full py-2 px-4 rounded-sm border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="">
            <label className="block text-gray-400 text-sm mt-2 font-sem">
              College Marksheet
            </label>
            <input
              type="file"
              required
              name="collegeMarksheet"
              accept=".pdf"
              onChange={handleInputChange}
              className="w-full py-2 px-4 rounded-sm border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
          <p className=" text-yellow-700 text-sm bg-yellow-100 p-2 rounded-lg  w-[320px]">
            {" "}
            Note : Upload the Documents in .pdf format{" "}
          </p>
          
          <button
            type="submit"
            className="w-full  bg-blue-500 text-white py-2 rounded-sm shadow hover:bg-blue-600 transition-colors"
          >
            Submit Documents
          </button>
        </form>
      </div>
    </div>
  );
};

export default DocumentUploadForm;
