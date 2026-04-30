export function createPage(title, content) {
    let html = ""
    html += '<!DOCTYPE html>'
    html += '<html lang="es">'
    html += '<head>'
    html += '<meta charset="UTF-8">'
    html += '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
    html += '<title>' + title + '</title>'
    html += '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">'
    html += '<link rel="stylesheet" href="/styles/styles.css">'
    html += '</head>'
    html += '<body>'
    html += '<nav class="navbar navbar-dark bg-dark py-3">'
    html += '<div class="container">'
    html += '<a class="navbar-brand" href="/">Minerva Libros</a>'
    html += '<div>'
    html += '<a class="text-white me-3" href="/">Home</a>'
    html += '<a class="text-white me-3" href="/contacto.html">Contacto</a>'
    html += '<a class="text-white me-3" href="/libros">Libros</a>'
    html += '<a class="text-white me-3" href="/libros?genero=fantasía">Fantasia</a>'
    html += '<a class="text-white me-3" href="/libros?genero=ciencia">Ciencia Ficcion</a>'
    html += '</div>'
    html += '</div>'
    html += '</nav>'
    html += '<main>'
    html += content
    html += '</main>'
    html += '<footer class="bg-dark text-white text-center py-4 mt-5">'
    html += '<p class="mb-0">Primer Parcial - Aplicaciones Hibridas - Escuela DaVinci 1er cuatrimestre - Diseno y Desarrollo Web - Paloma Alvarez</p>'
    html += '</footer>'
    html += '</body>'
    html += '</html>'
    return html
}

export function createLibrosCards(libros) {
    let html = ""

    if (!libros || libros.length === 0) {
        return "<p>No hay libros para mostrar.</p>"
    }

    html += '<section class="libros-grid">'
    libros.forEach(libro => {
        html += `
            <article class="libro-card">
                <img
                    src="${libro.img || "/images/mh.png"}"
                    alt="${libro.nombre || "Libro sin titulo"}"
                    class="libro-card-image"
                >
                <div class="libro-card-body">
                    <h2 class="libro-card-title">${libro.nombre || "Sin titulo"}</h2>
                    <p><strong>Editorial:</strong> ${libro.editorial || "No informada"}</p>
                    <p><strong>Genero:</strong> ${libro.genero || "No informado"}</p>
                    <p><strong>Idioma:</strong> ${libro.idioma || "No informado"}</p>
                    <p><strong>Precio:</strong> $${libro.precio || "No disponible"}</p>
                </div>
                ${libro.link ? `<a href="${libro.link}" class="libro-card-link" target="_blank" rel="noopener noreferrer">Comprar</a>` : ""}
            </article>
        `
    })
    html += "</section>"

    return html
}
