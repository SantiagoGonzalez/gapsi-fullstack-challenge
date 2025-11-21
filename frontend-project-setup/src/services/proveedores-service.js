import apiClient from "./api-service"

// Extract the query to a constant
const QUERY_PROVEEDORES_PAGE = `
  query Proveedores($page: Int!, $size: Int!) {
    proveedores(page: $page, size: $size) {
      content {
        id
        nombre
        razonSocial
        direccion
      }
      totalElements
      totalPages
      pageNumber
      pageSize
    }
  }
`
const QUERY_AGREGAR_PROVEEDOR = `mutation AgregarProveedor($input: ProveedorInput!) { agregarProveedor(input: $input) { id nombre razonSocial direccion } } `;
const QUERY_ELIMINAR_PROVEEDOR = `mutation($id: ID!) { eliminarProveedor(id: $id) }`;

/**
 * POST - Obtener proveedores paginados
 * @param {number} page - Número de página
 * @param {number} size - Tamaño de página
 * @returns {Promise} Lista de proveedores
 */
export const getProveedoresPage = async (page, size) => {
  try {
    const response = await apiClient.post("/graphql", {
      query: QUERY_PROVEEDORES_PAGE,
      variables: {
        page: page,
        size: size,
      },
    })
    return response.data
  } catch (error) {
    throw new Error("Error al obtener proveedores: " + error.message)
  }
}

/**
 * POST - Obtener proveedores paginados
 * @param {number} nombre - nombre nuevo proveedor
 * @param {number} razonSocial - razonSocial nuevo proveedor
 * @param {number} direccion - direccion nuevo proveedor
 * @returns {Promise} Proveedor creado
 */
export const addProveedor = async (nombre, razonSocial, direccion) => {
  try {
    const response = await apiClient.post("/graphql", {
      query: QUERY_AGREGAR_PROVEEDOR,
      variables: {
        input: {
          nombre: nombre,
          razonSocial: razonSocial,
          direccion: direccion
        }  
      },
    })

    //not the best way to handle errors, but for now...
    if (response.data.errors) {
        throw new Error(response.data.errors[0].message)
    }

    return response.data
  } catch (error) {
    throw new Error("Error al agregar proveedor: " + error.message)
  }
}

/**
 * POST - Obtener proveedores paginados
 * @param {number} id - id proveedor a eliminar
 * @returns {boolean} resultado operacion
 */
export const deleteProveedor = async (id) => {
  try {
    const response = await apiClient.post("/graphql", {
      query: QUERY_ELIMINAR_PROVEEDOR,
      variables: {
        id: id
      },
    })
    return response.data
  } catch (error) {
    throw new Error("Error al eliminar proveedor: " + error.message)
  }
}

