const API_URL = "http://127.0.0.1:8001/api"; // karena backend jalan di port 8001

export async function getStatus() {
  const res = await fetch(`${API_URL}/status`);
  if (!res.ok) {
    throw new Error(`Gagal memuat status: ${res.status}`);
  }
  return await res.json();
}

export async function createStatus(clientName) {
  const res = await fetch(`${API_URL}/status`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ client_name: clientName }),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Gagal menambahkan status: ${res.status} - ${errText}`);
  }
  return await res.json();
}
