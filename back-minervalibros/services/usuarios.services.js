import { MongoClient, ObjectId } from 'mongodb'
import bcrypt from "bcryptjs"
import { crearToken } from "./token.services.js"

const MONGO_URI = "mongodb+srv://admin:admin@primerparcial.bk2zhuo.mongodb.net/"
const client = new MongoClient(MONGO_URI)
const db = client.db("AH20232CP1")

export async function createUser(usuario) {
    await client.connect()

    const existe = await db.collection("usuarios").findOne({ email: usuario.email })
    if (existe) throw new Error("El usuario ya existe")

    const passwordHash = await bcrypt.hash(usuario.password, 10)

    await db.collection("usuarios").insertOne({
        email: usuario.email,
        password: passwordHash,
        rol: "user"
    })

    return { email: usuario.email, rol: "user" }
}

export async function login(usuario) {
    await client.connect()

    const existe = await db.collection("usuarios").findOne({ email: usuario.email })
    if (!existe) throw new Error("Usuario o contraseña incorrectos")

    const esValido = await bcrypt.compare(usuario.password, existe.password)
    if (!esValido) throw new Error("Usuario o contraseña incorrectos")

    const token = crearToken({
        email: existe.email,
        rol: existe.rol || "user"
    })

    return { email: existe.email, rol: existe.rol || "user", token }
}
