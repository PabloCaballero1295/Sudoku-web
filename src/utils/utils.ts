import { SudokuDifficulty } from "../constants/enum"
import { getSudoku } from "sudoku-gen"
import { SUDOKU_CLUES_NUMBER } from "../constants/constants"
import { v4 as uuidv4 } from "uuid"
import { BoardCell, CellPos, SudokuState } from "../types"

export function deepCopy<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

export const checkNextActiveCellBox = (
  activeRow: number,
  activeCol: number,
  row: number,
  col: number
) => {
  const boxRowAc = Math.floor(activeRow / 3)
  const boxColAc = Math.floor(activeCol / 3)

  if (boxRowAc == Math.floor(row / 3) && boxColAc == Math.floor(col / 3)) {
    return true
  } else {
    return false
  }
}

export const clamp = (val: number, min: number, max: number) =>
  Math.min(Math.max(val, min), max)

export const resetSudokuGame = (sudokuData: SudokuState) => {
  const newSudokuData = deepCopy(sudokuData)

  const newSudokuBoard: BoardCell[][] = []

  for (let row = 0; row < 9; row++) {
    newSudokuBoard[row] = []
    for (let col = 0; col < 9; col++) {
      newSudokuBoard[row].push({
        value: sudokuData.initialBoard[row][col],
        notes: [],
        readonly: sudokuData.initialBoard[row][col] != 0 ? true : false,
        row: row,
        col: col,
      })
    }
  }

  newSudokuData.clues = SUDOKU_CLUES_NUMBER
  newSudokuData.board = deepCopy(newSudokuBoard)

  return newSudokuData
}

export const updateBoardCellValue = (
  board: BoardCell[][],
  solution: number[][],
  activeCell: CellPos,
  notesMode: boolean,
  newValue: number
) => {
  const copyBoard = deepCopy(board)
  let hasError = false

  const modifiedCells: BoardCell[] = []
  modifiedCells.push(deepCopy(copyBoard[activeCell.row][activeCell.col]))

  // Case used when the user wants to reset a cell state
  if (newValue === 0) {
    copyBoard[activeCell.row][activeCell.col].value = 0
    copyBoard[activeCell.row][activeCell.col].notes = []
  } else if (notesMode) {
    copyBoard[activeCell.row][activeCell.col].value = 0

    if (copyBoard[activeCell.row][activeCell.col].notes.includes(newValue)) {
      const index = copyBoard[activeCell.row][activeCell.col].notes.findIndex(
        (n) => n == newValue
      )

      if (index != -1) {
        copyBoard[activeCell.row][activeCell.col].notes.splice(index, 1)
      }
    } else {
      copyBoard[activeCell.row][activeCell.col].notes.push(newValue)
    }
  } else {
    copyBoard[activeCell.row][activeCell.col].value = newValue
    if (solution[activeCell.row][activeCell.col] != newValue) {
      hasError = true
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
              modifiedCells.push(deepCopy(copyBoard[row_index][col_index]))
              cell.notes.splice(index, 1)
            }
          }
        }
      })
    })

    copyBoard[activeCell.row][activeCell.col].notes = []
  }

  return {
    board: copyBoard,
    hasError: hasError,
    modifiedCells: modifiedCells,
  }
}

export const updateBoardCellValueWithClue = (
  board: BoardCell[][],
  solution: number[][],
  activeCell: CellPos
) => {
  const copyBoard = deepCopy(board)

  copyBoard[activeCell.row][activeCell.col].value =
    solution[activeCell.row][activeCell.col]
  copyBoard[activeCell.row][activeCell.col].notes = []
  copyBoard[activeCell.row][activeCell.col].readonly = true

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
        if (
          cell.value == 0 &&
          cell.notes.includes(solution[activeCell.row][activeCell.col])
        ) {
          const index = cell.notes.findIndex(
            (n) => n == solution[activeCell.row][activeCell.col]
          )
          if (index > -1) {
            cell.notes.splice(index, 1)
          }
        }
      }
    })
  })

  return {
    board: copyBoard,
  }
}

export const checkSudokuIsSolved = (
  board: BoardCell[][],
  solution: number[][]
) => {
  let isCompleted = true

  for (let row = 0; row < 9; row++) {
    if (!isCompleted) {
      break
    }
    for (let col = 0; col < 9; col++) {
      if (board[row][col].value != solution[row][col]) {
        isCompleted = false
        break
      }
    }
  }

  return isCompleted
}

const transformDigitTo2DigitString = (n: number) => {
  let text = ""

  if (n < 10) {
    text = "0" + n.toString()
  } else {
    text = n.toString()
  }

  return text
}

export const getTimeSpent = (timeSpent: number) => {
  const hours = Math.floor(timeSpent / 3600)
  const minutes = Math.floor((timeSpent % 3600) / 60)
  const seconds = Math.floor((timeSpent % 3600) % 60)

  const hoursString = transformDigitTo2DigitString(hours)
  const minutesString = transformDigitTo2DigitString(minutes)
  const secondsString = transformDigitTo2DigitString(seconds)

  let timeSpentString = `${minutesString}:${secondsString}`

  if (hours > 0) {
    timeSpentString = `${hoursString}:` + timeSpentString
  }
  return timeSpentString
}

export const createSudokuWithDifficulty = (difficulty: SudokuDifficulty) => {
  const id = uuidv4()
  const sudoku = getSudoku(difficulty)

  const solution = sudoku.solution
  const puzzle = sudoku.puzzle

  const sudokuBoard: BoardCell[][] = []
  const sudokuSolution: number[][] = []
  let n = 0

  for (let row = 0; row < 9; row++) {
    sudokuBoard[row] = []
    for (let col = 0; col < 9; col++) {
      if (puzzle[n] == "-") {
        sudokuBoard[row][col] = {
          value: 0,
          notes: [],
          readonly: false,
          row: row,
          col: col,
        }
      } else {
        sudokuBoard[row][col] = {
          value: parseInt(puzzle[n]),
          notes: [],
          readonly: true,
          row: row,
          col: col,
        }
      }
      n++
    }
  }

  n = 0

  for (let row = 0; row < 9; row++) {
    sudokuSolution[row] = []
    for (let col = 0; col < 9; col++) {
      sudokuSolution[row][col] = parseInt(solution[n])
      n++
    }
  }

  const sudokuBoardNumbers: number[][] = []

  sudokuBoard.map((row, i) => {
    sudokuBoardNumbers[i] = []
    row.map((_, j) => {
      sudokuBoardNumbers[i].push(sudokuBoard[i][j].value)
    })
  })

  return {
    id: id,
    board: deepCopy(sudokuBoard),
    initialBoard: deepCopy(sudokuBoardNumbers),
    solution: deepCopy(sudokuSolution),
    activeCell: { row: 0, col: 0 },
    difficulty: difficulty,
    notesMode: false,
    clues: SUDOKU_CLUES_NUMBER,
    errors: 0,
    isSolved: false,
    steps: [],
  }
}
