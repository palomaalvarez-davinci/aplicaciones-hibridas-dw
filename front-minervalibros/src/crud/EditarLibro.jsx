import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useApiLibros } from "../services/libros.services.jsx"
import { getLibroImageSrc } from "../services/images.service.jsx"
import { libroSchema } from "../schemas/libros.js"

const EditarLibro = () => {
  const { id } = useParams()
  const { getLibroById, updateLibro } = useApiLibros()
  const navigate = useNavigate()
  const [currentImage, setCurrentImage] = useState("")
  const [error, setError] = useState(null)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({ mode: "onChange", resolver: yupResolver(libroSchema) })

  useEffect(() => {
    getLibroById(id).then((data) => {
      reset({
        nombre: data.nombre || "",
        precio: data.precio || "",
        editorial: data.editorial || "",
        genero: data.genero || "",
        idioma: data.idioma || "",
        link: data.link || ""
      })
      setCurrentImage(data.img || "")
    })
  }, [id, getLibroById, reset])

  const onSubmit = async (data) => {
    setError(null)

    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "image" && value !== "" && value !== undefined) {
        formData.append(key, value)
      }
    })
    if (currentImage) formData.append("img", currentImage)
    if (data.image?.[0]) formData.append("image", data.image[0])

    try {
      await updateLibro(id, formData)
      navigate(`/libros/${id}`)
    } catch (err) {
      setError(err.message || "No se pudo editar el libro")
    }
  }

  return (
    <div className="form-page">
      <h1>Editar Libro</h1>
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
          {currentImage && (
            <img
              className="libro-card-image"
              src={getLibroImageSrc(currentImage)}
              alt="Imagen actual"
            />
          )}
          <input type="file" {...register("image")} />
        </div>
        <div>
          <label>Link</label>
          <input className={errors.link ? "is-invalid" : ""} {...register("link")} />
          {errors.link && <p className="form-error">{errors.link.message}</p>}
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Guardando..." : "Guardar Cambios"}
        </button>
        {error && <p className="form-error">{error}</p>}
      </form>
    </div>
  )
}

export default EditarLibro
