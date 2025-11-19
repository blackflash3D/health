import React, { useState } from "react";
import Dashboard from "./dashboard";
export default function LoginForm({ onLogin }) {
  const [mode, setMode] = useState("login"); // "login" or "register"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [postcode, setPostcode] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`http://localhost:4000/api/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body:
          mode === "login"
            ? JSON.stringify({ email, password })
            : JSON.stringify({ name, email, password, postcode }),
      });
      const data = await res.json();
      if (!res.ok) return setError(data.error || "Request failed");
      onLogin(data);
    } catch {
      setError("Network error");
    }
  }

  return (
    <div className="card auth-card">
      <h2>{mode === "login" ? "Sign In" : "Register"}</h2>
      <form onSubmit={handleSubmit}>
        {mode === "register" && (
          <>
            <label>Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </>
        )}
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {mode === "register" && (
          <>
            <label>Postcode (optional)</label>
            <input
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
            />
          </>
        )}
        <button type="submit" className="primary">
          {mode === "login" ? "Sign In" : "Create Account"}
        </button>
      </form>

      <div className="auth-toggle">
        <button onClick={() => setMode(mode === "login" ? "register" : "login")}>
          {mode === "login" ? "Create account" : "Back to sign in"}
        </button>
      </div>

      {error && <div className="error">{error}</div>}
    </div>
  );
}
