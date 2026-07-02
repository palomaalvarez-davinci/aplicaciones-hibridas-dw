import * as yup from "yup"

export const libroSchema = yup.object({
  nombre: yup.string().required("El nombre es obligatorio"),
  precio: yup.number()
    .typeError("El precio debe ser un numero")
    .positive("El precio debe ser un numero positivo")
    .required("El precio es obligatorio"),
  editorial: yup.string().optional(),
  genero: yup.string().optional(),
  idioma: yup.string().optional(),
  link: yup.string()
    .transform((value) => value || undefined)
    .url("El link debe ser una URL valida")
    .optional()
})
