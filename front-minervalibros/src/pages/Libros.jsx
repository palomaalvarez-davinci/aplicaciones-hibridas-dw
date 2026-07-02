import { useEffect, useState } from "react"
import { Link } from "react-router"
import { useApiLibros } from "../services/libros.services.jsx"
import { getLibroImageSrc } from "../services/images.service.jsx"
import { useRol } from "../context/session.context.jsx"

const Libros = () => {
  const { getLibros } = useApiLibros()
  const rol = useRol()
  const [libros, setLibros] = useState([])

  useEffect(() => {
    getLibros().then((data) => setLibros(data))
  }, [getLibros])

  return (
    <div>
      <h1>Listado de libros disponibles</h1>
      {rol === "admin" && (
        <div className="page-content">
          <Link className="button" to="/libros/nuevo">Nuevo Libro</Link>
        </div>
      )}
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

export default Libros
