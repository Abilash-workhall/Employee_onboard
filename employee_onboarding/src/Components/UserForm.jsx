import React from 'react'
import { useState , useEffect } from 'react';
import axios from 'axios';
import { Fullname_label, User_Detial_head } from '../Text';
export default function UserForm() {

    const userData = JSON.parse(localStorage.getItem("User_Detial"));
    console.log(userData);

    const [formData, setFormData] = useState({
        Fullname: userData.uname,
        Email: userData.umail,
        Phonenumber: "",
        Department: "",
        Designation: "",
        Joiningdate: "",
        SigininId: "",
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
        const ud = JSON.parse(localStorage.getItem("User_Detial"));
        
        const updatedFormData = {
          ...formData,
          SigininId: ud._id,
        };
        console.log(updatedFormData.SigininId); 
    
        try {
          const response = await axios.post(
            "http://localhost:3010/users/new_onbord",
            updatedFormData
          );
          console.log(response.data.message);
          window.location.reload()
        } catch (error) {
          console.error("API Error:", error);
          
          }
      };
    
      useEffect(() => {
        console.log(formData);
      }, [formData]);
    
  return (
    <div>
        <h2 className='text-xl font-semibold ' > {User_Detial_head}</h2>
    <form className="grid grid-cols-1 text-sm sm:grid-cols-2 gap-2">
      <div>
        <label className="block text-gray-600"> {Fullname_label} </label>
        <input
          onChange={handleInputChange}
          required
          value={userData.uname}
          disabled
          className="w-full p-3 mt-2 bg-gray-100 border text-gray-400 border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-600">Email</label>
        <input
            required
          onChange={handleInputChange}
          value={userData.umail}
          disabled
          className="w-full p-3 mt-2 bg-gray-100 border text-gray-400 border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-600">Phone Number</label>
        <input
        required
        type="tel"
          onChange={handleInputChange}
          name="Phonenumber"
          placeholder="Enter Your Phone Number"
          className="w-full p-3 mt-2 bg-white border  border-slate-400 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
        <div>
        <label className="block text-gray-600">Date and year of passing</label>
        <input
        name="Joiningdate"
        required
          type="date"
          onChange={handleInputChange}
          className="w-full p-3 mt-2 bg-white border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div> 
      <div>
        <label className="block text-gray-600">Designation</label>
        <input
        required
        name="Designation"
          onChange={handleInputChange}
          className="w-full p-3 mt-2 bg-white border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-600">Department</label>
        <input
        name="Department"
          onChange={handleInputChange}
          required
          placeholder=''
          className="w-full p-3 mt-2 bg-white border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="mt-4 bg-blue-500 text-white p-2 rounded-sm float-right"
        >
          Go to Document Upload
        </button>
      </div>
    </form>
  </div>
  )
}
