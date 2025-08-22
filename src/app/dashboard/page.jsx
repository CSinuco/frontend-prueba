"use client"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getTasks, deleteTask, updateTask } from "@/lib/api"
import styles from "./DashboardPage.module.css"

export default function DashboardPage() {
  const queryClient = useQueryClient()
  
  // Query para obtener tareas
  const { data: tasks, isLoading, error } = useQuery({ 
    queryKey: ["tasks"], 
    queryFn: getTasks,
    onError: (error) => {
      console.error("Error fetching tasks:", error)
    }
  })

  // Mutación para eliminar tareas
  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"])
      alert("Empresa eliminada correctamente")
    },
    onError: (error) => {
      alert(`Error al eliminar: ${error.message}`)
    }
  })

  // Mutación para actualizar tareas
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateTask(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"])
      alert("Estado de la empresa actualizado correctamente")
    },
    onError: (error) => {
      alert(`Error al actualizar: ${error.message}`)
    }
  })

  // Estados de carga y error
  if (isLoading) return <div className={styles.loading}>Cargando empresas...</div>
  if (error) return <div className={styles.error}>Error: {error.message}</div>

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lista de Empresas</h1>
      
      {tasks && tasks.length === 0 ? (
        <p className={styles.empty}>No hay empresas registradas</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
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
                <td>
                  <span className={task.state ? styles.statusActive : styles.statusInactive}>
                    {task.state ? "Activa" : "Inactiva"}
                  </span>
                </td>
                <td className={styles.actions}>
                  <button
                    className={styles.deleteBtn}
                    onClick={() => {
                      if (confirm(`¿Estás seguro de eliminar "${task.marca}"?`)) {
                        deleteMutation.mutate(task.id)
                      }
                    }}
                    disabled={deleteMutation.isLoading}
                  >
                    {deleteMutation.isLoading ? "Eliminando..." : "Eliminar"}
                  </button>
                  <button
                    className={styles.toggleBtn}
                    onClick={() => {
                      updateMutation.mutate({
                        id: task.id,
                        data: { ...task, state: !task.state },
                      })
                    }}
                    disabled={updateMutation.isLoading}
                  >
                    {updateMutation.isLoading 
                      ? "Actualizando..." 
                      : task.state ? "Desactivar" : "Activar"
                    }
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}