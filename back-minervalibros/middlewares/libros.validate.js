import { libroSchema } from "../schemas/libros.js"

export function validateLibro(req, res, next) {
    libroSchema.validate(req.body, { abortEarly: false, stripUnknown: true })
        .then(() => next())
        .catch(err => res.status(400).json({ message: err.errors }))
}