import React, { useState } from "react";

export default function SymptomForm({ token, onLogged }) {
  const [symptomType, setSymptomType] = useState("");
  const [severity, setSeverity] = useState(1);
  const [notes, setNotes] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch("http://localhost:4000/api/symptoms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ symptom_type: symptomType, severity, notes }),
    });
    setSymptomType(""); setSeverity(1); setNotes("");
    if (onLogged) onLogged();
  }

  return (
    <section className="card">
      <h2>Log Symptom</h2>
      <form onSubmit={handleSubmit}>
        <label>Symptom</label>
        <input value={symptomType} onChange={e => setSymptomType(e.target.value)} required />

        <label>Severity (1-5)</label>
        <input type="number" min="1" max="5" value={severity} onChange={e => setSeverity(Number(e.target.value))} />

        <label>Notes (optional)</label>
        <textarea value={notes} onChange={e => setNotes(e.target.value)} />

        <button type="submit" className="primary">Log</button>
      </form>
    </section>
  );
}
