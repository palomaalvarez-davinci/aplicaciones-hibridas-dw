import { useToken } from "../context/session.context.jsx"

export function useApi() {
  const token = useToken()

  const call = (uri, method = "GET", body) => {
    const isFormData = body instanceof FormData

    return fetch("http://localhost:3333/api" + uri, {
      method,
      headers: {
        ...(!isFormData && { "Content-Type": "application/json" }),
        ...(token && { Authorization: "Bearer " + token })
      },
      body: body ? (isFormData ? body : JSON.stringify(body)) : undefined
    })
      .then(async (res) => {
        const data = await res.json()
        if (res.ok) return data
        throw new Error(data.message || "Error en la API")
      })
  }

  return { call }
}
