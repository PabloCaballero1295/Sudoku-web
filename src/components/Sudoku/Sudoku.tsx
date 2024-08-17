import { useEffect, useCallback } from "react"
import { Board } from "../Board/Board"
import { checkNextActiveCellBox, clamp, deepCopy } from "../../utils/utils"
import "./Sudoku.css"
import { SudokuHeader } from "../SudokuHeader/SudokuHeader"
import { SudokuDifficulty } from "../../constants/enum"
import { useAppSelector, useAppDispatch } from "../../redux/hooks"
import {
  updateSudokuBoard,
  updateSudokuErrors,
  updateSudokuActiveCell,
  updateSudokuNotesMode,
  updateSudokuClues,
  createSudoku,
} from "../../redux/sudokuSlice"

export interface BoardCell {
  value: number
  notes: number[]
  readonly: boolean
}

export const Sudoku = () => {
  const sudoku = useAppSelector((state) => state.sudoku)
  const dispatch = useAppDispatch()

  const sudokuBoard = sudoku.board
  const sudokuSolution = sudoku.solution
  const activeCell = sudoku.activeCell
  const notesMode = sudoku.notesMode
  const clues = sudoku.clues
  const errors = sudoku.errors

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
          dispatch(updateSudokuErrors(errors + 1))
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

      dispatch(updateSudokuBoard(copyBoard))
    },
    [activeCell, sudokuSolution, sudokuBoard, notesMode, dispatch, errors]
  )

  // Function to update de position (row and col) of the active cell
  const updateActiveCell = (row: number, col: number) => {
    dispatch(updateSudokuActiveCell({ row: row, col: col }))
    //setActiveCell({ row: row, col: col })
  }

  // Function to calculate de position (row and col) of the active cell using the
  // arrow keys, then update the position.
  const moveActiveCell = useCallback(
    (direction: string) => {
      switch (direction) {
        case "ArrowUp":
          dispatch(
            updateSudokuActiveCell({
              row: clamp(activeCell.row - 1, 0, 8),
              col: activeCell.col,
            })
          )

          break
        case "ArrowDown":
          dispatch(
            updateSudokuActiveCell({
              row: clamp(activeCell.row + 1, 0, 8),
              col: activeCell.col,
            })
          )
          break
        case "ArrowLeft":
          dispatch(
            updateSudokuActiveCell({
              row: activeCell.row,
              col: clamp(activeCell.col - 1, 0, 8),
            })
          )
          break
        case "ArrowRight":
          dispatch(
            updateSudokuActiveCell({
              row: activeCell.row,
              col: clamp(activeCell.col + 1, 0, 8),
            })
          )
          break
      }
    },
    [dispatch, activeCell.row, activeCell.col]
  )

  // Function to change de boolean value
  const toggleNotesMode = useCallback(() => {
    dispatch(updateSudokuNotesMode(sudoku.notesMode))
  }, [sudoku.notesMode, dispatch])

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
    dispatch(updateSudokuClues(sudoku.clues - 1))
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
    console.log(sudoku)
    if (sudoku.id == "") {
      dispatch(createSudoku(SudokuDifficulty.Easy))
    }
  }, [sudoku, dispatch])

  return (
    <div className="sudoku-container">
      <div>
        <SudokuHeader />
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
        />
      </div>
    </div>
  )
}
