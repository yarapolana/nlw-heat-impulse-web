import { useEffect, useState } from 'react'
import { api } from '../../services/api'

import logoImage from '../../assets/logo.svg'
import styles from './styles.module.scss'

interface IUser {
  id: string
  name: string
  login: string
  github_id: string
  avatar_url: string
}

interface IMessage {
  id: string
  text: string
  user_id: string
  user: IUser
  created_at: string
}

export function MessageList() {
  const [messages, setMessages] = useState<IMessage[]>([])

  useEffect(() => {
    api.get<IMessage[]>('messages/latest').then(response => setMessages(response.data))
  }, []) // when do I want to execute this function, pass variables, each time the variables change it executes this function again

  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImage} alt="DoWhile 2021" />

      <ul className={styles.messageList}>
        {messages.map((message) => <li key={message.id} className={styles.message}>
          <p className={styles.messageContent}>
            {message.text}
          </p>

          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img src={message.user.avatar_url} alt={message.user.login} />
            </div>
            <span>{message.user.name}</span>
          </div>
        </li>)}
      </ul>
    </div>
  )
}