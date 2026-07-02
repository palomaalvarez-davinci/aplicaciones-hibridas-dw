import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import { useApiLibros } from "../services/libros.services.jsx"
import { getLibroImageSrc } from "../services/images.service.jsx"
import { useRol } from "../context/session.context.jsx"

const DetalleLibro = () => {
  const { id } = useParams()
  const { getLibroById } = useApiLibros()
  const rol = useRol()
  const [libro, setLibro] = useState(null)

  useEffect(() => {
    getLibroById(id).then((data) => setLibro(data))
  }, [id, getLibroById])

  if (!libro) return <div className="page-content">Cargando...</div>

  return (
    <div className="page-content">
      <h1>{libro.nombre}</h1>
      <img
        className="detalle-libro-image"
        src={getLibroImageSrc(libro.img)}
        alt={libro.nombre || "Libro sin titulo"}
      />
      <p>Precio: {libro.precio}</p>
      <p>Editorial: {libro.editorial}</p>
      <p>Genero: {libro.genero}</p>
      <div className="detalle-actions">
        {libro.link && (
          <a className="button" href={libro.link} target="_blank" rel="noopener noreferrer">
            Comprar
          </a>
        )}
        {rol === "admin" && (
          <>
            <Link className="button" to={`/libros/editar/${id}`}>Editar</Link>
            <Link className="button" to={`/libros/eliminar/${id}`}>Eliminar</Link>
          </>
        )}
      </div>
    </div>
  )
}

export default DetalleLibro
