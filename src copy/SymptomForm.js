import React, { useState } from "react";

export default function SymptomForm({ onLogged }) {
  const [symptom, setSymptom] = useState("");
  const [severity, setSeverity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    console.log({ symptom, severity });
    setSymptom("");
    setSeverity(1);
    if (onLogged) onLogged();
  }

  return (
    <div className="card">
      <h2>Log Symptom</h2>
      <form onSubmit={handleSubmit}>
        <label>Symptom</label>
        <input value={symptom} onChange={(e) => setSymptom(e.target.value)} />
        <label>Severity (1-5)</label>
        <input type="number" min="1" max="5" value={severity} onChange={(e) => setSeverity(Number(e.target.value))} />
        <button type="submit" className="primary">Log</button>
      </form>
    </div>
  );
}
