import { useApi } from "./api.service.jsx"

export const useApiLibros = () => {
  const { call } = useApi()

  const getLibros = () => call("/libros", "GET")
  const getLibroById = (id) => call("/libros/" + id, "GET")
  const saveLibro = (libro) => call("/libros", "POST", libro)
  const updateLibro = (id, libro) => call("/libros/" + id, "PUT", libro)
  const deleteLibro = (id) => call("/libros/" + id, "DELETE")

  return {
    getLibros,
    getLibroById,
    saveLibro,
    updateLibro,
    deleteLibro
  }
}
