import { VscGithubInverted, VscSignOut } from 'react-icons/vsc'

import { useAuth } from '../../hooks/useAuth'
import styles from './styles.module.scss'

export function SendMessageForm() {
  const { user, signOut } = useAuth()

  return (
    <div className={styles.messageFormWrapper}>
      <button className={styles.signOutButton} onClick={signOut}>
        <VscSignOut size={32} />
      </button>

      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.login} />
        </div>

        <strong className={styles.userName}>
          {user?.name}
        </strong>
        <span className={styles.userGithub}>
          <VscGithubInverted size={16} />
          {user?.login}
        </span>
      </header>

      <form className={styles.messageForm} action="">
        <label htmlFor="message">Message</label>
        <textarea name="message" id="message" placeholder="What do you expect from this event?" />
        <button type="submit">Send Message</button>
      </form>
    </div>
  )
}