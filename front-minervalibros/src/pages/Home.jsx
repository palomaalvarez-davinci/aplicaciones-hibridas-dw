import { useUsuario } from "../context/session.context.jsx"

const Home = () => {
  const usuario = useUsuario()

  return (
    <div>
      <img className="masthead-image" src="/images/mh.png" alt="Minerva Libros" />
      <h1>Bienvenido a Minerva Libros</h1>
      {usuario ? (
        <p className="page-content">Hola, {usuario.email}. Explora los libros y las secciones.</p>
      ) : (
        <p className="page-content">Inicia sesion para ver la app completa.</p>
      )}
    </div>
  )
}

export default Home
