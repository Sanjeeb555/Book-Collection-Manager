import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-xl shadow-lg w-80">
        <h2 className="text-center mb-4 text-2xl font-semibold text-gray-800">
          📝 Register
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 outline-none"
            required
          />
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
            Register
          </button>
        </form>

        {message && (
          <p className="mt-2 text-center text-gray-700">{message}</p>
        )}

        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
