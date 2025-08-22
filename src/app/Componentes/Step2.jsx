import Bottones from "./Botones"
import styles from "../registro/RegistroPage.module.css"

export default function Step2({ titular, setTitular, onNext, onBack }) {
  return (
    <div className={styles.stepContainer}>
      <h1>Información del titular</h1>
      <input
        type="text"
        placeholder="Titular de la marca"
        value={titular}
        onChange={(e) => setTitular(e.target.value)}
        className={styles.input}
      />
      <div className={styles.buttons}>
        <Bottones type="back" onClick={onBack} />
        <Bottones type="next" onClick={onNext} />
      </div>
    </div>
  )
}
