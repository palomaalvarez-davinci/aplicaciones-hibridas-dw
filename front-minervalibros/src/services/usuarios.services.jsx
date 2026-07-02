import { useApi } from "./api.service.jsx"

export const useApiUsuarios = () => {
  const { call } = useApi()

  const login = (credenciales) =>
    call("/usuarios/login", "POST", credenciales)

  const register = (email, password, passwordConfirm) =>
    call("/usuarios", "POST", {
      email,
      password,
      passwordConfirm
    })

  return { login, register }
}