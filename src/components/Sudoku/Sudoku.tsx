import { useState, useEffect, useCallback } from "react"
import { Board } from "../Board/Board"
import { getSudoku } from "sudoku-gen"
import { clamp, deepCopy } from "../../utils/utils"
import "./Sudoku.css"
import { SudokuHeader } from "../SudokuHeader/SudokuHeader"
import { SudokuDifficulty } from "../../constants/enum"

export const Sudoku = () => {
  const [initialSudokuBoard, setInitialSudokuBoard] = useState<number[][]>([])
  const [sudokuBoard, setSudokuBoard] = useState<number[][]>([])
  const [sudokuSolution, setSudokuSolution] = useState<number[][]>([])
  const [loading, setLoading] = useState(true)
  const [activeCell, setActiveCell] = useState({ row: 0, col: 0 })
  const [difficulty, setDifficulty] = useState(SudokuDifficulty.Easy)

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

  const moveActiveCell = useCallback(
    (direction: string) => {
      switch (direction) {
        case "up":
          setActiveCell({
            row: clamp(activeCell.row - 1, 0, 8),
            col: activeCell.col,
          })

          break
        case "down":
          setActiveCell({
            row: clamp(activeCell.row + 1, 0, 8),
            col: activeCell.col,
          })
          break
        case "left":
          setActiveCell({
            row: activeCell.row,
            col: clamp(activeCell.col - 1, 0, 8),
          })
          break
        case "right":
          setActiveCell({
            row: activeCell.row,
            col: clamp(activeCell.col + 1, 0, 8),
          })
          break
      }
    },
    [activeCell]
  )

  const updateDifficulty = (newValue: SudokuDifficulty) => {
    setDifficulty(newValue)
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          moveActiveCell("up")
          break
        case "ArrowDown":
          moveActiveCell("down")
          break
        case "ArrowLeft":
          moveActiveCell("left")
          break
        case "ArrowRight":
          moveActiveCell("right")
          break
        default:
          break
      }
    }

    // Adde event listener
    window.addEventListener("keydown", handleKeyDown)

    // clean event listener on component destroy
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [moveActiveCell])

  useEffect(() => {
    setLoading(true)

    const sudoku = getSudoku(difficulty)

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
  }, [difficulty])

  return (
    <div className="sudoku-container">
      {!loading ? (
        <>
          <div>{activeCell.row}</div>
          <SudokuHeader
            difficulty={difficulty}
            updateDifficulty={updateDifficulty}
          />
          <Board
            initialBoard={initialSudokuBoard}
            solution={sudokuSolution}
            board={sudokuBoard}
            activeCell={activeCell}
            updateActiveCell={updateActiveCell}
            updateActiveCellValue={updateActiveCellValue}
          />
        </>
      ) : undefined}
    </div>
  )
}
