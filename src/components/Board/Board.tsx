import { useState, useEffect } from "react"
import { Cell } from "../Cell/Cell"
import { Box } from "../Box/Box"
import "./Board.css"
import { GetGridBoxes } from "../../utils/utils"

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
  const [gridBoxes, setGridBoxes] = useState(GetGridBoxes({ data: board }))

  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    fetch("https://sudoku-api.vercel.app/api/dosuku")
      .then((response) => response.json())
      .then((data) => {
        console.log("DATA RECEIVED")
        setBoard(data.newboard.grids[0].value)
        setGridBoxes(GetGridBoxes({ data: data.newboard.grids[0].value }))
        //setBoard(data.newboard.grids[0].solution)
        setLoading(false)
      })
  }, [])

  return (
    <div className="board">
      {loading ? (
        <p>LOADING</p>
      ) : (
        <div>
          <div className="board-row">
            <Box data={gridBoxes[0]} />
            <Box data={gridBoxes[1]} />
            <Box data={gridBoxes[2]} />
          </div>
          <div className="board-row">
            <Box data={gridBoxes[3]} />
            <Box data={gridBoxes[4]} />
            <Box data={gridBoxes[5]} />
          </div>
          <div className="board-row">
            <Box data={gridBoxes[6]} />
            <Box data={gridBoxes[7]} />
            <Box data={gridBoxes[8]} />
          </div>
        </div>
      )}
    </div>
  )
}
