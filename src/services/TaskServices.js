

export async function getTasks() {
  const res = await fetch("http://127.0.0.1:8000/api/tasks/")
  if (!res.ok) throw new Error("Error al traer las tareas")
  return res.json()
}

export async function deleteTask(id) {
  const res = await fetch(`http://127.0.0.1:8000/api/tasks/${id}/`, {
    method: "DELETE",
  })
  if (!res.ok) throw new Error("Error al eliminar la tarea")
  return true
}

export async function updateTask(id, data) {
  const res = await fetch(`http://127.0.0.1:8000/api/tasks/${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Error al actualizar la tarea")
  return res.json()
}
