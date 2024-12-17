import React from "react";
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from "react-router-dom";
import './App.css';
import UserDashboard from "./pages/UserDashboard";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function App() {
  console.log("page refreshed");
  
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/"  element={<UserDashboard/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<SignUp/>}/>
   </Routes>
   </BrowserRouter>
  );
}

export default App;