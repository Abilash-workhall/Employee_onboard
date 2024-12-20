import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import AdminCards from "../components/AdminCards";
import AdminTable from "../components/AdminTable";
import { fetchData } from "../slices/DataSlice";
import { useDispatch ,useSelector } from "react-redux";
import { IoFilter } from "react-icons/io5";

const AdminDashboard = () => {
const [category , setCategory] = useState(1)
const [search , setSearch] = useState("")
  const dispatch = useDispatch();
  const { data,doc_uploaded_users,form_filled_users,completed_users,loading,error} = useSelector((state) => state.data); 
useEffect(() => {
    dispatch(fetchData()); // Updated action
  }, [dispatch]);
  console.log("Recived");
  return (
    <section className="">
      <Navbar />

      <AdminCards tot={data.length} doc = {doc_uploaded_users.length} comp = {completed_users.length} />

      <div className=" md:max-w-[1180px] mt-10 mx-auto flex flex-col md:flex-row  items-center justify-center  md:justify-between  mb-5">
        <div className="inline-flex gap-1  items-center">
        <IoFilter />
        <input
          className=" border mb-10 md:mb-0  px-3 py-2 text-sm ml-4 rounded-sm   "
          placeholder="Search Name"
          onChange={(e) => setSearch(e.target.value)}
        />
        </div>
        <div className="text-[12px] flex gap-4  ">
          <button className={`${category == 1?"bg-transparent":"bg-blue-200"}  text-blue-500 rounded-md p-1`} onClick={()=>setCategory(1)} > All Candidates</button>
          <button className={`${category == 2?"bg-transparent":"bg-violet-200"}  text-violet-500 rounded-md p-1`} onClick={()=>setCategory(2)} > Form Filled</button>
          <button className={`${category == 3?"bg-transparent":"bg-yellow-200"}  text-yellow-500 rounded-md p-1`} onClick={()=>setCategory(3)}> Documents Uploaded</button>
          <button className={`${category == 4?"bg-transparent":"bg-green-200"}  text-green-500 rounded-md p-1`} onClick={()=>setCategory(4)} > Eligible for Onboarding</button>
        </div>
      </div>


     {category == 1 && <AdminTable AllUsers={data} loading={loading} error={error} search = {search} /> } 
      { category ==2 && <AdminTable AllUsers={doc_uploaded_users} loading={loading} error={error} search = {search}  />}
      { category ==3 &&  <AdminTable AllUsers={form_filled_users} loading={loading} error={error}   search = {search}/>}
      { category ==4 &&  <AdminTable AllUsers={completed_users} loading={loading} error={error}  search = {search}  />} 
    </section>
  );
};

export default AdminDashboard;