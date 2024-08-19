import { createSlice } from "@reduxjs/toolkit"
import { CellPos } from "../types"

interface SudokuTools {
  activeCell: CellPos
  notesMode: boolean
}

const initialState: SudokuTools = {
  activeCell: { row: 0, col: 0 },
  notesMode: false,
}

export const sudokuToolsSlice = createSlice({
  name: "sudokuTools",
  initialState: initialState,
  reducers: {
    updateActiveCell: (state, action) => {
      const { row, col } = action.payload
      state.activeCell.row = row
      state.activeCell.col = col
    },
    toggleNotesMode: (state) => {
      state.notesMode = !state.notesMode
    },
  },
})

export const { updateActiveCell, toggleNotesMode } = sudokuToolsSlice.actions
export default sudokuToolsSlice.reducer
