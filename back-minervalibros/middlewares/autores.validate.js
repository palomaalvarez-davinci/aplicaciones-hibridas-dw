import { autorSchema } from "../schemas/autores.js"

export function validateAutor(req, res, next) {
    autorSchema.validate(req.body, { abortEarly: false, stripUnknown: true })
        .then(() => next())
        .catch(err => res.status(400).json({ message: err.errors }))
}