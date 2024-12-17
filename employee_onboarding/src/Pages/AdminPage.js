import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserDetial_Aview from './UserDetial_Aview';

const AdminPage = () => {
    const navigate=useNavigate();
  const [users, setUsers] = useState([]); // State to store user data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to store errors
  const [selectedUser, setSelectedUser] = useState(null); // State to manage the selected user

  // Fetch data from API when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3010/users/getall_onb');
        const result = await response.json();
        setUsers(result.us); // Set the 'us' array from the API response
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleView = (user) => {
    setSelectedUser(user); // Set the selected user data
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Admin Dashboard</h1>

      {/* Loading and Error Handling */}
      {loading && <p className="text-center text-blue-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Table to Display User Data */}
      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-2 px-4 border">Full Name</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Phone Number</th>
                <th className="py-2 px-4 border">Department</th>
                <th className="py-2 px-4 border">Designation</th>
                <th className="py-2 px-4 border">Joining Date</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-100">
                  <td className="py-2 px-4 border text-center">{user.Fullname}</td>
                  <td className="py-2 px-4 border text-center">{user.Email}</td>
                  <td className="py-2 px-4 border text-center">{user.Phonenumber}</td>
                  <td className="py-2 px-4 border text-center">{user.Department}</td>
                  <td className="py-2 px-4 border text-center">{user.Designation}</td>
                  <td className="py-2 px-4 border text-center">
                    {new Date(user.Joiningdate).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border text-center">
                    <button
                      onClick={() => handleView(navigate('/Userdetial'))}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Render Detailed Component when a user is selected */}
    </div>
  );
};

export default AdminPage;
