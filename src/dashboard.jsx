import React, { useEffect, useState } from "react";
import SymptomForm from "./symptomform";

export default function Dashboard({ token }) {
  const [env, setEnv] = useState(null);
  const [advice, setAdvice] = useState([]);
  const [symptoms, setSymptoms] = useState([]);

  async function loadDashboard() {
    const resEnv = await fetch("http://localhost:4000/api/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const dataEnv = await resEnv.json();
    setEnv(dataEnv.env);
    setAdvice(dataEnv.advice || []);

    const resSym = await fetch("http://localhost:4000/api/symptoms", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const dataSym = await resSym.json();
    setSymptoms(dataSym.symptoms || []);
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  async function onNewSymptom() {
    await loadDashboard();
  }

  return (
    <div className="dashboard">
      <h1>Health Dashboard</h1>

      <section className="card">
        <h2>Environment</h2>
        {env ? (
          <div>
            <div>Temp: {env.weather.temp}°C</div>
            <div>Condition: {env.weather.condition}</div>
            <div>AQI: {env.aqi.index} ({env.aqi.category})</div>
            <div>Pollen: {env.pollen.level}</div>
          </div>
        ) : (
          <div>No environment data</div>
        )}
      </section>

      <section className="card">
        <h2>Advice</h2>
        <ul>{advice.map((a, i) => <li key={i}>{a}</li>)}</ul>
      </section>

      <SymptomForm token={token} onLogged={onNewSymptom} />

      <section className="card">
        <h2>Recent Symptoms</h2>
        {symptoms.length === 0 ? <div>No logs yet</div> :
          <ul>
            {symptoms.map(s => (
              <li key={s.id}>
                <strong>{s.symptom_type}</strong> - {s.severity}/5 - {new Date(s.date_logged).toLocaleString()}
                <div>{s.notes}</div>
              </li>
            ))}
          </ul>
        }
      </section>
    </div>
  );
}
