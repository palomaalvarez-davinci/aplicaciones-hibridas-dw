import express from 'express'
import * as librosControllers from "../controllers/libros.controllers.js"

const router = express.Router()

router.get("/libros", librosControllers.getLibros)

export default router
