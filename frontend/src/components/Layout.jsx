import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen w-full">
      {}
      <Navbar />

      {}
      <main className="flex-1 flex justify-center items-center bg-gray-50 w-full">
        {children}
      </main>

      {}
      <Footer />
    </div>
  );
}

