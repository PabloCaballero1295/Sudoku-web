import { useState, useEffect, useCallback } from "react"
import { Board } from "../Board/Board"
import { getSudoku } from "sudoku-gen"
import { clamp, deepCopy } from "../../utils/utils"
import "./Sudoku.css"
import { SudokuHeader } from "../SudokuHeader/SudokuHeader"
import { SudokuDifficulty } from "../../constants/enum"
import { SUDOKU_CLUES_NUMBER } from "../../constants/constants"

export interface BoardCell {
  value: number
  notes: number[]
}

export const Sudoku = () => {
  const [initialSudokuBoard, setInitialSudokuBoard] = useState<number[][]>([])
  const [sudokuBoard, setSudokuBoard] = useState<BoardCell[][]>([])
  const [sudokuSolution, setSudokuSolution] = useState<number[][]>([])
  const [loading, setLoading] = useState(true)
  const [activeCell, setActiveCell] = useState({ row: 0, col: 0 })
  const [difficulty, setDifficulty] = useState(SudokuDifficulty.Easy)
  const [notesMode, setNotesMode] = useState(false)
  const [clues, setClues] = useState(SUDOKU_CLUES_NUMBER)

  const cols = 9
  const rows = 9

  // Function to update de value on the active cell
  const updateActiveCellValue = useCallback(
    (newValue: number) => {
      if (initialSudokuBoard[activeCell.row][activeCell.col] != 0) {
        return
      }

      const copyBoard = deepCopy(sudokuBoard)

      if (notesMode) {
        copyBoard[activeCell.row][activeCell.col].value = 0

        if (
          copyBoard[activeCell.row][activeCell.col].notes.includes(newValue)
        ) {
          const index = copyBoard[activeCell.row][
            activeCell.col
          ].notes.findIndex((n) => n == newValue)

          if (index != -1) {
            copyBoard[activeCell.row][activeCell.col].notes.splice(index, 1)
          }
        } else {
          copyBoard[activeCell.row][activeCell.col].notes.push(newValue)
        }
      } else {
        copyBoard[activeCell.row][activeCell.col].value = newValue
        copyBoard[activeCell.row][activeCell.col].notes = []
      }

      setSudokuBoard(copyBoard)
    },
    [activeCell, initialSudokuBoard, sudokuBoard, notesMode]
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

  // Function to change de boolean value
  const toggleNotesMode = useCallback(() => {
    setNotesMode(!notesMode)
  }, [notesMode])

  //Function to update a cell value when the user clicks on clue button
  const updateActiveCellValueWithClue = () => {
    if (clues <= 0) {
      return
    }

    const row = activeCell.row
    const col = activeCell.col

    if (initialSudokuBoard[row][col] !== 0) {
      return
    } else if (sudokuSolution[row][col] === sudokuBoard[row][col].value) {
      return
    }

    const solutionValue = sudokuSolution[row][col]
    updateActiveCellValue(solutionValue)
    setClues((prevState) => prevState - 1)
  }

  //This useEffect is used to handle All keyboard actions
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
      } else if (event.key == "n") {
        toggleNotesMode()
      }
    }
    // Adde event listener
    window.addEventListener("keydown", handleKeyDown)

    // clean event listener on component destroy
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [moveActiveCell, updateActiveCellValue, toggleNotesMode])

  useEffect(() => {
    setLoading(true)

    const sudoku = getSudoku(difficulty)

    const solution = sudoku.solution
    const puzzle = sudoku.puzzle

    const sudokuNumbers: BoardCell[][] = []
    const tempSudokuSolution: number[][] = []
    let n = 0

    for (let i = 0; i < rows; i++) {
      sudokuNumbers[i] = []
      for (let j = 0; j < cols; j++) {
        if (puzzle[n] == "-") {
          sudokuNumbers[i][j] = { value: 0, notes: [] }
        } else {
          sudokuNumbers[i][j] = { value: parseInt(puzzle[n]), notes: [] }
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
    setClues(SUDOKU_CLUES_NUMBER)
    setSudokuBoard(sudokuNumbers)

    const sudokuBoardNumbers: number[][] = []

    sudokuNumbers.map((row, i) => {
      sudokuBoardNumbers[i] = []
      row.map((_, j) => {
        sudokuBoardNumbers[i].push(sudokuNumbers[i][j].value)
      })
    })

    setInitialSudokuBoard(deepCopy(sudokuBoardNumbers))
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
            notesMode={notesMode}
            updateNotesMode={toggleNotesMode}
            clues={clues}
            handleClue={updateActiveCellValueWithClue}
          />
        </div>
      ) : undefined}
    </div>
  )
}
