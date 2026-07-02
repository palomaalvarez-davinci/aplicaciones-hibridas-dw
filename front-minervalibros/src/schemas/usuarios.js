import * as yup from "yup"

export const loginSchema = yup.object({
  email: yup.string().email("Email invalido").required("El email es obligatorio"),
  password: yup.string().required("La contraseña es obligatoria")
})

export const registerSchema = yup.object({
  email: yup.string().email("Email invalido").required("El email es obligatorio"),
  password: yup.string()
    .required("La contraseña es obligatoria")
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
  passwordConfirm: yup.string()
    .required("La confirmacion de contraseña es obligatoria")
    .oneOf([yup.ref("password")], "Las contraseñas deben coincidir")
})
