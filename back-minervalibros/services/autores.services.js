import { MongoClient, ObjectId } from "mongodb"

const MONGO_URI = "mongodb+srv://admin:admin@primerparcial.bk2zhuo.mongodb.net/"
const client = new MongoClient(MONGO_URI)
const db = client.db("AH20232CP1")

export async function getAutores() {
    await client.connect()
    return db.collection("autores").find().toArray()
}

export async function getAutorById(id) {
    await client.connect()
    return db.collection("autores").findOne({ _id: new ObjectId(id) })
}

export async function guardarAutor(autor) {
    await client.connect()
    await db.collection("autores").insertOne(autor)
    return autor
}

export async function eliminarAutor(id) {
    await client.connect()
    await db.collection("autores").deleteOne({ _id: new ObjectId(id) })
    return id
}

export async function editarAutor(autor) {
    await client.connect()
    await db.collection("autores").updateOne(
        { _id: new ObjectId(autor.id) }, { $set: autor }
    )
    return autor
}
