import { useState } from "react";
import axios from "axios";

export default function Login() {
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
    } catch (err) {
      setMessage(err.response?.data?.message || "❌ Login failed");
    }
  };

  return (
    <div style={{
      height: "100vh",
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f5f5f5", 
    }}>
      <div style={{
        background: "#fff",
        padding: "2rem",
        borderRadius: "15px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        width: "320px",
      }}>
        <h2 style={{
          textAlign: "center",
          marginBottom: "1rem",
          color: "#333"
        }}>
          🔐 Login
        </h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              outline: "none",
              backgroundColor: "#fff",
              color: "#333"
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              outline: "none",
              backgroundColor: "#fff",
              color: "#333"
            }}
          />
          <button
            type="submit"
            style={{
              padding: "12px",
              background: "linear-gradient(90deg, #4facfe, #00f2fe)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "0.3s"
            }}
            onMouseOver={(e) => e.target.style.background = "linear-gradient(90deg, #00f2fe, #4facfe)"}
            onMouseOut={(e) => e.target.style.background = "linear-gradient(90deg, #4facfe, #00f2fe)"}
          >
            Login
          </button>
        </form>
        {message && <p style={{ marginTop: "10px", textAlign: "center", color: "#333" }}>{message}</p>}
      </div>
    </div>
  );
}
