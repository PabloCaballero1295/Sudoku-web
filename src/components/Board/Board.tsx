import { Cell } from "../Cell/Cell"
import { SudokuHeader } from "../SudokuHeader/SudokuHeader"
import { SudokuMenu } from "../SudokuMenu/SudokuMenu"

import "./Board.css"

interface BoardProps {
  initialBoard: number[][]
  board: number[][]
  activeCell: { row: number; col: number }
  updateBoardCell: (row: number, col: number, value: number) => void
  updateActiveCell: (row: number, col: number) => void
}

export const Board = ({
  initialBoard,
  board,
  activeCell,
  updateBoardCell,
  updateActiveCell,
}: BoardProps) => {
  return (
    <div className="sudoku-container">
      <SudokuHeader />
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
                    readOnly={initialBoard[row_n][col_n] != 0 ? true : false}
                    activeCell={activeCell}
                    updateBoardCell={updateBoardCell}
                    updateActiveCell={updateActiveCell}
                  />
                )
              })}
            </div>
          ))}
        </div>
        <SudokuMenu />
      </div>
    </div>
  )
}
