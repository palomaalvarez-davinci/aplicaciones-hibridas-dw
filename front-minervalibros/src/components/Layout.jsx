import { Outlet } from "react-router"
import NavBar from "./NavBar.jsx"

const Layout = () => {
  return (
    <div className="app-layout">
      <NavBar />
      <main>
        <Outlet />
      </main>
      <footer>
        <p>Segundo Parcial - Aplicaciones Hibridas - Escuela DaVinci 1er cuatrimestre - Diseno y Desarrollo Web - Paloma Alvarez</p>
      </footer>
    </div>
  )
}

export default Layout
