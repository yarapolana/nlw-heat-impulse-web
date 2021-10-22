import { LoginBox } from './components/LoginBox'
import styles from './styles/App.module.scss'

export function App() {

  return (
    <main className={styles.contentWrapper}>
      <LoginBox />
    </main>
  )
}
