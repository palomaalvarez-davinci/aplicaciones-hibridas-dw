import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import usuariosRoute from "./routes/usuarios.routes.js"
import librosRoute from "./routes/libros.routes.js"
import autoresRoute from "./routes/autores.routes.js"

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.use("/uploads", express.static("uploads"))

app.use("/api/usuarios", usuariosRoute)
app.use("/api/libros", librosRoute)
app.use("/api/autores", autoresRoute)

app.listen(3333, () => console.log("Funcionando en http://localhost:3333"))
