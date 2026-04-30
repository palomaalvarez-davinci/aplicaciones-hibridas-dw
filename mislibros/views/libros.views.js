import { createPage , createLibrosCards } from "../page/utils.js"

export function createLibrosPage(libros, heading = "Listado de libros disponibles") {
    let html = `<h1>${heading}</h1>`
    return createPage("Libros", html + createLibrosCards(libros) )
}
