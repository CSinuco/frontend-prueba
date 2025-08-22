
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";

export async function apiFetch(endpoint, options = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`Error en la API: ${res.status}`);
  }

  return res.json();
}

export async function getTasks() {
  return apiFetch("/tasks/");
}


export async function createTask(taskData) {
  return apiFetch("/tasks/", {
    method: "POST",
    body: JSON.stringify(taskData),
  });
}

export async function updateTask(id, taskData) {
  return apiFetch(`/tasks/${id}/`, {
    method: "PUT",
    body: JSON.stringify(taskData),
  });
}


export async function deleteTask(id) {
  return apiFetch(`/tasks/${id}/`, {
    method: "DELETE",
  });
}
