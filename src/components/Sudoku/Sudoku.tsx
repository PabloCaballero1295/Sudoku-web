import { useState, useEffect, useCallback } from "react"
import { Board } from "../Board/Board"
import { getSudoku } from "sudoku-gen"
import { checkNextActiveCellBox, clamp, deepCopy } from "../../utils/utils"
import "./Sudoku.css"
import { SudokuHeader } from "../SudokuHeader/SudokuHeader"
import { SudokuDifficulty } from "../../constants/enum"
import { SUDOKU_CLUES_NUMBER } from "../../constants/constants"
import { v4 as uuidv4 } from "uuid"

export interface BoardCell {
  value: number
  notes: number[]
  readonly: boolean
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
  const [errors, setErrors] = useState(0)
  const [sudokuId, setSudokuId] = useState(uuidv4())

  const cols = 9
  const rows = 9

  // Function to update de value on the active cell
  const updateActiveCellValue = useCallback(
    (newValue: number, isClue?: boolean) => {
      if (sudokuBoard[activeCell.row][activeCell.col].readonly) {
        return
      }

      const copyBoard = deepCopy(sudokuBoard)

      // Case used when the user wants to reset a cell state
      if (newValue === 0) {
        copyBoard[activeCell.row][activeCell.col].value = 0
        copyBoard[activeCell.row][activeCell.col].notes = []
      } else if (notesMode && !isClue) {
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
        if (isClue) {
          copyBoard[activeCell.row][activeCell.col].readonly = true
        }

        if (sudokuSolution[activeCell.row][activeCell.col] != newValue) {
          setErrors((prevState) => prevState + 1)
        }

        // Loops to check if notes exists on the same box or same row or col
        // if a number is inside notes in the cell, we will delete it
        copyBoard.map((row, row_index) => {
          row.map((cell, col_index) => {
            const sameBox = checkNextActiveCellBox(
              activeCell.row,
              activeCell.col,
              row_index,
              col_index
            )

            if (
              sameBox ||
              col_index == activeCell.col ||
              row_index == activeCell.row
            ) {
              if (cell.value == 0 && cell.notes.includes(newValue)) {
                const index = cell.notes.findIndex((n) => n == newValue)
                if (index > -1) {
                  cell.notes.splice(index, 1)
                }
              }
            }
          })
        })

        copyBoard[activeCell.row][activeCell.col].notes = []
      }

      setSudokuBoard(copyBoard)
    },
    [activeCell, sudokuSolution, sudokuBoard, notesMode]
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

  const resetGame = () => {
    const newSudokuBoard: BoardCell[][] = []

    for (let row = 0; row < rows; row++) {
      newSudokuBoard[row] = []
      for (let col = 0; col < cols; col++) {
        newSudokuBoard[row].push({
          value: initialSudokuBoard[row][col],
          notes: [],
          readonly: initialSudokuBoard[row][col] != 0 ? true : false,
        })
      }
    }

    setSudokuBoard(deepCopy(newSudokuBoard))

    setClues(SUDOKU_CLUES_NUMBER)
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

    if (sudokuBoard[row][col].readonly) {
      return
    } else if (sudokuSolution[row][col] === sudokuBoard[row][col].value) {
      return
    }

    const solutionValue = sudokuSolution[row][col]
    updateActiveCellValue(solutionValue, true)
    setClues((prevState) => prevState - 1)
  }

  const startNewGame = (newDifficulty: SudokuDifficulty) => {
    setDifficulty(newDifficulty)
    setSudokuId(uuidv4())
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
          sudokuNumbers[i][j] = { value: 0, notes: [], readonly: false }
        } else {
          sudokuNumbers[i][j] = {
            value: parseInt(puzzle[n]),
            notes: [],
            readonly: true,
          }
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
  }, [difficulty, sudokuId])

  return (
    <div className="sudoku-container">
      {!loading ? (
        <div>
          <SudokuHeader
            errors={errors}
            startNewGame={startNewGame}
            resetGame={resetGame}
          />
          <Board
            solution={sudokuSolution}
            board={sudokuBoard}
            activeCell={activeCell}
            updateActiveCell={updateActiveCell}
            updateActiveCellValue={updateActiveCellValue}
            notesMode={notesMode}
            updateNotesMode={toggleNotesMode}
            clues={clues}
            handleClue={updateActiveCellValueWithClue}
            startNewGame={startNewGame}
          />
        </div>
      ) : undefined}
    </div>
  )
}
