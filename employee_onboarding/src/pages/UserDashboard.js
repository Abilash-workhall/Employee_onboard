import React from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export default function UserDashboard() {
  return (
    <main className="flex h-screen w-screen">
      <Sidebar />
      {/* <Navbar/> */}
      <div className="flex-1 p-4">
        <h1 className="text-2xl">Welcome to  Dashboard</h1>
        <p>This is  user dashboard content.</p>
      </div>
    </main>
  );
}
