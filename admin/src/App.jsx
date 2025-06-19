import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import { Routes, Route } from "react-router-dom";
import List from "./pages/List";
import Add from "./pages/Add";
import Orders from "./pages/Orders";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login.jsx";
import { Toaster } from 'react-hot-toast';

export const currency = "₹"
export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem("token") : "");

  useEffect(()=>{
    localStorage.setItem("token",token)
  },[token])

  return (
    <div className="bg-gray-50 min-h-screen">
      <Toaster 
        position="bottom-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
            borderRadius: '12px',
            padding: '16px',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          },
          success: {
            duration: 3000,
            style: {
              background: 'linear-gradient(135deg, #10B981, #059669)',
              color: '#fff',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#10B981',
            },
          },
          error: {
            duration: 3000,
            style: {
              background: 'linear-gradient(135deg, #EF4444, #DC2626)',
              color: '#fff',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#EF4444',
            },
          },
        }}
      />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/list" element={<List token={token}/>} />
                <Route path="/add" element={<Add token={token}/>} />
                <Route path="/orders" element={<Orders token={token}/>} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
