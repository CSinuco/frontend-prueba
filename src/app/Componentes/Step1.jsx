import Bottones from "./Botones"
import styles from "../registro/RegistroPage.module.css"

export default function Step1({ marca, setMarca, onNext }) {
  return (
    <div className={styles.stepContainer}>
      <h1>Información de la marca</h1>
      <input
        type="text"
        placeholder="Nombre de la marca"
        value={marca}
        onChange={(e) => setMarca(e.target.value)}
        className={styles.input}
      />
      <div className={styles.buttons}>
        <Bottones type="next" onClick={onNext} />
      </div>
    </div>
  )
}
