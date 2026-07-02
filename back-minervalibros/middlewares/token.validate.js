import jwt from "jsonwebtoken"
import { validateToken } from "../services/token.services.js"

export async function tokenValidate(req, res, next) {
    try {
        const auth = req.headers.authorization
        if (!auth) return res.status(401).json({ message: "Token requerido" })

        const [bearer, token] = auth.split(" ")
        if (bearer !== "Bearer" || !token) return res.status(401).json({ message: "Formato del token invalido" })

        const usuario = validateToken(token)
        req.usuario = usuario
        next()
    } catch (error) {
        return res.status(401).json({ message: "Token invalido" })
    }
}