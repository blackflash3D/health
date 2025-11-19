import React, { useState } from "react";
import LoginForm from "./LoginForm";
import Dashboard from "./Dashboard";
import "./styles.css";

export default function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  function handleLogin(data) {
    setToken(data.token);
    setUser(data.user);
  }

  function handleLogout() {
    setToken(null);
    setUser(null);
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="logo">Health Advice</div>
        <div className="topbar-buttons">
          {!token && <button>Create Account</button>}
          <button>Dark Mode</button>
          {user && <button onClick={handleLogout}>Logout</button>}
        </div>
      </header>

      <main>
        {!token ? <LoginForm onLogin={handleLogin} /> : <Dashboard token={token} />}
      </main>
    </div>
  );
}
