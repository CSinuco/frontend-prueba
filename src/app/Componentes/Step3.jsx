"use client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createTask } from "@/lib/api"
import Bottones from "./Bottones"
import styles from "../registro/RegistroPage.module.css"
import { useState } from "react"

export default function Step3({ marca, titular, onBack }) {
  const queryClient = useQueryClient()
  const [errorMessage, setErrorMessage] = useState("")

  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: (data) => {
      alert(`¡Empresa "${marca}" registrada exitosamente con ID: ${data.id}!`)
      queryClient.invalidateQueries(["tasks"])
      // Aquí podrías redirigir o resetear el formulario
    },
    onError: (error) => {
      console.error("Error creating task:", error)
      setErrorMessage(error.message)
      alert(`Error al registrar: ${error.message}`)
    }
  })

  const handleConfirm = () => {
    // Validaciones
    if (!marca.trim()) {
      setErrorMessage("La marca es obligatoria")
      alert("Por favor, ingresa una marca")
      return
    }
    
    if (!titular.trim()) {
      setErrorMessage("El titular es obligatorio")
      alert("Por favor, ingresa un titular")
      return
    }
    
    setErrorMessage("")
    mutation.mutate({ 
      marca: marca.trim(), 
      titular: titular.trim(), 
      state: true 
    })
  }

  return (
    <div className={styles.stepContainer}>
      <h1>Resumen de Registro</h1>
      
      <div className={styles.summary}>
        <div className={styles.summaryItem}>
          <label>Marca:</label>
          <input type="text" value={marca} readOnly className={styles.input} />
        </div>
        
        <div className={styles.summaryItem}>
          <label>Titular:</label>
          <input type="text" value={titular} readOnly className={styles.input} />
        </div>
      </div>

      {errorMessage && (
        <div className={styles.errorMessage}>
          ❌ {errorMessage}
        </div>
      )}

      <div className={styles.buttons}>
        <Bottones 
          type="back" 
          onClick={onBack}
          disabled={mutation.isLoading}
        />
        <Bottones
          type="confirm"
          onClick={handleConfirm}
          disabled={mutation.isLoading}
          text={mutation.isLoading ? "Registrando..." : "Confirmar Registro"}
        />
      </div>

      {mutation.isLoading && (
        <div className={styles.loading}>
          <p>⏳ Guardando empresa en el sistema...</p>
        </div>
      )}
    </div>
  )
}