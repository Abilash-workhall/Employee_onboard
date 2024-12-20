import React from 'react'
import { FaCircleCheck } from "react-icons/fa6";
import { IoTime } from "react-icons/io5";

export default function PageStatus({complete}) {
  return (
    <section className={` ${complete?"bg-green-100":"bg-violet-100"} flex flex-col gap-3 items-center px-3 py-6` }>

    {
        complete && <> <FaCircleCheck size={110} className='bg-green-200  text-green-500  p-3 rounded-[50%]' />
        <h2 className='text-green-700'>You are now an Eligible Candidate for Onboarding process</h2>
     </>
    }
   {
    !complete && <> <IoTime size={110} className='bg-violet-200  text-violet-500  p-3 rounded-[50%]' />
    <h2 className='text-violet-700'>Administrator is Yet to Verify your Profile</h2></>
   }
    
  </section>
  )
}
