import { VscGithubInverted } from 'react-icons/vsc'

import { useAuth } from '../../hooks/useAuth'
import styles from './styles.module.scss'

export function LoginBox() {
  const { signInURL } = useAuth()

  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Enter and share your message</strong>
      <a href={signInURL} className={styles.signInWithGithub}>
        <VscGithubInverted size={24} />
        Sign in with Github
      </a>
    </div>
  )
}
