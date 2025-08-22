"use client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Bottones from "./Botones"
import styles from "../registro/RegistroPage.module.css"


const API_URL = "https://backend-prueba-1-eln5.onrender.com/api/tasks/"


async function createTask(taskData) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(taskData),
  })
  if (!res.ok) {
    
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.detail || errorData.message || "Error al crear la empresa")
  }
  return res.json()
}

export default function Step3({ marca, titular, onBack }) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: (data) => {
      alert(`Empresa "${marca}" registrada con ID: ${data.id}`)
      queryClient.invalidateQueries(["tasks"])
    },
    onError: (error) => {
      alert(`Error: ${error.message}`)
    },
  })

  const handleConfirm = () => {
    if (!marca.trim() || !titular.trim()) {
      alert("Por favor, complete todos los campos")
      return
    }
    
    mutation.mutate({ 
      marca: marca.trim(), 
      titular: titular.trim(), 
      state: true 
    })
  }

  return (
    <div className={styles.stepContainer}>
      <h1>Marca a registrar</h1>
      <input type="text" value={marca} readOnly className={styles.input} />

      <h1>Titular de la marca</h1>
      <input type="text" value={titular} readOnly className={styles.input} />

      <div className={styles.buttons}>
        <Bottones type="back" onClick={onBack} />
        <Bottones
          type="confirm"
          onClick={handleConfirm}
          disabled={mutation.isLoading}
        />
      </div>

      {mutation.isLoading && <p>Guardando...</p>}
    </div>
  )
}