import Navbar from "../components/Navbar";
import OnboardingForm from "../components/OnboardingForm";
import UserUpload from "../components/UserUpload";
import { useEffect, useState } from "react";
import axios from "axios";
import { notification } from "../Text";
import Notifications from "../components/Notifications";
const UserDashboard_a = () => {
return(
       <main>
        <Navbar/>
        <section className="h-[89vh] w-screen flex ">
            <aside className="w-[21%] h-full bg-white border-gray-400 shadow-xl">
                    <Notifications/>
            </aside>
            <section className="flex-1 h-full "> 
           <UserUpload/>
                
                 </section>

        </section>
       </main>
    )
}
export default UserDashboard_a;