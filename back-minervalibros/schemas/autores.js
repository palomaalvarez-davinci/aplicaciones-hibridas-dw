import yup from "yup"

export const autorSchema = yup.object({
    nombre: yup.string().required("El nombre del autor es obligatorio"),
    pais: yup.string().required("El país es obligatorio"),
    nacimiento: yup.string().optional(),
    bio: yup.string().optional()
})