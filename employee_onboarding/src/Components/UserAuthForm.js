import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const UserAuthForm = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    umail: "",
    uname: "",
    password: "",
    role:0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleToggleForm = () => {
    setIsSignUp((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignUp) {
        const response = await axios.post("http://localhost:3010/users/new", formData);
        console.log(response.data.message);
        alert(response.data.message);
      } else {
        const response = await axios.post("http://localhost:3010/users/login", {
          umail: formData.umail,
          upassword: formData.password,
        });
        const { Detials, role } = response.data;
        localStorage.setItem("User Detial", Detials);
        if(Detials.role==1){
          navigate('/AdminDashboard');
        }else{
          navigate('/UserDashboard');
        }
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("An error occurred.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isSignUp ? "Sign-Up Form" : "Login Form"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            name="umail"
            required
            onChange={handleInputChange}
            value={formData.umail}
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            onChange={handleInputChange}
            value={formData.password}
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />

          {/* Sign-Up Only: Username */}
          {isSignUp && (
            <input
              type="text"
              placeholder="Full Name"
              name="uname"
              required
              onChange={handleInputChange}
              value={formData.uname}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          )}
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg shadow hover:bg-blue-600 transition-colors"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        {/* Toggle Button */}
        <button
          onClick={handleToggleForm}
          className="mt-4 w-full text-blue-500 font-bold rounded hover:underline"
        >
          {isSignUp ? "Switch to Login" : "Switch to Sign-Up"}
        </button>
      </div>
    </div>
  );
};

export default UserAuthForm;
