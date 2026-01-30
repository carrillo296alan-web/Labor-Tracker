import { useState, useEffect } from "react";
import WorkerRow from "./WorkerRow";

export default function App() {
  const [jobName, setJobName] = useState(() => {
    return localStorage.getItem("jobName") || "Fremont Job";
  }
  );

  const [material, setMaterial] = useState(() => {
    return localStorage.getItem("material") || 500;
  });

  const [workers, setWorkers] = useState([]);

  function updateWorkers(id, patch) {
    setWorkers((prev) =>
      prev.map((r) => r.id === id ? { ...r, ...patch } : r)
    );
  }

  async function addWorker() {
    const res = await fetch("http://localhost:3001/workers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        worker: "",
        hours: 0,
        rate: 0,
      }),
    });

    const newWorker = await res.json();

    setWorkers((prev) => [...prev, newWorker]);
  }


  function removeWorker(id) {
    setWorkers((prev) => prev.filter((w) => w.id !== id));
  }

  // loading workers into array from server
  useEffect(() => {
    async function loadWorkers() {
      const res = await fetch("http://localhost:3001/workers");
      const data = await res.json();
      setWorkers(data);
    }

    loadWorkers();
  }, []);

  /*
  useEffect(() => {
    localStorage.setItem("workers", JSON.stringify(workers));
  }, [workers]);
  */

  useEffect(() => {
    localStorage.setItem("jobName", jobName);
  }, [jobName]);

  useEffect(() => {
    localStorage.setItem("materials", String(material));
  }, [material]);

  const laborTotal = workers.reduce((sum, r) => sum + (r.hours || 0) * (r.rate || 0), 0);
  const grandTotal = laborTotal + (material || 0);

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 16, fontFamily: "system-ui" }}>
      <h1 style={{ margin: 0 }}> Labor Tracker</h1>
      <p style={{ marginTop: 8, opacity: 0.8 }}>Track Job, materials, and labor.</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 220px", gap: 12, marginTop: 18 }}>
        <div>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>Job Name</div>
          <input
            value={jobName}
            onChange={(e) => setJobName(e.target.value)}
            style={{ width: "90%", padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
          />
          <p>Current job: {jobName}</p>
        </div>

        <div>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>Materials</div>
          <div>
            <input
              type="number"
              value={material}
              onChange={(e) => setMaterial(Number(e.target.value))}
              style={{ width: "95%", padding: 10, borderRadius: 10, border: "1px solid #ddd" }}
            />
          </div>
          <p>Materials: {material}</p>
        </div>
      </div>

      <h1>Labor</h1>

      <ul>
        {workers.map((r) => (
          <WorkerRow
            key={r.id}
            worker={r}
            onUpdate={updateWorkers}
            onRemove={removeWorker}
          />
        ))}
      </ul>

      <button onClick={addWorker}
        style={{
          marginTop: 12,
          padding: "10px 12px",
          borderRadius: 12,
          border: "1px solid #ddd",
          cursor: "pointer",
          fontWeight: 700
        }}
      >
        + Add Worker
      </button>


      <div style={{ marginTop: 18, padding: 14, border: "1px solid #eee", borderRadius: 14 }}>
        <div style={{ fontWeight: 900, marginBottom: 10 }}>Totals</div>

        <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 12, opacity: 0.7 }}>Labor</div>
            <div style={{ fontWeight: 900 }}>${laborTotal.toFixed(2)}</div>
          </div>

          <div>
            <div style={{ fontSize: 12, opacity: 0.7 }}>Materials</div>
            <div style={{ fontWeight: 900 }}>${Number(material).toFixed(2)}</div>
          </div>

          <div>
            <div style={{ fontSize: 12, opacity: 0.7 }}>Grand Total</div>
            <div style={{ fontWeight: 900 }}>${grandTotal.toFixed(2)}</div>
          </div>
        </div>
      </div>

    </div>
  )
}