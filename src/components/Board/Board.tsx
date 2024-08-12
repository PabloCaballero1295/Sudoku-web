import { useState, useEffect, useRef } from "react"
import { Cell } from "../Cell/Cell"
import "./Board.css"

export const Board = () => {
  const rows: number = 9
  const cols: number = 9
  const grid: number[][] = []
  //let n = 1
  for (let i = 0; i < rows; i++) {
    grid[i] = []
    for (let j = 0; j < cols; j++) {
      grid[i][j] = 0
      //n++
    }
  }

  const [board, setBoard] = useState(grid)
  const [solution, setSolution] = useState(grid)
  const fetchCalled = useRef(false)

  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (!fetchCalled.current) {
      fetchCalled.current = true
      setLoading(true)

      fetch("https://sudoku-api.vercel.app/api/dosuku")
        .then((response) => response.json())
        .then((data) => {
          setBoard(data.newboard.grids[0].value)
          setSolution(data.newboard.grids[0].solution)
          setLoading(false)
          console.log("LOADING OFF")
        })
    }
  }, [])

  return (
    <div className="board">
      {loading ? (
        <p>LOADING</p>
      ) : (
        <>
          {board.map((row, row_n) => (
            <div key={row_n} className="board-row">
              {row.map((col, col_n) => (
                <Cell
                  key={`${row_n}_${col_n}`}
                  row={row_n}
                  col={col_n}
                  value={col}
                  readOnly={col != 0 ? true : false}
                />
              ))}
            </div>
          ))}
        </>
      )}
    </div>
  )
}
