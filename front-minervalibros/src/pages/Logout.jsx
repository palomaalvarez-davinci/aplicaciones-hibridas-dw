import { useEffect } from "react"
import { useNavigate } from "react-router"
import { useLogout } from "../context/session.context.jsx"

const Logout = () => {
  const logout = useLogout()
  const navigate = useNavigate()

  useEffect(() => {
    logout()
    navigate("/login")
  }, [])

  return <div>Saliendo...</div>
}

export default Logout