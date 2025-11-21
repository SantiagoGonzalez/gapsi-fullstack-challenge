import "@testing-library/jest-dom"

// Mock para variables de entorno
global.import = {
  meta: {
    env: {
      VITE_API_BASE_URL: "https://jsonplaceholder.typicode.com",
      VITE_API_TIMEOUT: 10000,
    },
  },
}
