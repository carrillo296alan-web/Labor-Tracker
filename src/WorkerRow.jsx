export default function WorkerRow({ worker, onUpdate, onRemove }) {
  return (
    <li
      style={{
        listStyle: "none",
        padding: 12,
        border: "1px solid #eee",
        borderRadius: 12,
        marginBottom: 10
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 800, marginBottom: 8 }}>
            <p>{worker.worker}</p>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 0.4 }}>Hours: </div>
              <input
                type="number"
                value={worker.hours}
                onChange={(e) => onUpdate(worker.id, { hours: Number(e.target.value) })}
                style={{ width: 120, padding: 8, borderRadius: 10, border: "1px solid #ddd" }}
              />
            </div>

            <div>
              <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 0.4 }}>Rate: </div>
              <input
                type="number"
                value={worker.rate}
                onChange={(e) => onUpdate(worker.id, { rate: Number(e.target.value) })}
                style={{ width: 120, padding: 8, borderRadius: 10, border: "1px solid #ddd" }}
              />
            </div>

            <div style={{ marginTop: 6 }}>
              <div style={{ fontSize: 12, opacity: 0.7, marginBottom: 4 }}>Line Total: </div>
              <div style={{ fontWeight: 800, paddingTop: 8 }}>${(worker.hours * worker.rate).toFixed(2)}</div>
            </div>
          </div>
        </div>
        <button onClick={() => onRemove(worker.id)}
          style={{
            height: 36,
            padding: "8px 10px",
            borderRadius: 10,
            border: "1px solid #ddd",
            cursor: "pointer"
          }}
        >
          Remove
        </button>
      </div>

    </li>
  );
}
