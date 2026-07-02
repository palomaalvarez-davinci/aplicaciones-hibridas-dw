import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { useApiLibros } from "../services/libros.services.jsx"

const DeleteLibro = () => {
  const { id } = useParams()
  const { deleteLibro, getLibroById } = useApiLibros()
  const navigate = useNavigate()
  const [libro, setLibro] = useState(null)

  useEffect(() => {
    getLibroById(id).then((data) => setLibro(data))
  }, [id, getLibroById])

  const handleDelete = async () => {
    await deleteLibro(id)
    navigate("/libros")
  }

  return (
    <div className="page-content">
      <h1>Eliminar Libro</h1>
      {libro ? (
        <>
          <p>Nombre: {libro.nombre}</p>
          <p>Precio: {libro.precio}</p>
          <button className="button" onClick={handleDelete}>Confirmar eliminacion</button>
        </>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  )
}

export default DeleteLibro
