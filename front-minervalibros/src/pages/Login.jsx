import { useState } from "react"
import { useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useLogin } from "../context/session.context.jsx"
import { useApiUsuarios } from "../services/usuarios.services.jsx"
import { loginSchema } from "../schemas/usuarios.js"

const Login = () => {
  const navigate = useNavigate()
  const onLogin = useLogin()
  const { login } = useApiUsuarios()
  const [error, setError] = useState(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({ mode: "onChange", resolver: yupResolver(loginSchema) })

  const onSubmit = async (data) => {
    setError(null)

    try {
      const usuario = await login(data)
      onLogin(usuario.token, { email: usuario.email, rol: usuario.rol })
      navigate("/")
    } catch (err) {
      setError(err.message || "No se pudo loguear")
    }
  }

  return (
    <div className="form-page">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label>Email:</label>
          <input
            type="email"
            className={errors.email ? "is-invalid" : ""}
            {...register("email")}
          />
          {errors.email && <p className="form-error">{errors.email.message}</p>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            className={errors.password ? "is-invalid" : ""}
            {...register("password")}
          />
          {errors.password && <p className="form-error">{errors.password.message}</p>}
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Ingresando..." : "Ingresar"}
        </button>
        {error && <p className="form-error">{error}</p>}
      </form>
    </div>
  )
}

export default Login
