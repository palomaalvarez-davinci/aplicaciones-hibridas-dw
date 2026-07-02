import yup from "yup"

export const registerSchema = yup.object({
    email: yup.string().email("Email invalido").required("El email es obligatorio"),
    password: yup.string().required("La contraseña es obligatoria").min(8, "La contraseña debe tener al menos 8 caracteres"),
    passwordConfirm: yup.string().required("La confirmación de contraseña es obligatoria")
        .oneOf([yup.ref("password")], "Las contraseñas deben coincidir")
})

export const loginSchema = yup.object({
    email: yup.string().email("Email invalido").required("El email es obligatorio"),
    password: yup.string().required("La contraseña es obligatoria")
})