import apiClient from "./api-service"

// ==================== EJEMPLOS DE USO ====================

/**
 * GET - Obtener usuario hardcodeado para prueba
 * @returns {Promise} Lista de usuarios
 */
export const getCandidato = async () => {
  try {
    const response = await apiClient.get("/api/login/candidato/1")
    return response.data
  } catch (error) {
    throw new Error("Error al obtener candidato: " + error.message)
  }
}

/**
 * GET - Obtener un candidato por ID
 * @param {number} id - ID del candidato
 * @returns {Promise} Usuario
 */
export const getCandidatoById = async (id) => {
  try {
     const response = await apiClient.get(`/api/login/candidato/${id}`)
    return response.data
  } catch (error) {
    throw new Error(`Error al obtener candidato ${id}: ${error.message}`)
  }
}

/**
 * GET - Obtener version aplicacion
 * @returns {Promise} aplicacion
 */
export const getAppVersion = async () => {
  try {
     const response = await apiClient.get(`/api/login/appversion`)
    return response.data
  } catch (error) {
    throw new Error("Error al obtener version: " + error.message)
  }
}


// TODO: BORRAR 
// /**
//  * POST - Crear un nuevo recurso
//  * @param {Object} data - Datos del recurso a crear
//  * @returns {Promise} Recurso creado
//  */
// export const createResource = async (data) => {
//   try {
//     const response = await apiClient.post("/posts", data)
//     return response.data
//   } catch (error) {
//     throw new Error("Error al crear recurso: " + error.message)
//   }
// }

// /**
//  * PUT - Actualizar un recurso completo
//  * @param {number} id - ID del recurso
//  * @param {Object} data - Nuevos datos del recurso
//  * @returns {Promise} Recurso actualizado
//  */
// export const updateResource = async (id, data) => {
//   try {
//     const response = await apiClient.put(`/posts/${id}`, data)
//     return response.data
//   } catch (error) {
//     throw new Error(`Error al actualizar recurso ${id}: ${error.message}`)
//   }
// }

// /**
//  * PATCH - Actualizar parcialmente un recurso
//  * @param {number} id - ID del recurso
//  * @param {Object} data - Datos parciales del recurso
//  * @returns {Promise} Recurso actualizado
//  */
// export const patchResource = async (id, data) => {
//   try {
//     const response = await apiClient.patch(`/posts/${id}`, data)
//     return response.data
//   } catch (error) {
//     throw new Error(`Error al patchear recurso ${id}: ${error.message}`)
//   }
// }

// /**
//  * DELETE - Eliminar un recurso
//  * @param {number} id - ID del recurso a eliminar
//  * @returns {Promise} Confirmación de eliminación
//  */
// export const deleteResource = async (id) => {
//   try {
//     const response = await apiClient.delete(`/posts/${id}`)
//     return response.data
//   } catch (error) {
//     throw new Error(`Error al eliminar recurso ${id}: ${error.message}`)
//   }
// }

// /**
//  * GET con parámetros de query
//  * @param {Object} params - Parámetros de búsqueda
//  * @returns {Promise} Resultados filtrados
//  */
// export const searchResources = async (params) => {
//   try {
//     const response = await apiClient.get("/posts", { params })
//     return response.data
//   } catch (error) {
//     throw new Error("Error en la búsqueda: " + error.message)
//   }
// }


// // TODO : BORRA 
// /**
//  * GET con parámetros de query
//  * @param {Object} params - Parámetros de búsqueda
//  * @returns {Promise} Resultados filtrados
//  */
// export const getAllUsers = async () => {
//   try {
//     const response = await apiClient.get("/api/users", {})
//     return response.data
//   } catch (error) {
//     throw new Error("Error en la búsqueda: " + error.message)
//   }
// }