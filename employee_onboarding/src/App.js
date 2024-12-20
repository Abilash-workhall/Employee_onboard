import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard_a";
import ProtectedRoute from "./Routes/ProtectedLoginRoute";
import UserDetails from "./pages/UserDetails";
import UserModal from "./pages/UserModal";
const App = () => {
  const isLoggedIn = JSON.parse(localStorage.getItem("User_Detial"))?.role;

  return (
    <BrowserRouter>   
      <Routes>
        <Route path="/login" element={isLoggedIn ? <Navigate to="/userdashboard" /> : <LoginPage />} />
        <Route path="/signin" element={isLoggedIn ? <Navigate to="/userdashboard" /> : <SignUpPage />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/userdashboard" element={<UserDashboard />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/userdashboard/:id" element={<UserDetails/>}/>
          <Route path="/admindashboard/:id" element={<UserModal />} />
          <Route path="*" element={<p>Page Not found</p>} />

        </Route>
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;
