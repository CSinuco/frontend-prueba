"use client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import Bottones from "./Botones"
import styles from "../registro/RegistroPage.module.css"
import { createTask } from "@/lib/api"

export default function Step3({ marca, titular, onBack }) {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: (data) => {
      alert(`Empresa registrada con ID: ${data.id}`)
      
      queryClient.invalidateQueries(["tasks"])
    },
    onError: (error) => {
      alert(error.message)
    },
  })

  const handleConfirm = () => {
    mutation.mutate({ marca, titular, state: true })
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
