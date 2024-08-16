import { Cell } from "../Cell/Cell"
import { BoardCell } from "../Sudoku/Sudoku"
import { SudokuMenu } from "../SudokuMenu/SudokuMenu"

import "./Board.css"

interface BoardProps {
  solution: number[][]
  board: BoardCell[][]
  activeCell: { row: number; col: number }
  updateActiveCell: (row: number, col: number) => void
  updateActiveCellValue: (newValue: number) => void
  notesMode: boolean
  updateNotesMode: () => void
  clues: number
  handleClue: () => void
}

export const Board = ({
  solution,
  board,
  activeCell,
  updateActiveCell,
  updateActiveCellValue,
  notesMode,
  updateNotesMode,
  clues,
  handleClue,
}: BoardProps) => {
  return (
    <div className="sudoku-container">
      <div className="sudoku-flex">
        <div className="board">
          {board.map((row, row_n) => (
            <div key={row_n} className="board-row">
              {row.map((col, col_n) => {
                return (
                  <Cell
                    key={`${row_n}_${col_n}`}
                    row={row_n}
                    col={col_n}
                    value={col.value}
                    notes={col.notes}
                    solutionValue={solution[row_n][col_n]}
                    readOnly={col.readonly}
                    activeCell={activeCell}
                    updateActiveCell={updateActiveCell}
                  />
                )
              })}
            </div>
          ))}
        </div>
        <SudokuMenu
          updateActiveCell={updateActiveCellValue}
          notesMode={notesMode}
          updateNotesMode={updateNotesMode}
          clues={clues}
          handleClue={handleClue}
        />
      </div>
    </div>
  )
}
