const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function apiFetch(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  
  // Log para depuración (solo en desarrollo)
  if (process.env.NODE_ENV === 'development') {
    console.log('Fetching URL:', url);
    console.log('Options:', options);
  }

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  // Manejo mejorado de errores
  if (!res.ok) {
    let errorMessage = `Error ${res.status}: ${res.statusText}`;
    
    try {
      const errorData = await res.json();
      errorMessage = errorData.detail || errorData.message || errorMessage;
      
      // Para errores de Django con estructura de campos
      if (errorData.errors) {
        errorMessage = Object.entries(errorData.errors)
          .map(([field, errors]) => `${field}: ${errors.join(', ')}`)
          .join('; ');
      }
    } catch (e) {
      // No se pudo parsear la respuesta como JSON
    }
    
    throw new Error(errorMessage);
  }

  // Para respuestas vacías en DELETE
  if (res.status === 204) {
    return null;
  }

  return res.json();
}

export async function getTasks() {
  return apiFetch("/api/tasks/");
}

export async function createTask(taskData) {
  return apiFetch("/api/tasks/", {
    method: "POST",
    body: JSON.stringify(taskData),
  });
}

export async function updateTask(id, taskData) {
  return apiFetch(`/api/tasks/${id}/`, {
    method: "PUT",
    body: JSON.stringify(taskData),
  });
}

export async function deleteTask(id) {
  return apiFetch(`/api/tasks/${id}/`, {
    method: "DELETE",
  });
}