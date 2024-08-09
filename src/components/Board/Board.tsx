import { useState } from "react"
import { Cell } from "../Cell/Cell"
import "./Board.css"

export const Board = () => {
  const rows: number = 9
  const cols: number = 9
  const grid: number[][] = []
  let n = 1
  for (let i = 0; i < rows; i++) {
    grid[i] = []
    for (let j = 0; j < cols; j++) {
      grid[i][j] = n
      n++
    }
  }

  const [board, setBoard] = useState(grid)

  return (
    <div className="board">
      {board.map((row) => {
        return (
          <div className="testing">
            {row.map((n: number, index) => {
              return <Cell key={index} n={n} />
            })}
          </div>
        )
      })}
    </div>
  )
}
