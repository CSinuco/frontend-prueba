const BASE_URL = "https://backend-prueba-1-eln5.onrender.com" || "http://127.0.0.1:8000";

export async function apiFetch(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  

  if (process.env.NODE_ENV === 'development') {
    console.log(' Making API request to:', url);
    console.log(' Request options:', options);
  }

  try {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    
    if (process.env.NODE_ENV === 'development') {
      console.log(' Response status:', res.status, res.statusText);
    }

    if (!res.ok) {
      let errorMessage = `Error ${res.status}: ${res.statusText}`;
      
      try {
        const errorData = await res.json();
        errorMessage = errorData.detail || errorData.message || errorMessage;
        
        if (errorData.errors) {
          errorMessage = Object.entries(errorData.errors)
            .map(([field, errors]) => `${field}: ${errors.join(', ')}`)
            .join('; ');
        }
      } catch (e) {
 
      }
      
      throw new Error(errorMessage);
    }

    if (res.status === 204) {
      return { success: true };
    }

    return res.json();
  } catch (error) {
    console.error(' API fetch error:', error.message);
    throw error;
  }
}

export async function getTasks() {
  return apiFetch("/api/tasks/", { cache: "no-store" });
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