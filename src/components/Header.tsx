import rocket from '../assets/rocket.svg'

import styles from './Header.module.css'

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <img src={rocket} alt="Foguete" />
        <h1>
          to<span>do</span>
        </h1>
      </div>
    </header>
  )
}
