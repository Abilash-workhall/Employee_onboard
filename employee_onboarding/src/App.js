import React from "react";
<<<<<<< HEAD
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import './App.css';
import UserDashboard from "./pages/UserDashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
=======
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserAuth from "./Components/UserAuthForm";
import  OnboardingForm from "./Components/OnboardingForm";
import DocumentUpload from "./Components/DocumentUploadForm";

import './App.css';
import AdminPage from "./Pages/AdminPage";
import UserDashboard from "./Pages/UserDashboard";
import UserDetial_Aview from "./Pages/UserDetial_Aview";
>>>>>>> f24c6cff6efe720a792c3cdbf98f340fc25e31c6

function App() {
  console.log("page refreshed");
  
  return (
<<<<<<< HEAD
   <BrowserRouter>
   <Routes>
    <Route path="/"  element={<UserDashboard/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<SignUp/>}/>
   </Routes>
   </BrowserRouter>
=======
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* User Authentication Page */}
          <Route path="/userauth" element={<UserAuth />} />

          {/* Employee Onboarding Page */}
          <Route path="/employee-onboard" element={<OnboardingForm />} />

          {/* Document Upload Page */}
          <Route path="/document-upload" element={<DocumentUpload />} />
          <Route path="/AdminDashboard" element={<AdminPage />} />
          <Route path="/UserDashboard" element={<UserDashboard />} />
          <Route path="/Userdetial" element={<UserDetial_Aview />} />
          {/* Redirect to UserAuth if no match is found */}
          <Route path="*" element={<UserAuth />} />
        </Routes>
      </div>
    </Router>
>>>>>>> f24c6cff6efe720a792c3cdbf98f340fc25e31c6
  );
}

export default App;