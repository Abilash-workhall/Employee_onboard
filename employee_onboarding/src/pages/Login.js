import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Logo from "../components/Logo";
import { setuserdata } from "../slices/UserSlice";
import { email_label, invalid_cred, login_btn, login_text, no_account, password_label, signup_btn } from "../Text";

const LoginPage = () => {

  // localStorage.removeItem("User_Detial")
  const [formData, setFormData] = useState({
    umail: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [invalid, setInvalid] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3010/users/login", {
        umail: formData.umail,
        upassword: formData.password,
      });
      const { Detials } = response.data;
      setInvalid(false);

      dispatch(
        setuserdata({
          username: Detials.uname,
          is_loggedin: true,
          role: Detials.role,
        })
      );

      localStorage.setItem("User_Detial", JSON.stringify(Detials));
      
    setTimeout(() => {
      if (Detials.role === 2) {
        navigate("/admindashboard");
      } else {
        navigate("/userdashboard");
      }
    }, 2000);
    } catch (error) {
      setInvalid(true);
      console.error("API Error:", error);
    }
  };

  return (
    <section className="bg-white h-screen w-screen flex flex-col justify-center items-center">
      <div className="p-8 rounded-lg mt-2 bg-[#181C14] w-full max-w-md">
        <Logo />
        <p className="mt-2 text-blue-400 text-sm"> {login_text} </p>

        <form onSubmit={handleSubmit} className="space-y-4 mt-10">
          <div>
            <label htmlFor="umail" className="block text-sm text-white mb-2">
              {email_label}
            </label>
            <input
              type="email"
              placeholder="Email"
              name="umail"
              required
              onChange={handleInputChange}
              value={formData.umail}
              className="w-full px-4 py-2 text-sm rounded-sm border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="">
            <label htmlFor="password" className="block text-sm text-white mb-2">
              {password_label}
            </label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              required
              onChange={handleInputChange}
              value={formData.password}
              className="w-full px-4 py-2 rounded-sm text-sm border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {invalid && (
            <p className="text-red-500 flex gap-3 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                />
              </svg>
              {invalid_cred}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-sm shadow hover:bg-blue-600 transition-colors"
          >
            {login_btn}
          </button>
        </form>
        <p className="text-white text-center text-sm mt-4">
          {" "}
          {no_account}{" "}
          <Link to="/signin" className="text-blue-400 underline">
            {signup_btn}
          </Link>{" "}
        </p>
      </div>
    </section>
  );
};

export default LoginPage;
