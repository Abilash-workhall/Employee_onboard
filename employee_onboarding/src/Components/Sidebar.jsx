import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="h-screen  w-[25%] bg-[#181C14] z-10 shadow-md px-4 py-6 flex flex-col justify-between absolute">
  
      <div className="flex  flex-col items-center mb-6">
      <svg
  xmlns="http://www.w3.org/2000/svg"
  width="120"
  height="24"
  fill="none"
  viewBox="0 0 140 24"
  className="AuthLayout_Logo__cN2A9"
  role="img"
  aria-hidden="false"
>
  <title>Workhall</title>
  <path
    fill="#FFFFFF"
    fillRule="evenodd"
    d="M44.56 6.033l.279.003c5.17.132 9.033 3.92 9.033 8.915v.065c0 5.039-4.118 8.984-9.376 8.984-5.222 0-9.312-3.918-9.312-8.918v-.066c0-5.038 4.12-8.983 9.377-8.983zM44.497 10c-2.736 0-4.722 2.082-4.722 4.951v.065c0 2.814 2.104 5.016 4.787 5.016 2.737 0 4.722-2.08 4.722-4.95v-.066c0-2.813-2.102-5.016-4.787-5.016zm17.31.553V6.36h-4.654v17.246h4.655V17.28c0-4.102 1.957-6.36 5.51-6.36h.096V6.028c-2.49-.069-4.187 1.142-5.29 3.774l-.316.75v.001zM80.93 6.36l-6.073 6.653V0h-4.654v23.607h4.654v-5.245l1.928-2.037.112.178 4.542 7.104h5.314l-6.826-10.512L86.44 6.36h-5.51zm12.975 2.43l-.292.377V0h-4.655v23.607h4.655v-9.64c0-2.376 1.195-3.738 3.28-3.738 2.049 0 3.18 1.327 3.18 3.738v9.64h4.655V12.393c0-3.983-2.17-6.36-5.803-6.36-2.533 0-3.96 1.393-5.02 2.756v.001zm21.283-2.626l.348.004c2.414.056 4.254.7 5.47 1.915 1.23 1.23 1.852 3.078 1.852 5.49v10.034h-4.49v-2.164l-.286.316c-1.321 1.464-3.02 2.176-5.191 2.176-2.921 0-5.867-1.612-5.867-5.213v-.066c0-3.459 2.52-5.443 6.917-5.443 1.902 0 3.212.36 4.242.712l.217.075v-.525c0-2.176-1.397-3.376-3.934-3.376-1.855 0-3.165.33-4.75.902l-1.146-3.5c1.855-.804 3.712-1.337 6.618-1.337zm-.066 9.705c-2.292 0-3.608.945-3.608 2.59v.065c0 1.394 1.133 2.295 2.885 2.295 2.394 0 4.067-1.334 4.067-3.246v-.99l-.096-.044c-.936-.432-2.09-.67-3.248-.67zm15.934 7.738V0H126.4v23.607H131.056zm8.589 0V0h-4.655v23.607h4.655z"
    clipRule="evenodd"
  ></path>
  <path
    fill="#FFFFFF"
    fillRule="evenodd"
    d="M25.627 16.668l-3.004-9.57-2.408 7.25 3.249 9.412h4.315L35.835 0H30.73l-5.103 16.668z"
    clipRule="evenodd"
  ></path>
  <path
    fill="#FFFFFF"
    fillRule="evenodd"
    d="M13.22 6.895l-.824 2.799-2.053 6.974L5.244 0H0l8.056 23.76h4.316l2.309-6.841.953-2.82L17.85 7.53 20.394 0h-5.146L13.22 6.895z"
    clipRule="evenodd"
  ></path>
</svg>

        <p className=" mt-3 text-blue-400 text-sm">Employee Onboarding</p>
      </div>

      <ul className=" flex  flex-col flex-1 mt-12 items-center text-white  space-y-4">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
        <li>Item 4</li>
        <li>Item 5</li>
      </ul>

      <Link className='absolute bottom-10 flex gap-2 text-white left-[40%]'> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6ZM5.78 8.47a.75.75 0 0 0-1.06 0l-3 3a.75.75 0 0 0 0 1.06l3 3a.75.75 0 0 0 1.06-1.06l-1.72-1.72H15a.75.75 0 0 0 0-1.5H4.06l1.72-1.72a.75.75 0 0 0 0-1.06Z" clipRule="evenodd" />
</svg>
 Logout </Link>
    </aside>
  );
}
