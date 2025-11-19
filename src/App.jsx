import React, { useState } from "react";
import LoginForm from "./loginform";
import Dashboard from "./dashboard";
import "./style.css";

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
        {user && <button onClick={handleLogout}>Logout</button>}
      </header>

      <main>
        {!token ? (
          <LoginForm onLogin={handleLogin} />
        ) : (
          <Dashboard token={token} />
        )}
      </main>
    </div>
  );
}
