import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import ProgressIndicator from "../components/ProgressIndicator";
import { MdNotificationsActive } from "react-icons/md";
import Documents from "../components/Documents";
import { IoIosWarning } from "react-icons/io";

export default function UserModal() {
  const [data, setData] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.post(
          `http://localhost:3010/users/user_data/${params.id}`
        );
        setData(res.data.Detials);
      } catch (err) {
        if(err.status == 404){
          navigate("/pagenotfound")
        }
        
      }
    };
    fetchUser();
  }, [params.id]);
  
 
  const steps = [
    { id: 1, status: "Account created" },
    { id: 2, status: "Form Filled" },
    { id: 3, status: "Document Uploaded" },
    { id: 4, status: "Document Verified" },
    { id: 5, status: "Completed" },
    { id: 6, status: "Onboarded" },
  ];

  let documents = [];
  if (data?.docs && typeof data.docs === "object") {
    for (let key in data.docs) {
      if (data.docs.hasOwnProperty(key)) {
        let val = data.docs[key];
        documents.push({ key, val });
      }
    }
  }

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3010/users/verify/${data.SigininId}`
      );
      console.log("Request successful:", response);
      navigate("/admindashboard");
    } catch (err) {
      console.error("Error in request:", err);
    }
  };


  const [noti, setnoti] = useState({
    ByUserId: JSON.parse(localStorage.getItem("User_Detial"))?._id,
    ToUserId: params.id,
    Message: "",
  });

  const Notify = async (e) => {
    e.preventDefault();
    console.log("aaa");
    try {
      await axios.post("http://localhost:3010/users/n", noti);
      console.log("Notification sent");
    } catch (err) {
      console.error("Error sending notification:", err);
    }
  };
  

  
  

  return (
    <section className="min-h-screen ">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Candidate Details
        </h2>
        <ProgressIndicator
          steps={steps}
          currentStatus={data?.status ?? "Document uploaded"}
        />
        <form className="grid grid-cols-1 text-sm sm:grid-cols-2 gap-6">
          {data ? (
            <>
              <div>
                <label className="block text-gray-600">Full Name</label>
                <input
                  disabled
                  value={data.Fullname}
                  className="w-full p-3 mt-2 bg-gray-100 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-gray-600">Email</label>
                <input
                  disabled
                  value={data.Email}
                  className="w-full p-3 mt-2 bg-gray-100 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-gray-600">Phone Number</label>
                <input
                  disabled
                  value={data.Phonenumber}
                  className="w-full p-3 mt-2 bg-gray-100 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-gray-600">Joining Date</label>
                <input
                  disabled
                  value={data.Joiningdate}
                  className="w-full p-3 mt-2 bg-gray-100 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-gray-600">Designation</label>
                <input
                  disabled
                  value={data.Designation}
                  className="w-full p-3 mt-2 bg-gray-100 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-gray-600">Department</label>
                <input
                  disabled
                  value={data.Department}
                  className="w-full p-3 mt-2 bg-gray-100 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
          {documents.length > 0 ? (
            documents.map((element, index) => (
              <Documents
                key={index}
                doc={element.key}
                params={data.SigininId}
                name={element.val}
                uploaded={element.val ? true : false}
              />
            ))
          ) : (
            <p>No documents available.</p>
          )}
          <div className="flex justify-between">
            {data?.status_id === 2 ? (
              <div className="flex flex-row-reverse gap-6">
                <button
                  className="px-4 py-3 rounded-md bg-green-600 inline-flex gap-2 items-center text-white"
                  onClick={handleClick}
                >
                  Verify
                </button>
     
                
             
              </div>
            ) : (
              <p className=" text-yellow-500 inline-flex items-center p-1 rounded-lg"> <IoIosWarning/> This candidate has been already verified</p>
            )}
          </div>
        </form>
        <div className="inline-flex items-center gap-3">
        <textarea
                placeholder="Enter the Message"
                rows={1}
                cols={60}
                value={noti.Message}  // bind the textarea value to the `Message` field of `noti` state
                onChange={(e) => setnoti(prevNoti => ({
                  ...prevNoti,  // retain other fields (ByUserId, ToUserId)
                  Message: e.target.value,  // update the Message field
                }))}
                className="bg-gray-100 p-2 rounded-md"
              />
              
                  <button
                    type="submit"
                    onClick={Notify}
                    className="bg-[#181C14] px-2 py-2 rounded-md hover:bg-[#2e332a] inline-flex text-sm gap-2 items-center text-white"
                  >
                    <MdNotificationsActive className="text-yellow-400" size={20} />
                    Send Notification
                  </button>
                  </div>
      </div>
    </section>
  );
}
