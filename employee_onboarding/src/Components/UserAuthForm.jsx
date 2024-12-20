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
    role: 0,
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
    <section className="h-[80vh] w-screen flex flex-col justify-center items-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="140" height="24" fill="none" viewBox="0 0 140 24" className="AuthLayout_Logo__cN2A9 mb-6">
        <title>Workhall</title>
        <path fill="#282828" fillRule="evenodd" d="M44.56 6.033l.279.003c5.17.132 9.033 3.92 9.033 8.915v.065c0 5.039-4.118 8.984-9.376 8.984-5.222 0-9.312-3.918-9.312-8.918v-.066c0-5.038 4.12-8.983 9.377-8.983zM44.497 10c-2.736 0-4.722 2.082-4.722 4.951v.065c0 2.814 2.104 5.016 4.787 5.016 2.737 0 4.722-2.08 4.722-4.95v-.066c0-2.813-2.102-5.016-4.787-5.016zm17.31.553V6.36h-4.654v17.246h4.655V17.28c0-4.102 1.957-6.36 5.51-6.36h.096V6.028c-2.49-.069-4.187 1.142-5.29 3.774l-.316.75v.001zM80.93 6.36l-6.073 6.653V0h-4.654v23.607h4.654v-5.245l1.928-2.037.112.178 4.542 7.104h5.314l-6.826-10.512L86.44 6.36h-5.51zm12.975 2.43l-.292.377V0h-4.655v23.607h4.655v-9.64c0-2.376 1.195-3.738 3.28-3.738 2.049 0 3.18 1.327 3.18 3.738v9.64h4.655V12.393c0-3.983-2.17-6.36-5.803-6.36-2.533 0-3.96 1.393-5.02 2.756v.001zm21.283-2.626l.348.004c2.414.056 4.254.7 5.47 1.915 1.23 1.23 1.852 3.078 1.852 5.49v10.034h-4.49v-2.164l-.286.316c-1.321 1.464-3.02 2.176-5.191 2.176-2.921 0-5.867-1.612-5.867-5.213v-.066c0-3.459 2.52-5.443 6.917-5.443 1.902 0 3.212.36 4.242.712l.217.075v-.525c0-2.176-1.397-3.376-3.934-3.376-1.855 0-3.165.33-4.75.902l-1.146-3.5c1.855-.804 3.712-1.337 6.618-1.337zm-.066 9.705c-2.292 0-3.608.945-3.608 2.59v.065c0 1.394 1.133 2.295 2.885 2.295 2.394 0 4.067-1.334 4.067-3.246v-.99l-.096-.044c-.936-.432-2.09-.67-3.248-.67zm15.934 7.738V0H126.4v23.607H131.056zm8.589 0V0h-4.655v23.607h4.655z" clipRule="evenodd"></path>
        <path fill="#217CF5" fillRule="evenodd" d="M25.627 16.668l-3.004-9.57-2.408 7.25 3.249 9.412h4.315L35.835 0H30.73l-5.103 16.668z" clipRule="evenodd"></path>
        <path fill="#282828" fillRule="evenodd" d="M13.22 6.895l-.824 2.799-2.053 6.974L5.244 0H0l8.056 23.76h4.316l2.309-6.841.953-2.82L17.85 7.53 20.394 0h-5.146L13.22 6.895z" clipRule="evenodd"></path>
      </svg>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">{isSignUp ? "Sign-Up Form" : "Login Form"}</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label htmlFor="umail" className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              placeholder="Email"
              name="umail"
              required
              onChange={handleInputChange}
              value={formData.umail}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              required
              onChange={handleInputChange}
              value={formData.password}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Sign-Up Only: Username */}
          {isSignUp && (
            <div>
              <label htmlFor="uname" className="block text-sm font-semibold mb-2">Full Name</label>
              <input
                type="text"
                placeholder="Full Name"
                name="uname"
                required
                onChange={handleInputChange}
                value={formData.uname}
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
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
    </section>
  );
};

export default UserAuthForm;
