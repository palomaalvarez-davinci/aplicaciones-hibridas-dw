import { lazy, Suspense } from "react"
import { createBrowserRouter } from "react-router"
import Layout from "../components/Layout.jsx"
import ProtectedRoute from "../components/ProtectedRoute.jsx"

const Home = lazy(() => import("../pages/Home.jsx"))
const Login = lazy(() => import("../pages/Login.jsx"))
const Register = lazy(() => import("../pages/Register.jsx"))
const Logout = lazy(() => import("../pages/Logout.jsx"))
const Libros = lazy(() => import("../pages/Libros.jsx"))
const Fantasia = lazy(() => import("../pages/Fantasia.jsx"))
const Contacto = lazy(() => import("../pages/Contacto.jsx"))
const NuevoLibro = lazy(() => import("../crud/NuevoLibro.jsx"))
const EditarLibro = lazy(() => import("../crud/EditarLibro.jsx"))
const DeleteLibro = lazy(() => import("../crud/DeleteLibro.jsx"))
const DetalleLibro = lazy(() => import("../pages/DetalleLibro.jsx"))
const Error404 = lazy(() => import("../pages/404.jsx"))

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            <Home />
          </Suspense>
        )
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            <Login />
          </Suspense>
        )
      },
      {
        path: "/register",
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            <Register />
          </Suspense>
        )
      },
      {
        path: "/logout",
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            <Logout />
          </Suspense>
        )
      },
      {
        path: "/libros",
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            <Libros />
          </Suspense>
        )
      },
      {
        path: "/fantasia",
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            <Fantasia />
          </Suspense>
        )
      },
      {
        path: "/contacto",
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            <Contacto />
          </Suspense>
        )
      },
      {
        path: "/libros/nuevo",
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            <ProtectedRoute element={<NuevoLibro />} rol={["admin"]} />
          </Suspense>
        )
      },
      {
        path: "/libros/editar/:id",
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            <ProtectedRoute element={<EditarLibro />} rol={["admin"]} />
          </Suspense>
        )
      },
      {
        path: "/libros/eliminar/:id",
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            <ProtectedRoute element={<DeleteLibro />} rol={["admin"]} />
          </Suspense>
        )
      },
      {
        path: "/libros/:id",
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            <DetalleLibro />
          </Suspense>
        )
      },
            {
        path: "*",
        element: (
          <Suspense fallback={<div>Cargando...</div>}>
            <Error404 />
          </Suspense>
        )
      }
    ]
  }
])
