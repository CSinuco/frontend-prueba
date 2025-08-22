export default function Bottones({ type, onClick }) {
  

  const labels = {
    next: "Siguiente",
    back: "Atrás",
    confirm: "Confirmar",
  }

  return (
    <button
      onClick={onClick}
    >
      {labels[type]}
    </button>
  )
}