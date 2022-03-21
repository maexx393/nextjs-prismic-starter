import { handler } from "functions/newsletter"
import styles from "./Button.module.scss"

const Button = ({ handler, type, children }) => {

  return (

    <button 
      className={`${styles.container} ${styles[type]}`}
      onClick={handler}
      >
      {children}
    </button>

  )
}

export default Button