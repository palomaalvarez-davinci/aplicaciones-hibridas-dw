import { Link } from "react-router"

const Error404 = () => {
  return (
    <div className="error-404">
      <h1>404</h1>
      <img className="error-404-image" src="/images/404.png" alt="Minerva Libros" />
      <h2>¡Página no encontrada!</h2>
      <p className="page-content">Parece que este libro se perdió en la biblioteca... </p>
      <Link className="button" to="/">Volver al inicio</Link>
    </div>
  )
}

export default Error404
