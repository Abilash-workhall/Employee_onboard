import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setuserdata } from "../slices/UserSlice";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import { create_password, create_user_name, email_label, username_label , enter_mail, password_label, uppercase, numeric, special, already_account, signup, login_btn } from "../Text";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    umail: "",
    uname: "",
    password: "",
    role: 1,
  });

  const dispatch = useDispatch()

  const [passwordStrength, setPasswordStrength] = useState({
    uppercase: false,
    numeric: false,
    specialChar: false,
  });

  const [passwordColor, setPasswordColor] = useState("text-slate-400"); 

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "password") {
      const newPasswordStrength = {
        uppercase: /[A-Z]/.test(value), 
        numeric: /\d/.test(value), 
        specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(value), 
      };

      setPasswordStrength(newPasswordStrength);
      console.log(newPasswordStrength);
      

      if (newPasswordStrength.uppercase && newPasswordStrength.numeric && newPasswordStrength.specialChar) {
        setPasswordColor("text-green-400");
      } else if (newPasswordStrength.uppercase || newPasswordStrength.numeric || newPasswordStrength.specialChar) {
        setPasswordColor("text-yellow-400");
      } else {
        setPasswordColor("text-red-400");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3010/users/new", formData);
      console.log(response.data.message);
      console.log("in try");
      dispatch(
        setuserdata({
          username: formData.uname,
          is_loggedin: true,
          role: formData.role,
        })
      );
      navigate("/userdashboard");
    } catch (error) {
      console.error("API Error:", error);
      alert("An error occurred.");
    }
  };

  return (
    <section className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="bg-[#181C14] p-6 rounded-lg shadow-lg w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
         <Logo/>
          <p className="text-blue-400">Create a new Account</p>

          <div>
            <label htmlFor="uname" className="block text-sm text-white mb-2">
              {username_label}
            </label>
            <input
              type="text"
              placeholder={create_user_name}
              name="uname"
              required
              onChange={handleInputChange}
              value={formData.uname}
              className="w-full px-4 py-2 rounded-sm border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="umail" className="block text-sm text-white mb-2">
              {email_label}
            </label>
            <input
              type="email"
              placeholder={enter_mail}
              name="umail"
              required
              onChange={handleInputChange}
              value={formData.umail}
              className="w-full px-4 py-2 rounded-sm border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-white mb-2">
              {password_label}
            </label>
            <input
              type="password"
              placeholder={create_password}
              name="password"
              required
              onChange={handleInputChange}
              value={formData.password}
              className="w-full px-4 py-2 rounded-sm border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-1 float-left">
            <p className={`flex justify-center gap-2 ${passwordColor} text-[10px]`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                  clipRule="evenodd"
                />
              </svg>
              {uppercase}
            </p>
            <p className={`flex justify-center gap-1 ${passwordStrength.numeric ? "text-green-400" : "text-slate-300"} text-[10px]`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                  clipRule="evenodd"
                />
              </svg>
             {numeric}
            </p>
            <p className={`flex justify-center gap-1 ${passwordStrength.specialChar ? "text-green-400" : "text-slate-300"} text-[10px]`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                  clipRule="evenodd"
                />
              </svg>
              {special}
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-sm shadow hover:bg-blue-600 transition-colors"
          >
            {signup}
          </button>
        </form>
        <p className="mt-5">  </p>
        <p className="text-white text-center text-sm "> {already_account} <Link to="/login" className="text-blue-400 underline">{login_btn}</Link> </p>
      </div>
    </section>
  );
};

export default SignUpPage;
