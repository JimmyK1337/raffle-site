import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import MyAccount from "./pages/MyAccount";
import AdminDashboard from "./pages/AdminDashboard";

import Navbar from "./components/layout/Navbar";
import EditProfile from "./pages/EditProfile";
import PaymentHistory from "./pages/PaymentHistory";
import LiveRaffles from "./pages/LiveRaffles";
import ResetPassword from "./pages/ResetPassword";


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected pages */}
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <MyAccount />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />{/* Password Reset */}
<Route path="/reset-password" element={<ResetPassword />} />

{/* Live raffle tracking */}
<Route path="/live-raffles" element={<LiveRaffles />} />

{/* Profile editing */}
<Route
  path="/edit-profile"
  element={
    <ProtectedRoute>
      <EditProfile />
    </ProtectedRoute>
  }
/>

{/* Payment history */}
<Route
  path="/payment-history"
  element={
    <ProtectedRoute>
      <PaymentHistory />
    </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}
