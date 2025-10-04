import React, { useEffect, useState } from "react";
import { getStatus, createStatus } from "./api";

function App() {
  const [statusList, setStatusList] = useState([]);
  const [clientName, setClientName] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const data = await getStatus();
      setStatusList(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleAdd() {
    if (!clientName) return;
    try {
      await createStatus(clientName);
      setClientName("");
      loadData();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0))",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        backgroundColor: "#1e1e2f",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          padding: "30px",
          width: "400px",
          color: "white",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
          Glassmorphism Signup API
        </h1>

        <input
          type="text"
          placeholder="Masukkan nama client"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.3)",
            background: "rgba(255,255,255,0.1)",
            color: "white",
          }}
        />
        <button
          onClick={handleAdd}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            background: "rgba(255,255,255,0.2)",
            border: "none",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Tambah Status
        </button>

        <h2 style={{ marginTop: "20px" }}>Daftar Status</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {statusList.map((s) => (
            <li
              key={s.id}
              style={{
                background: "rgba(255,255,255,0.1)",
                margin: "5px 0",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              <b>{s.client_name}</b> —{" "}
              {new Date(s.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
