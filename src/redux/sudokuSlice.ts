import { createSlice } from "@reduxjs/toolkit"
import { SudokuDifficulty } from "../constants/enum"
import { SUDOKU_CLUES_NUMBER } from "../constants/constants"
import {
  createSudokuWithDifficulty,
  resetSudokuGame,
  updateBoardCellValue,
  updateBoardCellValueWithClue,
} from "../utils/utils"
import { SudokuState } from "../types"

const sudokuKey = "sudoku-storage"

const sudokuLocalStorageData = localStorage.getItem(sudokuKey)

const initialState: SudokuState = {
  id: "",
  board: [],
  initialBoard: [],
  solution: [],
  difficulty: SudokuDifficulty.Easy,
  clues: SUDOKU_CLUES_NUMBER,
  errors: 0,
  timeSpent: 0,
  isSolved: false,
  steps: [],
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
      state.difficulty = sudokuData.difficulty
      state.clues = sudokuData.clues
      state.errors = sudokuData.errors
      state.timeSpent = 0
      state.isSolved = false
      state.steps = sudokuData.steps

      saveStateOnLocalStorage(state)
    },
    updateSudoku: (state, action) => {
      const { id, board, solution, difficulty, clues, errors } = action.payload

      state.id = id
      state.board = board
      state.solution = solution
      state.difficulty = difficulty
      state.clues = clues
      state.errors = errors

      saveStateOnLocalStorage(state)
    },
    updateSudokuBoard: (state, action) => {
      const board = action.payload
      state.board = board
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
      state.difficulty = resetData.difficulty
      state.clues = resetData.clues
      state.errors = resetData.errors
      state.timeSpent = 0
      state.isSolved = false
      state.steps = []
      saveStateOnLocalStorage(state)
    },
    sudokuUseClue: (state, action) => {
      const activeCell = action.payload

      if (state.isSolved) {
        return
      }

      if (state.board[activeCell.row][activeCell.col].readonly) {
        return
      }

      const sudokuUpdatedData = updateBoardCellValueWithClue(
        state.board,
        state.solution,
        activeCell
      )
      state.board = sudokuUpdatedData.board
      state.clues = state.clues - 1
      saveStateOnLocalStorage(state)
    },
    updateSudokuActiveCellValue: (state, action) => {
      if (state.isSolved) {
        return
      }

      const { newValue, activeCell, notesMode } = action.payload

      if (state.board[activeCell.row][activeCell.col].readonly) {
        return
      }

      const sudokuUpdatedData = updateBoardCellValue(
        state.board,
        state.solution,
        activeCell,
        notesMode,
        newValue
      )

      state.board = sudokuUpdatedData.board
      if (sudokuUpdatedData.modifiedCells.length > 0) {
        state.steps.push(sudokuUpdatedData.modifiedCells)
      }
      if (sudokuUpdatedData.hasError) {
        state.errors = state.errors + 1
      }

      saveStateOnLocalStorage(state)
    },
    incrementSudokuTime(state) {
      state.timeSpent += 1
      saveStateOnLocalStorage(state)
    },
    updateSudokuSolved(state, action) {
      state.isSolved = action.payload
    },
    undoSudokuBoard(state) {
      if (state.steps.length <= 0) {
        return
      }
      const stepCells = state.steps.pop()

      stepCells?.map((cell) => {
        state.board[cell.row][cell.col].value = cell.value
        state.board[cell.row][cell.col].notes = cell.notes
      })
    },
  },
})

export const {
  createSudoku,
  updateSudoku,
  updateSudokuBoard,
  updateSudokuActiveCellValue,
  updateSudokuClues,
  updateSudokuErrors,
  resetSudoku,
  sudokuUseClue,
  incrementSudokuTime,
  updateSudokuSolved,
  undoSudokuBoard,
} = sudokuSlice.actions
export default sudokuSlice.reducer
