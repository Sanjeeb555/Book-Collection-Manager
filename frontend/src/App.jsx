import React from "react";
import { Outlet } from "react-router-dom";
import Books from "./pages/Books";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Navbar /> {}
      <main className="flex-1 w-full px-4 py-6">
        <div className="max-w-7xl mx-auto w-full">
          <Outlet /> {}
        </div>
      </main>
      <Footer />
    </div>
  );
}
