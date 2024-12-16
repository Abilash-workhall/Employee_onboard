import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserAuth from "./Components/UserAuthForm";
import  OnboardingForm from "./Components/OnboardingForm";
import DocumentUpload from "./Components/DocumentUploadForm";
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* User Authentication Page */}
          <Route path="/userauth" element={<UserAuth />} />

          {/* Employee Onboarding Page */}
          <Route path="/employee-onboard" element={<OnboardingForm />} />

          {/* Document Upload Page */}
          <Route path="/document-upload" element={<DocumentUpload />} />

          {/* Redirect to UserAuth if no match is found */}
          <Route path="*" element={<UserAuth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
