import { Cell } from "../Cell/Cell"
import { SudokuMenu } from "../SudokuMenu/SudokuMenu"

import "./Board.css"
import { useAppSelector } from "../../redux/hooks"

export const Board = () => {
  const sudoku = useAppSelector((state) => state.sudoku)

  return (
    <div className="sudoku-container">
      <div className="sudoku-flex">
        <div className="board">
          {sudoku.board.map((row, row_n) => (
            <div key={row_n} className="board-row">
              {row.map((col, col_n) => {
                return (
                  <Cell
                    key={`${row_n}_${col_n}`}
                    row={row_n}
                    col={col_n}
                    value={col.value}
                    notes={col.notes}
                    solutionValue={sudoku.solution[row_n][col_n]}
                    readOnly={col.readonly}
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
