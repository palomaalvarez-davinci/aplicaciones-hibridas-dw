import * as services from "../services/autores.services.js"

export function getAutores(req, res) {
    services.getAutores()
        .then(autores => res.status(200).json(autores))
        .catch(err => res.status(500).json({ message: "Error del servidor" }))
}

export function getAutorById(req, res) {
    const id = req.params.id
    services.getAutorById(id)
        .then(autor => {
            if (!autor) {
                res.status(404).json({ message: "Autor no encontrado" })
            } else {
                res.status(200).json(autor)
            }
        })
        .catch(err => res.status(500).json({ message: "Error del servidor" }))
}

export function saveAutor(req, res) {
    services.guardarAutor(req.body)
        .then(autor => res.status(201).json(autor))
        .catch(err => res.status(500).json({ message: "Error interno del servidor" }))
}

export function deleteAutor(req, res) {
    const id = req.params.id
    services.eliminarAutor(id)
        .then(result => res.status(202).json(result))
        .catch(err => res.status(500).json({ message: "Error interno del servidor" }))
}

export function updateAutor(req, res) {
    const id = req.params.id
    services.editarAutor({ id, ...req.body })
        .then(autor => res.status(202).json(autor))
        .catch(err => res.status(500).json({ message: "Error del servidor" }))
}

export function replaceAutor(req, res) {
    const id = req.params.id
    services.editarAutor({ id, ...req.body })
        .then(autor => res.status(202).json(autor))
        .catch(err => res.status(500).json({ message: "Error del servidor" }))
}