import React from "react";
import { MdOutlineDateRange } from "react-icons/md";

export default function NotifyUI({date , message}) {
  return (
    <div>
      <span className="text-[0.7rem] inline-flex gap-2 items-center text-gray-500 font-medium">  <MdOutlineDateRange />
      {date} </span>
      <div className="bg-[#252921] text-white text-[0.7rem] p-2 rounded-md ">
        <p> {message} </p>
      </div>
    </div>
  );
}
