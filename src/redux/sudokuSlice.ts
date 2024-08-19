import { createSlice } from "@reduxjs/toolkit"
import { SudokuDifficulty } from "../constants/enum"
import { SUDOKU_CLUES_NUMBER } from "../constants/constants"
import {
  checkNextActiveCellBox,
  createSudokuWithDifficulty,
  deepCopy,
  resetSudokuGame,
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
}

const saveStateOnLocalStorage = (data: SudokuState) => {
  console.log("SAVE")
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
      saveStateOnLocalStorage(state)
    },
    sudokuUseClue: (state, action) => {
      const activeCell = action.payload
      state.board[activeCell.row][activeCell.col].value =
        state.solution[activeCell.row][activeCell.col]
      state.board[activeCell.row][activeCell.col].notes = []
      state.board[activeCell.row][activeCell.col].readonly = true
      state.clues = state.clues - 1
      saveStateOnLocalStorage(state)
    },
    updateSudokuActiveCellValue: (state, action) => {
      const { newValue, activeCell, notesMode } = action.payload

      if (state.board[activeCell.row][activeCell.col].readonly) {
        return
      }

      const copyBoard = deepCopy(state.board)

      // Case used when the user wants to reset a cell state
      if (newValue === 0) {
        copyBoard[activeCell.row][activeCell.col].value = 0
        copyBoard[activeCell.row][activeCell.col].notes = []
      } else if (notesMode) {
        copyBoard[activeCell.row][activeCell.col].value = 0

        if (
          copyBoard[activeCell.row][activeCell.col].notes.includes(newValue)
        ) {
          const index = copyBoard[activeCell.row][
            activeCell.col
          ].notes.findIndex((n) => n == newValue)

          if (index != -1) {
            copyBoard[activeCell.row][activeCell.col].notes.splice(index, 1)
          }
        } else {
          copyBoard[activeCell.row][activeCell.col].notes.push(newValue)
        }
      } else {
        copyBoard[activeCell.row][activeCell.col].value = newValue
        if (state.solution[activeCell.row][activeCell.col] != newValue) {
          state.errors = state.errors + 1
        }

        // Loops to check if notes exists on the same box or same row or col
        // if a number is inside notes in the cell, we will delete it
        copyBoard.map((row, row_index) => {
          row.map((cell, col_index) => {
            const sameBox = checkNextActiveCellBox(
              activeCell.row,
              activeCell.col,
              row_index,
              col_index
            )

            if (
              sameBox ||
              col_index == activeCell.col ||
              row_index == activeCell.row
            ) {
              if (cell.value == 0 && cell.notes.includes(newValue)) {
                const index = cell.notes.findIndex((n) => n == newValue)
                if (index > -1) {
                  cell.notes.splice(index, 1)
                }
              }
            }
          })
        })

        copyBoard[activeCell.row][activeCell.col].notes = []
      }
      state.board = copyBoard
      saveStateOnLocalStorage(state)
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
} = sudokuSlice.actions
export default sudokuSlice.reducer
