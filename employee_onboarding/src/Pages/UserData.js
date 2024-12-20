import React from 'react'
import Navbar from '../components/Navbar'
import { cand_details , username_label } from '../Text'
export default function UserData() {


    // tharun get the all the data such as onbarding form , documents everything
  return (
    <section>
        <Navbar/>
        <main className='h-[90vh] w-screen'>

            <h1 className='text-center text-2xl mt-6 font-semibold text-gray-600'> {cand_details} </h1>
            <div>
                <div>
                    <label> {username_label} </label>
                    <span> uname </span>
                </div>
            </div>

        </main>
    </section>
  )
}
