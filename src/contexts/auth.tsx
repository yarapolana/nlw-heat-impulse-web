import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";

interface IUser {
  id: string
  github_id: number
  name: string
  login: string
  avatar_url: string
}

interface ISignInResponse {
  user: IUser
  token: string
}

interface IAuthContextData {
  user: IUser | null
  signInURL: string
}

interface IAuthProviderProps {
  children: ReactNode
}

const TOKEN_STORAGE = '@dowhile:token'
const signInURL = `https://github.com/login/oauth/authorize?scope=user&client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_REDIRECT_URL}`

export const AuthContext = createContext({} as IAuthContextData)

export function AuthProvider({ children }: IAuthProviderProps) {
  const [user, setUser] = useState<IUser | null>(null)

  async function signIn(code: string) {
    await api.post<ISignInResponse>('authenticate', {
      code
    }).then(response => {
      setUser(response.data.user)

      localStorage.setItem(TOKEN_STORAGE, response.data.token)

      api.defaults.headers.common['Bearer Token']
    })
  }

  useEffect(() => {
    const url = window.location.href

    const hasGithubCode = url.includes('?code')

    if (hasGithubCode) {
      const [urlWithoutCode, githubCode] = url.split('?code=')

      signIn(githubCode)

      window.history.pushState({}, '', urlWithoutCode)
    }
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      signInURL
    }}>
      {children}
    </AuthContext.Provider>
  )
}
