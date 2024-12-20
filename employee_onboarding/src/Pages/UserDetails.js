import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Documents from "../components/Documents";

export default function UserModal() {
  const [data, setData] = useState(null);
  const params = useParams();
  console.log(params);
  
useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.post(
          `http://localhost:3010/users/user_data/${params.id}`
        );
        setData(res.data.Detials);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUser();
  }, []);


console.log(data);

  let documents = [];

  for (let key in data?.docs) {
    if (data?.docs.hasOwnProperty(key)) {
      let val = data?.docs[key];
      documents.push({ key, val }); 
    }
  }
  
  console.log(documents);  


return (
    <section className="min-h-screen ">
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-2">
          Candidate Details
        </h2>
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
                <label className="block text-gray-600">Date of Joining </label>
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
     {
      documents.map((element , index)=>(
        <Documents doc={element.key} params = {data.SigininId} name={element.val} uploaded = {element.val ? true : false} />
      ))
     }


             
          
       
        </form>
      </div>
    </section>
  );
}
