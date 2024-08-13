import { useState, useEffect } from "react"
import { Board } from "../Board/Board"
import { getSudoku } from "sudoku-gen"
import { deepCopy } from "../../utils/utils"
import { Cell } from "../Cell/Cell"

export const Sudoku = () => {
  const [initialSudokuBoard, setInitialSudokuBoard] = useState<number[][]>([])
  const [sudokuBoard, setSudokuBoard] = useState<number[][]>([])
  const [sudokuSolution, setSudokuSolution] = useState<number[][]>([])
  const [loading, setLoading] = useState(true)
  const [activeCell, setActiveCell] = useState({ row: 0, col: 0 })

  const cols = 9
  const rows = 9

  const updateActiveCellValue = (newValue: number) => {
    if (initialSudokuBoard[activeCell.row][activeCell.col] != 0) {
      return
    }

    const copyBoard = deepCopy(sudokuBoard)

    copyBoard[activeCell.row][activeCell.col] = newValue

    setSudokuBoard(copyBoard)
  }

  const updateActiveCell = (row: number, col: number) => {
    setActiveCell({ row: row, col: col })
  }

  useEffect(() => {
    setLoading(true)

    const sudoku = getSudoku("hard")

    const solution = sudoku.solution
    const puzzle = sudoku.puzzle

    const sudokuNumbers: number[][] = []
    const tempSudokuSolution: number[][] = []
    let n = 0

    for (let i = 0; i < rows; i++) {
      sudokuNumbers[i] = []
      for (let j = 0; j < cols; j++) {
        if (puzzle[n] == "-") {
          sudokuNumbers[i][j] = 0
        } else {
          sudokuNumbers[i][j] = parseInt(puzzle[n])
        }
        n++
      }
    }

    n = 0

    for (let i = 0; i < rows; i++) {
      tempSudokuSolution[i] = []
      for (let j = 0; j < cols; j++) {
        tempSudokuSolution[i][j] = parseInt(solution[n])
        n++
      }
    }
    setSudokuBoard(sudokuNumbers)
    setInitialSudokuBoard(deepCopy(sudokuNumbers))
    setSudokuSolution(tempSudokuSolution)
    setLoading(false)
  }, [])

  return (
    <>
      {!loading ? (
        <Board
          initialBoard={initialSudokuBoard}
          solution={sudokuSolution}
          board={sudokuBoard}
          activeCell={activeCell}
          updateActiveCell={updateActiveCell}
          updateActiveCellValue={updateActiveCellValue}
        />
      ) : undefined}
    </>
  )
}
