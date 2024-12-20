import React from 'react'
import { useEffect ,  useState } from 'react';
import axios from 'axios';
import { IoMdNotifications } from "react-icons/io";
import NotifyUI from './NotifyUI';

import moment from 'moment'; // Import moment.js


export default function Notifications() {

  const id = JSON.parse(localStorage.getItem("User_Detial"))?._id
  console.log(id);
  
const [data , setData] = useState([])


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.post(
          `http://localhost:3010/users/logged_user_data/${id}`
        );
        setData(res.data.notifiactions);
      
      } catch (err) {
        console.log(err);
      }
    };
    
    fetchUser();
  }, []);



  
  

  return (
    <section className='px-2 py-3'>
       <h2 className='font-semibold text-lg inline-flex   items-center text-blue-600 rounded-sm p-1  '> <IoMdNotifications size={25} /> Notifications </h2>
     {
      data.map((n , _)=>(
        <NotifyUI
        key={n._id} // Add a key prop for performance improvement
        date={moment(n.sdate).format('MMM DD, YYYY, hh:mm A')}
        message={n.Message}
      />      ))
     }
    </section>
  )
}
