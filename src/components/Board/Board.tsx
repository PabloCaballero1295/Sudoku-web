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

  return (
    <div className="board">
      {/*
      {board.map((row, index) => {
        return (
          <div key={index} className="testing">
            {row.map((n: number, index) => {
              return <Cell key={index} n={n} />
            })}
          </div>
        )
      })}
      <br />
      <br />
      <br />*/}
      <>
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
      </>
    </div>
  )
}
