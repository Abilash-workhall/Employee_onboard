import React from 'react'
import { PiUsersFourFill } from "react-icons/pi";
import { FaCircleCheck } from "react-icons/fa6";
import { FaFileArrowUp } from "react-icons/fa6";

export default function AdminCards({tot , doc , comp}) {
  return (
    <section className=' md:ml-20 mt-10 md:mx-auto flex flex-col md:flex-row gap-8 items-center '>
        <div className='shadow-md text-white rounded-md p-3 gap-2 flex  items-center ' >
        <PiUsersFourFill className=' text-blue-500 bg-blue-50 rounded-2xl p-1 ' size={40} />
        <div className='flex flex-col-reverse'>
        <h1 className='text-black font-extrabold text-3xl '>{tot}</h1>
        <p className='font-semibold text-gray-400 text-sm'>Total candidates Registered</p>
        </div>
        </div>
        <div className='shadow-md text-white rounded-md  p-3 gap-2 flex  items-center ' >
        <FaFileArrowUp className=' text-yellow-500 bg-yellow-50 rounded-2xl p-[9px] ' size={44} />
        <div className='flex flex-col-reverse'>
        <h1 className='text-black font-extrabold text-3xl '>{doc}</h1>
        <p className='font-semibold text-gray-400 text-sm'>Document uploaded candidates</p>
        </div>
        </div>
        <div className='shadow-md text-white rounded-md  p-3 gap-2 flex  items-center ' >
        <PiUsersFourFill className=' text-blue-500 bg-blue-50 rounded-2xl p-1 ' size={40} />
        <div className='flex flex-col-reverse'>
        <h1 className='text-black font-extrabold text-3xl '>{comp}</h1>
        <p className='font-semibold text-gray-400 text-sm'>Candidates Eligible for Onboarding</p>
        </div>
        </div>
       
      
      
        
    </section>
  )
}
