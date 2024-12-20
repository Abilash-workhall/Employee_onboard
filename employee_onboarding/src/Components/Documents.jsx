import React from "react";
import { IoDocumentText } from "react-icons/io5";

export default function Documents({ name , doc , uploaded , params }) {
  return (
<div>
<p className="text-slate-400">{doc.toLocaleUpperCase()}</p>
    <div className={`flex gap-2 ${uploaded?`bg-green-200`:"bg-slate-200"} items-center rounded-md mt-1 px-4 py-2 cursor-pointer`}>

        <span> <IoDocumentText className={`${uploaded? 'text-green-600':'bg-slate-600'}`} size={20} /> </span>
     <a href={`http://localhost:3010/uploads/${params}/${name}`} target="_blank"  className={`w-full ${uploaded?'text-green-600':'bg-slate-600'}`}> {name} </a>
     
    </div>
    </div>
  );
}
