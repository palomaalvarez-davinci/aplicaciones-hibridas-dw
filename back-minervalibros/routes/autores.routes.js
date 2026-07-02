import express from "express"
import * as controller from "../controllers/autores.api.controllers.js"
import { validateAutor } from "../middlewares/autores.validate.js"
import { tokenValidate } from "../middlewares/token.validate.js"

const route = express.Router()

route.get("/", controller.getAutores)
route.get("/:id", controller.getAutorById)
route.post("/", [tokenValidate, validateAutor], controller.saveAutor)
route.delete("/:id", tokenValidate, controller.deleteAutor)
route.patch("/:id", [tokenValidate, validateAutor], controller.updateAutor)
route.put("/:id", [tokenValidate, validateAutor], controller.replaceAutor)

export default route