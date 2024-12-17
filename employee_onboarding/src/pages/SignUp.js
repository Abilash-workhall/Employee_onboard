import React, { useState } from "react";
import axios from "axios";

const SignUpPage = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3010/users/new", formData);
      console.log(response.data.message);
      alert(response.data.message);
    } catch (error) {
      console.error("API Error:", error);
      alert("An error occurred.");
    }
  };

  return (
    <section className="h-[80vh] w-screen flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign-Up Form</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label htmlFor="uname" className="block text-sm font-semibold mb-2">
              Full Name
            </label>
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
          <div>
            <label htmlFor="umail" className="block text-sm font-semibold mb-2">
              Email
            </label>
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

          <div>
            <label htmlFor="password" className="block text-sm font-semibold mb-2">
              Password
            </label>
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

        

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg shadow hover:bg-blue-600 transition-colors"
          >
            Sign Up
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignUpPage;
