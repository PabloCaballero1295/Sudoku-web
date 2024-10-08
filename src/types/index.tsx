import { SudokuDifficulty } from "../constants/enum"

export interface BoardCell {
  value: number
  notes: number[]
  readonly: boolean
  row: number
  col: number
}

export interface CellPos {
  row: number
  col: number
}

export interface SudokuState {
  id: string
  board: BoardCell[][]
  initialBoard: number[][]
  solution: number[][]
  difficulty: SudokuDifficulty
  clues: number
  errors: number
  timeSpent: number
  isSolved: boolean
  steps: BoardCell[][]
}
