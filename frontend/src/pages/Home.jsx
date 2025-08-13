import React from "react";
import Layout from "../components/Layout";

export default function Home() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full">
      <h2 className="text-2xl font-bold text-gray-800">
        Welcome to Book Manager
      </h2>
      <p className="mt-4 text-gray-600">
        Organize, track, and manage your book collection easily.
      </p>
    </div>
  );
}

