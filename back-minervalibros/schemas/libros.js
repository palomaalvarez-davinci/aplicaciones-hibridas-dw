import yup from "yup"

export const libroSchema = yup.object({
    nombre: yup.string().required("El nombre es obligatorio"),
    precio: yup.number().positive("El precio debe ser un número positivo").required("El precio es obligatorio"),
    editorial: yup.string().optional(),
    genero: yup.string().optional(),
    idioma: yup.string().optional(),
    paginas: yup.number().integer("Las páginas deben ser un número entero").positive("Debe ser positivo").optional(),
    edicion: yup.string().optional(),
    tapa: yup.string().optional(),
    img: yup.string().optional(),
    link: yup.string().url("El link debe ser una URL valida").optional()
})