import React, { useState } from "react";
import { data, useNavigate } from "react-router-dom";
import { IoBanOutline } from "react-icons/io5";
import { FaUserAltSlash } from "react-icons/fa";
import { GrValidate } from "react-icons/gr";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";

export default function AdminTable({ AllUsers, loading, error, search }) {
  const navigate = useNavigate();

  const [selectedUser, setSelectedUser] = useState(null);

  const handleView = (user) => {
    setSelectedUser(user);
  };

  const handleClick = (id) => {
    navigate(`/admindashboard/${id}`);
  };

  // Filtered users based on search
  const filteredUsers = AllUsers.filter((user) => {
    return user.Fullname.toLowerCase().includes(search.toLowerCase());
  });

  const Onboard_click = async (status) => {
    try {
      const response = await axios.post(
        `http://localhost:3010/users/onboard/${status}`
      );
      console.log("Request successful:", response);
      window.location.reload();
    } catch (err) {
      console.error("Error in request:", err);
    }
  };

  return (
    <div className="p-6 min-h-screen">
      {loading && <p className="text-center text-white">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          {filteredUsers.length === 0 ? (
            // Show this message if no users match the search query
            <p className="text-center text-gray-500 gap-2 flex justify-center items-center  ">
              {" "}
              <IoBanOutline /> No data found
            </p>
          ) : (
            <table className="min-w-full bg-white text-[#181C14] text-sm">
              <thead className="uppercase text-sm">
                <tr>
                  <th className="py-3 px-6 text-left">Full Name</th>
                  <th className="py-3 px-6 text-left">Email</th>
                  <th className="py-3 px-6 text-left">Phone Number</th>
                  <th className="py-3 px-6 text-left">Department</th>
                  <th className="py-3 px-6 text-left">Designation</th>
                  <th className="py-3 px-6 text-left">Actions</th>
                  <th className="py-3 px-6 text-left">Onboard</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-100">
                    <td className="py-3 px-6 flex items-center">
                      <div className="flex items-center gap-2">
                        <FaUserCircle />
                        <span>{user.Fullname}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6">{user.Email}</td>
                    <td className="py-3 px-6">{user.Phonenumber}</td>
                    <td className="py-3 px-6">{user.Department}</td>
                    <td className="py-3 px-6">{user.Designation}</td>
                    <td className="py-3 px-6 text-center">
                      <button
                        onClick={() => handleClick(user.SigininId)}
                        className="bg-[#181C14] flex items-center gap-2 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors duration-300"
                      >
                        <FaEye />
                        View
                      </button>
                    </td>
                    <td className="py-3 px-6">
                      {user.status_id === 5 ? (
                        <button
                          className="inline-flex gap-1 items-center text-blue-500"
                          onClick={() => Onboard_click(user.SigininId)}
                        >
                          <GrValidate />
                          Onboard
                        </button>
                      ) : user.status_id === 6 ? (
                        <button className="inline-flex items-center text-gray-500">
                          ALready Onboarded
                        </button>
                      ) : (
                        <p className="inline-flex items-center text-gray-400 gap-2 cursor-not-allowed">
                          <FaUserAltSlash />
                          Verification needed
                        </p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
