import express from "express"
import * as controller from "../controllers/libros.api.controller.js"
import { validateLibro } from "../middlewares/libros.validate.js"
import { tokenValidate } from "../middlewares/token.validate.js"
import { resize, upload } from "../middlewares/imagenes.uploads.js"

const route = express.Router()

route.get("/", controller.getLibros)
route.get("/:id", controller.getLibroById)
route.post("/", [tokenValidate, upload.single("image"), resize, validateLibro], controller.saveLibro)
route.delete("/:id", tokenValidate, controller.deleteLibro)
route.patch("/:id", [tokenValidate, upload.single("image"), resize, validateLibro], controller.updateLibro)
route.put("/:id", [tokenValidate, upload.single("image"), resize, validateLibro], controller.replaceLibro)

export default route
