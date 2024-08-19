import { configureStore } from "@reduxjs/toolkit"
import sudokuReducer from "./sudokuSlice.ts"
import sudokuToolsReducer from "./sudokuToolsSlice.ts"

export const store = configureStore({
  reducer: {
    sudoku: sudokuReducer,
    sudokuTools: sudokuToolsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
