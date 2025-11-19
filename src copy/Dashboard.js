import React from "react";
import SymptomForm from "./SymptomForm";

export default function Dashboard() {
  return (
    <div>
      <h1>Welcome to Health Advice Dashboard</h1>
      <SymptomForm />
      <div className="card">
        <h2>Recent Symptoms</h2>
        <p>No logs yet</p>
      </div>
    </div>
  );
}
