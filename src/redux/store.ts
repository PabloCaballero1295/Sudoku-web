import { configureStore } from "@reduxjs/toolkit"
import sudokuReducer from "./sudokuSlice.ts"

export const store = configureStore({
  reducer: {
    sudoku: sudokuReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
