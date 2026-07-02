import { useState } from "react"
import { useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useApiUsuarios } from "../services/usuarios.services.jsx"
import { registerSchema } from "../schemas/usuarios.js"

const Register = () => {
  const navigate = useNavigate()
  const { register: registerUser } = useApiUsuarios()
  const [error, setError] = useState(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({ mode: "onChange", resolver: yupResolver(registerSchema) })

  const onSubmit = async (data) => {
    setError(null)

    try {
      await registerUser(data.email, data.password, data.passwordConfirm)
      navigate("/login")
    } catch (err) {
      setError(err.message || "No se pudo registrar")
    }
  }

  return (
    <div className="form-page">
      <h1>Registro</h1>
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
        <div>
          <label>Confirmar Password:</label>
          <input
            type="password"
            className={errors.passwordConfirm ? "is-invalid" : ""}
            {...register("passwordConfirm")}
          />
          {errors.passwordConfirm && <p className="form-error">{errors.passwordConfirm.message}</p>}
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Registrando..." : "Registrarse"}
        </button>
        {error && <p className="form-error">{error}</p>}
      </form>
    </div>
  )
}

export default Register
