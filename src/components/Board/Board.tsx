import { useState, useEffect, useRef } from "react"
import { getSudoku } from "sudoku-gen"
import { Cell } from "../Cell/Cell"
import "./Board.css"
import { SudokuHeader } from "../SudokuHeader/SudokuHeader"
import { SudokuMenu } from "../SudokuMenu/SudokuMenu"

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
  //const fetchCalled = useRef(false)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)

    const sudoku = getSudoku("easy")

    const sudokuSolution = sudoku.solution
    const sudokuPuzzle = sudoku.puzzle

    const sudokuNumbers: number[][] = []
    const tempSudokuSolution: number[][] = []
    let n = 0

    for (let i = 0; i < 9; i++) {
      sudokuNumbers[i] = []
      for (let j = 0; j < 9; j++) {
        if (sudokuPuzzle[n] == "-") {
          sudokuNumbers[i][j] = 0
        } else {
          sudokuNumbers[i][j] = parseInt(sudokuPuzzle[n])
        }
        n++
      }
    }

    n = 0

    for (let i = 0; i < 9; i++) {
      tempSudokuSolution[i] = []
      for (let j = 0; j < 9; j++) {
        if (sudokuPuzzle[n] == "-") {
          tempSudokuSolution[i][j] = 0
        } else {
          tempSudokuSolution[i][j] = parseInt(sudokuSolution[n])
        }
        n++
      }
    }

    setBoard(sudokuNumbers)
    setSolution(tempSudokuSolution)
    setLoading(false)
  }, [])

  return (
    <div className="sudoku-container">
      <SudokuHeader />
      <div className="sudoku-flex">
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
        <SudokuMenu />
      </div>
    </div>
  )
}
