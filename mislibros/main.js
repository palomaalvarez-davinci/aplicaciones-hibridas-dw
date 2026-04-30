import express from "express"
import librosApiRoute from './api/routes/libros.api.routes.js'
import librosRoutes from './routes/libros.routes.js'

const app = express()

app.use("/styles", express.static("styles"))
app.use("/", express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(librosRoutes)
app.use("/api", librosApiRoute)
app.listen(3333, console.log ("Funcionnado en el http://localhost:3333"))
