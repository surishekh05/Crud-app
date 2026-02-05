import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import  AuthProvider from "./context/AuthContext";
import useAuth from "./hooks/useAuth";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import PublicRoute from "./components/Publicroute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProtectedRoute({ children }) {
const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  const [query, setQuery] = useState("");
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar query={query} setQuery={setQuery}/>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route path="/signup" element={
            <PublicRoute>
            <Register />
            </PublicRoute>
          } 
            />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <Tasks query={query}/>
              </ProtectedRoute>
            }
          />

            {/* If user goes to undefined route */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>

        <ToastContainer position="top-right" />
      </BrowserRouter>
    </AuthProvider>
  );
}
