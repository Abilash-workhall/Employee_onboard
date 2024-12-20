import React, { useState, useEffect } from "react";
import ProgressIndicator from "../components/ProgressIndicator";
import axios from "axios";
import UserForm from "./UserForm";
import DocumentUploadForm from "./DocumentUploadForm";
import Hurray from "./Hurray";
import Waiting from "./Waiting";
import { banner_span, user_banner } from "../Text";
import OnboardNotify from "./OnboardNotify";
export default function UserUpload() {


    const steps = [
        { id: 1, status: "Account created" },
        { id: 2, status: "Form Filled" },
        { id: 3, status: "Document Uploaded" },
        { id: 4, status: "Document Verified" },
        { id: 5, status: "Completed" },
        { id: 6, status: "Onboarded" },
      ];
    const[data,setData]=useState({});
    const id= JSON.parse(localStorage.getItem("User_Detial"))._id
console.log(id);
    useEffect(() => {
        const fetchUser = async () => {
          try {
            const res = await axios.post(
              `http://localhost:3010/users/logged_user_data/${id}`
            );
            setData(res.data.Detials);
            console.log(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        fetchUser();
      }, []);

    useEffect(()=>{
        console.log(data);
    },[data])
  return (
    <div className="max-w-4xl mx-auto bg-white  rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mt-10 mb-10">
       {user_banner}
        <span className="text-blue-500"> {banner_span} </span>
      </h2>
      <ProgressIndicator steps={steps} currentStatus={data.status} />
      {
  data.status_id === 1 ? (
    <DocumentUploadForm />
  ) : data.status_id === 2 ? (
    <Waiting />
  ) : data.status_id === 5 ? (
    <Hurray/>
  ) : data.status_id == 6?(
    <OnboardNotify/>
  ):(
    <UserForm />
  )
}

        
    </div>
  );
}
