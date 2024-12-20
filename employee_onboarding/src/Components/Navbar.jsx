import React from 'react';
import Logo from './Logo';
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';
export default function Navbar() {

  const userData = JSON.parse(localStorage.getItem("User_Detial"))

  

  
  
  return (
    <nav className="w-full bg-[#181C14] px-4 py-3 flex text-white justify-between items-center ">
      <a href='/'> <Logo/> </a>
      <ul className='flex gap-3'>
      <Dropdown name={userData.uname} no_of_options = {2} opt_one="Details" opt_one_link={`/userdashboard/${userData._id}`} opt_two="Logout" opt_two_link="/login" />
      </ul>
    </nav>
  );
}
