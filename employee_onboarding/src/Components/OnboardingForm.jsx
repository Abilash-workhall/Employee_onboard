import React, { useState } from "react";
import axios from "axios";




  
const OnboardingForm = () => {

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  // local
  const user_data = JSON.parse(localStorage.getItem("User_Detial"))
  console.log(user_data);


  
    const [formData, setFormData] = useState({
      Fullname: user_data.uname ,
      Email: user_data.umail,
      Phonenumber: "",
      Department: "",
      Designation: "",
      Joiningdate: "",
      SigininId: "",
    });
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { Fullname, Email, Phonenumber, Department, Designation, Joiningdate } = formData;
  if (!Fullname || !Email || !Phonenumber || !Department || !Designation || !Joiningdate) {
    alert("Please fill in all required fields before submitting.");
    return; // Prevent further execution if validation fails
  }
    const ud = JSON.parse(localStorage.getItem("User_Detial")); // Use JSON.parse
setFormData((prevState) => ({
  ...prevState,
  SigininId: ud._id, 
}));
console.log(formData.SigininId);

    try {
      const response = await axios.post("http://localhost:3010/users/new_onbord", formData);
      console.log(response.data.message);
      alert(response.data.message);
    } catch (error) {
      console.error("API Error:", error);
      alert("An error occurred while onboarding the user.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Onboarding Form</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name Input */}
          <input
            type="text"
            placeholder="Full Name"
            name="Fullname"
            required
            value={user_data.uname}
            disabled
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            name="Email"
            required
            value={user_data.umail}
            disabled
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

          {/* Phone Number Input */}
          <input
            type="tel"
            placeholder="Phone Number"
            name="Phonenumber"
            required
            value={formData.Phonenumber}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

          {/* Department Input */}
          <input
            type="text"
            placeholder="Department"
            name="Department"
            required
            value={formData.Department}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

          {/* Designation Input */}
          <input
            type="text"
            placeholder="Designation"
            name="Designation"
            required
            value={formData.Designation}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

          {/* Joining Date Input */}
          <input
            type="date"
            placeholder="Joining Date"
            name="Joiningdate"
            required
            value={formData.Joiningdate}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg shadow hover:bg-blue-600 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default OnboardingForm;