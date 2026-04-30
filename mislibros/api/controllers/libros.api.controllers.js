import * as services from "../../services/libros.services.js"
import * as librosViews from "../../views/libros.views.js"

export function getLibros(req, res) {
    const filtros = req.query
    services.getLibros(filtros)
        .then (libros => res.status (200).json(libros))
        .catch(err=> res.status(500).json({ message: "Error del servidor"}))
}

export function getLibroById(req, res) {
    const id = req.params.id;
    services.getLibrosById(id)
        .then(libro => {
            if (!libro) {
                res.status(404).json({ message: "Libro no encontrado"});
            } else {
                res.status(200).json(libro);
            }
        })
        .catch(err => res.status(500).json({ message: "Error del servidor"}))
}

export function saveLibro(req, res) {
    if (!req.body?.nombre || !req.body?.precio) {
        res.status(400).json({ message: "El campo nombre y precio son obligatorios" })
        return
    }
    const libro = {
        nombre: req.body?.nombre,
        precio: req.body?.precio,
        editorial: req.body?.editorial,
        idioma: req.body?.idioma,
        paginas: req.body?.paginas,
        edicion: req.body?.edicion,
        tapa: req.body?.tapa,
        genero: req.body?.genero,
        img: req.body?.img,
        link: req.body?.link
    }
    services.guardarLibro(libro)
        .then((libro) => res.status(201).json(libro))
        .catch(err => res.status(500).json({ message: "Error interno del servidor" }))
}

export function deleteLibro(req, res) {
    if (!req.params?.id) return res.status(400).json({ message: "El id es requerido" })
    const id = req.params?.id
    services.eliminarLibro(id)
        .then(libro => {
            if (libro.message) {
                res.status(400).json(libro)
            } else {
                res.status(202).json(libro)
            }
        })
        .catch(err => res.status(500).json({ message: "Error interno del servidor" }))
}

export async function updateLibro(req, res) {
    if (!req.params?.id) return res.status(400).json({ message: "El id es requerido" })
    const id = req.params?.id
    const libroAnterior = await services.getLibrosById(id)
    
    if (!libroAnterior) {
        return res.status(404).json({ message: "Libro no encontrado" })
    }

    const libro = {}
    libro.id = id
    libro.nombre = req.body.nombre ? req.body?.nombre : libroAnterior?.nombre
    libro.precio = req.body.precio ? req.body?.precio : libroAnterior?.precio
    libro.editorial = req.body.editorial ? req.body?.editorial : libroAnterior?.editorial
    libro.idioma = req.body.idioma ? req.body?.idioma : libroAnterior?.idioma
    libro.paginas = req.body.paginas ? req.body?.paginas : libroAnterior?.paginas
    libro.edicion = req.body.edicion ? req.body?.edicion : libroAnterior?.edicion
    libro.tapa = req.body.tapa ? req.body?.tapa : libroAnterior?.tapa
    libro.genero = req.body.genero ? req.body?.genero : libroAnterior?.genero
    libro.img = req.body?.img ?? libroAnterior?.img
    libro.link = req.body?.link ?? libroAnterior?.link

    services.editarLibro(libro)
        .then(libro => res.status(202).json(libro))
        .catch(err => res.status(500).json({ message: "Error del servidor" }))
}

export async function replaceLibro(req, res) {
    if (!req.params?.id) return res.status(400).json({ message: "El id es requerido" })
    const id = req.params?.id
    const libro = {}
    libro.id = id
    libro.nombre = req.body?.nombre
    libro.precio = req.body?.precio
    libro.editorial = req.body?.editorial
    libro.idioma = req.body?.idioma
    libro.paginas = req.body?.paginas
    libro.edicion = req.body?.edicion
    libro.tapa = req.body?.tapa
    libro.genero = req.body?.genero
    libro.img = req.body?.img
    libro.link = req.body?.link

    services.editarLibro(libro)
        .then(libro => {
            if (Object.keys(libro).length != 0) {
                res.status(202).json(libro)
                return
            }
            res.status(404).json({ message: "No se pudo modificar el libro" })
        })
        .catch(err => res.status(500).json({ message: "Error del servidor" }))
}
