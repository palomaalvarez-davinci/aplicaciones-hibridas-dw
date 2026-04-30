import * as librosService from "../services/libros.services.js";
import * as librosView from "../views/libros.views.js";


export function getLibros(req, res) {
    const filtros = { ...req.query }
    const genero = filtros?.genero?.trim()
    const heading = genero ? `Libros de ${genero}` : "Listado de libros disponibles"

    if (genero) {
        const generoNormalizado = genero
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()

        if (generoNormalizado.includes("fantas")) {
            filtros.genero = "fantas"
        } else if (generoNormalizado.includes("ciencia ficci")) {
            filtros.genero = "ciencia ficci"
        }
    }

    librosService.getLibros(filtros)
        .then(libros => res.send(librosView.createLibrosPage(libros, heading)))
}
