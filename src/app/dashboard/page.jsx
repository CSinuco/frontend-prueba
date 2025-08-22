"use client"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import styles from "./DashboardPage.module.css"  // ⬅ importa el CSS

const API_URL = "https://backend-prueba-1-eln5.onrender.com/api/tasks/"

async function getTasks() {
  const res = await fetch(API_URL, { cache: "no-store" })
  if (!res.ok) throw new Error("Error al traer las tareas")
  return res.json()
}

async function deleteTask(id) {
  const res = await fetch(`${API_URL}${id}/`, { method: "DELETE" })
  if (!res.ok) throw new Error("Error al eliminar la tarea")
  return true
}

async function updateTask(id, data) {
  const res = await fetch(`${API_URL}${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error("Error al actualizar la tarea")
  return res.json()
}

export default function DashboardPage() {
  const queryClient = useQueryClient()
  const { data: tasks, isLoading, error } = useQuery({ queryKey: ["tasks"], queryFn: getTasks })

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => queryClient.invalidateQueries(["tasks"]),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateTask(id, data),
    onSuccess: () => queryClient.invalidateQueries(["tasks"]),
  })

  if (isLoading) return <p>Cargando...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className={styles.container}>
      <h1 className={styles.title}> Lista de Empresas</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Marca</th>
            <th>Titular</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
            <td>{task.id}</td>
              <td>{task.marca}</td>
              <td>{task.titular}</td>
              <td>{task.state ? "Activa " : "Inactiva "}</td>
              <td className={styles.actions}>
                <button
                  className={styles.deleteBtn}
                  onClick={() => deleteMutation.mutate(task.id)}
                >
                  Eliminar
                </button>
                <button
                  className={styles.updateBtn}
                  onClick={() =>
                    updateMutation.mutate({
                      id: task.id,
                      data: { ...task, state: !task.state },
                    })
                  }
                >
                  {task.state ? "Desactivar" : "Activar"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
