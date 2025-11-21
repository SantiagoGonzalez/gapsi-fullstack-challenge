import { configureStore, createSlice } from "@reduxjs/toolkit"

// User data slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    age: "",
    entryDate: "",
  },
  reducers: {
    setUserData: (state, action) => {
      state.name = action.payload.name
      state.age = action.payload.age
      state.entryDate = action.payload.entryDate
    },
    clearUserData: (state) => {
      state.name = ""
      state.age = ""
      state.entryDate = null
    },
  },
})

export const { setUserData, clearUserData } = userSlice.actions

// Configure store
const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore date serialization warnings
        ignoredActions: ["user/setUserData"],
        ignoredPaths: ["user.entryDate"],
      },
    }),
})

export default store
