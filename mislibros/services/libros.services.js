import { access, readFile, writeFile, constants } from 'fs/promises'
import { MongoClient, ObjectId } from 'mongodb'

const MONGO_URI = "mongodb+srv://admin:admin@primerparcial.bk2zhuo.mongodb.net/"

const client = new MongoClient(MONGO_URI)
const db = client.db("AH20232CP1")

function escapeRegex(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

export function getLibros(filtros = {}) {
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

export function getLibrosById(id) {
    return db.collection("libros").findOne({ _id: new ObjectId (id) })
}

export async function guardarLibro(libro) {
    try {
        await db.collection("libros").insertOne(libro)
        return libro
    } catch (error) {
        throw new Error("No se guardó el libro nuevo")
    }
}

export async function eliminarLibro(id) {
    try {
        await db.collection("libros").updateOne(
            { _id: new ObjectId(id) }, { $set: { eliminado: true}}
        )
        return id
    } catch (error) {
        throw new Error ("No se pudo eliminar el libro")
    }
}

export async function editarLibro(libro) {
    try {
        console.log(libro)
        await db.collection("libros").updateOne(
            { _id: new ObjectId(libro.id) }, { $set: libro }
        )
        return libro
    } catch (error) {
        throw new Error("No se pudo editar el libro")
    }
}
