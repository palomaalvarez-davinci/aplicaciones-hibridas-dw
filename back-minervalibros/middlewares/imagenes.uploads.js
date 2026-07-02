import multer from "multer"
import sharp from "sharp"

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, file.originalname.trim().replace(/ /g, "_"))
})

export const upload = multer({ storage })

export async function resize(req, res, next) {
    if (!req?.file) return next()

    const numeroAleatorio = Math.floor(Math.random() * 1000000)
    const imagen = "uploads/" + numeroAleatorio + ".webp"

    try {
        await sharp(req.file.path)
            .resize(500)
            .webp()
            .toFile(imagen)

        req.file = numeroAleatorio + ".webp"
        next()
    } catch (error) {
        return res.status(500).json({ message: "No se pudo procesar la imagen" })
    }
}
