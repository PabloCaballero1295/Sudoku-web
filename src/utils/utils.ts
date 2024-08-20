import { SudokuDifficulty } from "../constants/enum"
import { getSudoku } from "sudoku-gen"
import { BoardCell } from "../../src/components/Sudoku/Sudoku"
import { SUDOKU_CLUES_NUMBER } from "../constants/constants"
import { v4 as uuidv4 } from "uuid"
import { SudokuState } from "../types"

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
      })
    }
  }

  newSudokuData.clues = SUDOKU_CLUES_NUMBER
  newSudokuData.board = deepCopy(newSudokuBoard)

  return newSudokuData
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

  for (let i = 0; i < 9; i++) {
    sudokuBoard[i] = []
    for (let j = 0; j < 9; j++) {
      if (puzzle[n] == "-") {
        sudokuBoard[i][j] = { value: 0, notes: [], readonly: false }
      } else {
        sudokuBoard[i][j] = {
          value: parseInt(puzzle[n]),
          notes: [],
          readonly: true,
        }
      }
      n++
    }
  }

  n = 0

  for (let i = 0; i < 9; i++) {
    sudokuSolution[i] = []
    for (let j = 0; j < 9; j++) {
      sudokuSolution[i][j] = parseInt(solution[n])
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
  }
}
