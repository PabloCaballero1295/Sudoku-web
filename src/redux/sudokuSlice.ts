import { createSlice } from "@reduxjs/toolkit"
import { SudokuDifficulty } from "../constants/enum"
import { SUDOKU_CLUES_NUMBER } from "../constants/constants"
import { createSudokuWithDifficulty, resetSudokuGame } from "../utils/utils"
import { SudokuState } from "../types"

const sudokuKey = "sudoku-storage"

const sudokuLocalStorageData = localStorage.getItem(sudokuKey)

const initialState: SudokuState = {
  id: "",
  board: [],
  initialBoard: [],
  solution: [],
  activeCell: { row: 0, col: 0 },
  difficulty: SudokuDifficulty.Easy,
  notesMode: false,
  clues: SUDOKU_CLUES_NUMBER,
  errors: 0,
}

const saveStateOnLocalStorage = (data: SudokuState) => {
  localStorage.setItem(sudokuKey, JSON.stringify(data))
}

export const sudokuSlice = createSlice({
  name: "sudoku",
  initialState:
    sudokuLocalStorageData != null
      ? (JSON.parse(sudokuLocalStorageData) as SudokuState)
      : initialState,
  reducers: {
    createSudoku: (state, action) => {
      const difficulty = action.payload
      const sudokuData = createSudokuWithDifficulty(difficulty)
      state.id = sudokuData.id
      state.board = sudokuData.board
      state.initialBoard = sudokuData.initialBoard
      state.solution = sudokuData.solution
      state.activeCell = sudokuData.activeCell
      state.difficulty = sudokuData.difficulty
      state.notesMode = sudokuData.notesMode
      state.clues = sudokuData.clues
      state.errors = sudokuData.errors

      saveStateOnLocalStorage(state)
    },
    updateSudoku: (state, action) => {
      const { id, board, solution, difficulty, notesMode, clues, errors } =
        action.payload

      state.id = id
      state.board = board
      state.solution = solution
      state.difficulty = difficulty
      state.notesMode = notesMode
      state.clues = clues
      state.errors = errors

      saveStateOnLocalStorage(state)
    },
    updateSudokuBoard: (state, action) => {
      const board = action.payload
      state.board = board
      saveStateOnLocalStorage(state)
    },
    updateSudokuActiveCell: (state, action) => {
      const activeCell = action.payload
      state.activeCell = activeCell
      saveStateOnLocalStorage(state)
    },
    updateSudokuNotesMode: (state, action) => {
      const notesMode = action.payload
      state.notesMode = notesMode
      saveStateOnLocalStorage(state)
    },
    updateSudokuClues: (state, action) => {
      const clues = action.payload
      state.clues = clues
      saveStateOnLocalStorage(state)
    },
    updateSudokuErrors: (state, action) => {
      const errors = action.payload
      state.errors = errors
      saveStateOnLocalStorage(state)
    },
    resetSudoku: (state) => {
      const resetData = resetSudokuGame(state)
      state.id = resetData.id
      state.board = resetData.board
      state.initialBoard = resetData.initialBoard
      state.solution = resetData.solution
      state.activeCell = resetData.activeCell
      state.difficulty = resetData.difficulty
      state.notesMode = resetData.notesMode
      state.clues = resetData.clues
      state.errors = resetData.errors
      saveStateOnLocalStorage(state)
    },
  },
})

export const {
  createSudoku,
  updateSudoku,
  updateSudokuBoard,
  updateSudokuActiveCell,
  updateSudokuNotesMode,
  updateSudokuClues,
  updateSudokuErrors,
  resetSudoku,
} = sudokuSlice.actions
export default sudokuSlice.reducer
