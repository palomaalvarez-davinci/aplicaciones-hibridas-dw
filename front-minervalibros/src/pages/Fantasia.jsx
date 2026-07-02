import { useEffect, useState } from "react"
import { Link } from "react-router"
import { useApiLibros } from "../services/libros.services.jsx"
import { getLibroImageSrc } from "../services/images.service.jsx"

const Fantasia = () => {
  const { getLibros } = useApiLibros()
  const [libros, setLibros] = useState([])

  const normalizarGenero = (genero = "") =>
    genero.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()

  useEffect(() => {
    getLibros().then((data) => {
      const filtrados = data?.filter(
        (libro) => normalizarGenero(libro.genero) === "fantasia"
      )
      setLibros(filtrados)
    })
  }, [getLibros])

  return (
    <div>
      <h1>Libros de Fantasia</h1>
      <section className="libros-grid">
        {libros?.map((libro) => (
          <article className="libro-card" key={libro._id || libro.id}>
            <img
              className="libro-card-image"
              src={getLibroImageSrc(libro.img)}
              alt={libro.nombre || "Libro sin titulo"}
            />
            <div className="libro-card-body">
              <h2 className="libro-card-title">{libro.nombre || "Sin titulo"}</h2>
              <p><strong>Editorial:</strong> {libro.editorial || "No informada"}</p>
              <p><strong>Genero:</strong> {libro.genero || "No informado"}</p>
              <p><strong>Idioma:</strong> {libro.idioma || "No informado"}</p>
              <p><strong>Precio:</strong> ${libro.precio || "No disponible"}</p>
            </div>
            <Link className="libro-card-link" to={`/libros/${libro._id || libro.id}`}>
              Ver detalle
            </Link>
          </article>
        ))}
      </section>
    </div>
  )
}

export default Fantasia
