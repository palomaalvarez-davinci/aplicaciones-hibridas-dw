import { MongoClient, ObjectId } from "mongodb"
import fs from "fs/promises"

const MONGO_URI = "mongodb+srv://admin:admin@primerparcial.bk2zhuo.mongodb.net/"
const client = new MongoClient(MONGO_URI)
const db = client.db("AH20232CP1")

function esImagenSubida(img) {
    return img && !img.startsWith("http") && !img.startsWith("/images/")
}

async function eliminarImagenSubida(img) {
    if (!esImagenSubida(img)) return

    try {
        await fs.unlink("uploads/" + img)
    } catch (error) {
        if (error.code !== "ENOENT") throw error
    }
}

function escapeRegex(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

export async function getLibros(filtros = {}) {
    await client.connect()
    const filter = { eliminado: { $ne: true } }

    if (filtros?.precio_min) filter.precio = { "$gte": parseInt(filtros.precio_min) }
    if (filtros?.precio_max) filter.precio = { "$lte": parseInt(filtros.precio_max) }

    if (filtros?.precio_min && filtros?.precio_max) filter.$and = [
        { precio: { "$gte": parseInt(filtros.precio_min) } },
        { precio: { "$lte": parseInt(filtros.precio_max) } }
    ]

    if (filtros?.genero?.trim()) {
        filter.genero = {
            "$regex": `${escapeRegex(filtros.genero.trim())}`,
            "$options": "i"
        }
    }

    if (filtros?.editorial?.trim()) {
        filter.editorial = {
            "$regex": `${escapeRegex(filtros.editorial.trim())}`,
            "$options": "i"
        }
    }

    return db.collection("libros").find(filter).toArray()
}

export async function getLibrosById(id) {
    await client.connect()
    return db.collection("libros").findOne({ _id: new ObjectId(id) })
}

export async function guardarLibro(libro) {
    await client.connect()
    await db.collection("libros").insertOne(libro)
    return libro
}

export async function eliminarLibro(id) {
    await client.connect()
    const libro = await db.collection("libros").findOne({ _id: new ObjectId(id) })

    if (libro?.img) {
        await eliminarImagenSubida(libro.img)
    }

    await db.collection("libros").updateOne(
        { _id: new ObjectId(id) }, { $set: { eliminado: true } }
    )
    return id
}

export async function editarLibro(libro) {
    await client.connect()
    const libroAnterior = await db.collection("libros").findOne({ _id: new ObjectId(libro.id) })

    if (libro?.img && libro?.img !== libroAnterior?.img) {
        await eliminarImagenSubida(libroAnterior?.img)
    }

    await db.collection("libros").updateOne(
        { _id: new ObjectId(libro.id) }, { $set: libro }
    )
    return libro
}
