import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { RouterProvider } from "react-router/dom"
import { router } from "./routes/Router.jsx"
import { SessionProvider } from "./context/session.context.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SessionProvider>
      <RouterProvider router={router} />
    </SessionProvider>
  </StrictMode>
)
