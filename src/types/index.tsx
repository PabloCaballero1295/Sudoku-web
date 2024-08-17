import { SudokuDifficulty } from "../constants/enum"

export interface BoardCell {
  value: number
  notes: number[]
  readonly: boolean
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
  activeCell: CellPos
  difficulty: SudokuDifficulty
  notesMode: boolean
  clues: number
  errors: number
}
