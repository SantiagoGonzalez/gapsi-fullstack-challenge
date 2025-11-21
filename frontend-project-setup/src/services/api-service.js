import axios from "axios"

// Obtener la URL base desde las variables de entorno
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://jsonplaceholder.typicode.com"
const API_TIMEOUT = import.meta.env.VITE_API_TIMEOUT || 10000

// Crear instancia de axios con configuración por defecto
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
})

// Interceptor para requests - agregar token si existe
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Interceptor para responses - manejo de errores global
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      console.error("Error de respuesta:", error.response.status)

      if (error.response.status === 401) {
        // Manejar no autorizado
        localStorage.removeItem("token")
        window.location.href = "/login"
      }
    } else if (error.request) {
      // La petición fue hecha pero no se recibió respuesta
      console.error("Error de red:", error.request)
    } else {
      // Algo pasó al configurar la petición
      console.error("Error:", error.message)
    }
    return Promise.reject(error)
  },
)

// Exportar el cliente para usos personalizados
export default apiClient
