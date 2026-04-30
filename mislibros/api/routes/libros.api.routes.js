import express from "express"
import * as controllers from "../controllers/libros.api.controllers.js"

const route = express.Router()

route.get("/libros", controllers.getLibros)
route.get("/libros/:id", controllers.getLibroById)
route.post("/libros", controllers.saveLibro)
route.delete("/libros/:id", controllers.deleteLibro)
route.patch("/libros/:id", controllers.updateLibro)
route.put("/libros/:id", controllers.replaceLibro)

export default route
