import { Link } from "react-router"
import { useUsuario } from "../context/session.context.jsx"

const NavBar = () => {
  const usuario = useUsuario()

  return (
    <nav className="navbar navbar-dark bg-dark py-3">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Minerva Libros
        </Link>
        <div className="navbar-links">
          <Link className="text-white" to="/">
            Home
          </Link>
          <Link className="text-white" to="/libros">
            Libros
          </Link>
          <Link className="text-white" to="/fantasia">
            Fantasia
          </Link>
          <Link className="text-white" to="/contacto">
            Contacto
          </Link>

          {!usuario ? (
            <>
              <Link className="text-white" to="/login">
                Login
              </Link>
              <Link className="text-white" to="/register">
                Registrar
              </Link>
            </>
          ) : (
            <Link className="text-white" to="/logout">
              Salir
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default NavBar
