"use client"
import { render, screen, fireEvent } from "@testing-library/react"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { configureStore } from "@reduxjs/toolkit"
import "@testing-library/jest-dom"
import HomePage from "../pages/home-page"
import { setUserData } from "../store/store"
import jest from "jest"

// Mock de MuiPickersUtilsProvider
jest.mock("@material-ui/pickers", () => ({
  MuiPickersUtilsProvider: ({ children }) => children,
  KeyboardDatePicker: ({ label, value, onChange }) => (
    <div>
      <label>{label}</label>
      <input type="date" value={value || ""} onChange={(e) => onChange(e.target.value)} data-testid="date-picker" />
    </div>
  ),
}))

// Crear un store de prueba
const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      user: (state = { name: "", age: "", entryDate: null }, action) => {
        switch (action.type) {
          case "user/setUserData":
            return { ...state, ...action.payload }
          default:
            return state
        }
      },
    },
    preloadedState: initialState,
  })
}

// Helper para renderizar con providers
const renderWithProviders = (component, { initialState = {} } = {}) => {
  const store = createTestStore(initialState)
  return {
    ...render(
      <Provider store={store}>
        <BrowserRouter>{component}</BrowserRouter>
      </Provider>,
    ),
    store,
  }
}

describe("HomePage Component", () => {
  test("renderiza el título correctamente", () => {
    renderWithProviders(<HomePage />)
    const titleElement = screen.getByText(/Página Principal/i)
    expect(titleElement).toBeInTheDocument()
  })

  test("renderiza los campos del formulario", () => {
    renderWithProviders(<HomePage />)

    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Edad/i)).toBeInTheDocument()
    expect(screen.getByText(/Fecha de Ingreso/i)).toBeInTheDocument()
  })

  test("actualiza el campo de nombre al escribir", () => {
    renderWithProviders(<HomePage />)

    const nameInput = screen.getByLabelText(/Nombre/i)
    fireEvent.change(nameInput, { target: { value: "Juan Pérez" } })

    expect(nameInput.value).toBe("Juan Pérez")
  })

  test("actualiza el campo de edad al escribir", () => {
    renderWithProviders(<HomePage />)

    const ageInput = screen.getByLabelText(/Edad/i)
    fireEvent.change(ageInput, { target: { value: "25" } })

    expect(ageInput.value).toBe("25")
  })

  test("muestra el botón de guardar", () => {
    renderWithProviders(<HomePage />)

    const saveButton = screen.getByRole("button", { name: /Guardar en Redux/i })
    expect(saveButton).toBeInTheDocument()
  })
})

describe("Redux Store", () => {
  test("setUserData action actualiza el estado", () => {
    const store = createTestStore()

    const userData = {
      name: "María García",
      age: "30",
      entryDate: new Date("2024-01-15"),
    }

    store.dispatch(setUserData(userData))

    const state = store.getState()
    expect(state.user.name).toBe("María García")
    expect(state.user.age).toBe("30")
  })
})

describe("Utils Tests", () => {
  test("formatCurrency formatea correctamente", () => {
    const { formatCurrency } = require("../utils/utils")
    const formatted = formatCurrency(1000)
    expect(formatted).toContain("1,000")
  })

  test("isValidEmail valida emails correctamente", () => {
    const { isValidEmail } = require("../utils/utils")
    expect(isValidEmail("test@example.com")).toBe(true)
    expect(isValidEmail("invalid-email")).toBe(false)
  })

  test("capitalize funciona correctamente", () => {
    const { capitalize } = require("../utils/utils")
    expect(capitalize("hola")).toBe("Hola")
    expect(capitalize("MUNDO")).toBe("Mundo")
  })
})
