import jwt from "jsonwebtoken"

export function crearToken(usuario) {
    const token = jwt.sign(
        usuario,
        process.env.SECRET,
        { expiresIn: "2h" }
    )
    return token
}

export function validateToken(token) {
    const payload = jwt.verify(token, process.env.SECRET) 
    return payload
}