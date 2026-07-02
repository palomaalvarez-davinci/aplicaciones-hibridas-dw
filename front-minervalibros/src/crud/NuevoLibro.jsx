import { useState } from "react"
import { useNavigate } from "react-router"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useApiLibros } from "../services/libros.services.jsx"
import { libroSchema } from "../schemas/libros.js"

const NuevoLibro = () => {
  const { saveLibro } = useApiLibros()
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({ mode: "onChange", resolver: yupResolver(libroSchema) })

  const onSubmit = async (data) => {
    setError(null)

    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "image" && value !== "" && value !== undefined) {
        formData.append(key, value)
      }
    })
    if (data.image?.[0]) formData.append("image", data.image[0])

    try {
      await saveLibro(formData)
      navigate("/libros")
    } catch (err) {
      setError(err.message || "No se pudo guardar el libro")
    }
  }

  return (
    <div className="form-page">
      <h1>Nuevo Libro</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div>
          <label>Nombre</label>
          <input className={errors.nombre ? "is-invalid" : ""} {...register("nombre")} />
          {errors.nombre && <p className="form-error">{errors.nombre.message}</p>}
        </div>
        <div>
          <label>Precio</label>
          <input className={errors.precio ? "is-invalid" : ""} {...register("precio")} />
          {errors.precio && <p className="form-error">{errors.precio.message}</p>}
        </div>
        <div>
          <label>Editorial</label>
          <input {...register("editorial")} />
        </div>
        <div>
          <label>Genero</label>
          <input {...register("genero")} />
        </div>
        <div>
          <label>Idioma</label>
          <input {...register("idioma")} />
        </div>
        <div>
          <label>Imagen</label>
          <input type="file" {...register("image")} />
        </div>
        <div>
          <label>Link</label>
          <input className={errors.link ? "is-invalid" : ""} {...register("link")} />
          {errors.link && <p className="form-error">{errors.link.message}</p>}
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : "Guardar"}
        </button>
        {error && <p className="form-error">{error}</p>}
      </form>
    </div>
  )
}

export default NuevoLibro
