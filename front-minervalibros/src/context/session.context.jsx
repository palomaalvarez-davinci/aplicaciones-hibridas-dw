import { createContext, useContext, useMemo, useState } from "react"
import jwtDecode from "jwt-decode"

export const SessionContext = createContext()

export function useSession() {
  return useContext(SessionContext)
}

export function useUsuario() {
  const { usuario } = useSession()
  return usuario
}

export function useLogin() {
  const { onLogin } = useSession()
  return onLogin
}

export function useLogout() {
  const { onLogout } = useSession()
  return onLogout
}

export function useToken() {
  const { token } = useSession()
  return token
}

export function useRol() {
  const { token } = useSession()
  if (!token) return false
  const payload = jwtDecode(token)
  return payload?.rol || "user"
}

export function SessionProvider({ children }) {
  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.getItem("usuario"))
  )
  const [token, setToken] = useState(localStorage.getItem("token"))

  const onLogin = (jwt, usuario) => {
    localStorage.setItem("usuario", JSON.stringify(usuario))
    localStorage.setItem("token", jwt)
    setUsuario(usuario)
    setToken(jwt)
  }

  const onLogout = () => {
    setUsuario(null)
    setToken(null)
    localStorage.removeItem("usuario")
    localStorage.removeItem("token")
  }

  const value = useMemo(
    () => ({ usuario, token, onLogin, onLogout }),
    [usuario, token]
  )

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  )
}