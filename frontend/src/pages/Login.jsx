import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      setMessage("✅ Login successful!");
      localStorage.setItem("token", res.data.token);
      navigate("/books");
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-xl shadow-lg w-80">
        <h2 className="text-center mb-4 text-2xl font-semibold text-gray-800">
          🔐 Login
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 outline-none"
            required
          />
          <button
            type="submit"
            className="p-3 bg-gradient-to-r from-blue-400 to-cyan-400 text-white rounded-lg font-bold hover:from-cyan-400 hover:to-blue-400 transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-400 hover:underline">
            Register here
          </a>
        </p>

        {message && (
          <p className="mt-2 text-center text-gray-700">{message}</p>
        )}
      </div>
    </div>
  );
}
