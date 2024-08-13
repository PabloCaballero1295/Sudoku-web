import { Cell } from "../Cell/Cell"
import { SudokuMenu } from "../SudokuMenu/SudokuMenu"

import "./Board.css"

interface BoardProps {
  initialBoard: number[][]
  solution: number[][]
  board: number[][]
  activeCell: { row: number; col: number }
  updateActiveCell: (row: number, col: number) => void
  updateActiveCellValue: (newValue: number) => void
}

export const Board = ({
  initialBoard,
  solution,
  board,
  activeCell,
  updateActiveCell,
  updateActiveCellValue,
}: BoardProps) => {
  return (
    <div className="sudoku-container">
      <div className="sudoku-flex">
        <div className="board">
          {board.map((row, row_n) => (
            <div key={row_n} className="board-row">
              {row.map((col, col_n) => {
                if (col_n == 8 && row_n == 8) {
                  //console.log(initialBoard[row_n][col_n])
                }
                return (
                  <Cell
                    key={`${row_n}_${col_n}`}
                    row={row_n}
                    col={col_n}
                    value={col}
                    solutionValue={solution[row_n][col_n]}
                    readOnly={initialBoard[row_n][col_n] != 0 ? true : false}
                    activeCell={activeCell}
                    updateActiveCell={updateActiveCell}
                  />
                )
              })}
            </div>
          ))}
        </div>
        <SudokuMenu updateActiveCell={updateActiveCellValue} />
      </div>
    </div>
  )
}
