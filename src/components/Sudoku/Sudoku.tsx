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

  // Function to update de value on the active cell
  const updateActiveCellValue = useCallback(
    (newValue: number) => {
      if (initialSudokuBoard[activeCell.row][activeCell.col] != 0) {
        return
      }

      const copyBoard = deepCopy(sudokuBoard)

      copyBoard[activeCell.row][activeCell.col] = newValue

      setSudokuBoard(copyBoard)
    },
    [activeCell, initialSudokuBoard, sudokuBoard]
  )

  // Function to update de position (row and col) of the active cell
  const updateActiveCell = (row: number, col: number) => {
    setActiveCell({ row: row, col: col })
  }

  // Function to calculate de position (row and col) of the active cell using the
  // arrow keys, then update the position.
  const moveActiveCell = useCallback(
    (direction: string) => {
      switch (direction) {
        case "ArrowUp":
          setActiveCell({
            row: clamp(activeCell.row - 1, 0, 8),
            col: activeCell.col,
          })

          break
        case "ArrowDown":
          setActiveCell({
            row: clamp(activeCell.row + 1, 0, 8),
            col: activeCell.col,
          })
          break
        case "ArrowLeft":
          setActiveCell({
            row: activeCell.row,
            col: clamp(activeCell.col - 1, 0, 8),
          })
          break
        case "ArrowRight":
          setActiveCell({
            row: activeCell.row,
            col: clamp(activeCell.col + 1, 0, 8),
          })
          break
      }
    },
    [activeCell]
  )

  // Function to change the dificulty of the sudoku
  const updateDifficulty = (newValue: SudokuDifficulty) => {
    setDifficulty(newValue)
  }

  useEffect(() => {
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
    const moves = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]
    const handleKeyDown = (event: KeyboardEvent) => {
      if (moves.includes(event.key)) {
        moveActiveCell(event.key)
      } else if (numbers.includes(event.key)) {
        updateActiveCellValue(parseInt(event.key))
      } else if (
        event.key == "Backspace" ||
        event.key == "Delete" ||
        event.key == "0"
      ) {
        updateActiveCellValue(0)
      }
    }
    // Adde event listener
    window.addEventListener("keydown", handleKeyDown)

    // clean event listener on component destroy
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [moveActiveCell, updateActiveCellValue])

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
        <div>
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
        </div>
      ) : undefined}
    </div>
  )
}
