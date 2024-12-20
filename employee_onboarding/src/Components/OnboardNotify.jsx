import React from 'react'
import Happy from  '../congrats.png'
import Lottie from 'react-lottie';
import datt from '../lotties/Animation - 1734673088561.json'
export default function OnboardNotify() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: datt,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
  return (
    <secttion className="flex flex-col  justify-center items-center">
      <Lottie 
	    options={defaultOptions}
        height={400}
        width={400}
     
      />
           <h2 className='text-green-700'>You are now an Eligible Candidate for Onboarding process</h2>
           
    </secttion>
  )
}
