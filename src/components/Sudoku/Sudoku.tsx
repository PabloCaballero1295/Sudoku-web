import { useEffect, useCallback } from "react"
import { Board } from "../Board/Board"
import { clamp } from "../../utils/utils"
import "./Sudoku.css"
import { SudokuHeader } from "../SudokuHeader/SudokuHeader"
import { SudokuDifficulty } from "../../constants/enum"
import { useAppSelector, useAppDispatch } from "../../redux/hooks"
import {
  updateSudokuActiveCell,
  updateSudokuNotesMode,
  createSudoku,
  updateSudokuActiveCellValue,
} from "../../redux/sudokuSlice"

export interface BoardCell {
  value: number
  notes: number[]
  readonly: boolean
}

export const Sudoku = () => {
  const sudoku = useAppSelector((state) => state.sudoku)
  const dispatch = useAppDispatch()

  const activeCell = sudoku.activeCell

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

  //This useEffect is used to handle All keyboard actions
  useEffect(() => {
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
    const moves = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]
    const handleKeyDown = (event: KeyboardEvent) => {
      if (moves.includes(event.key)) {
        moveActiveCell(event.key)
      } else if (numbers.includes(event.key)) {
        dispatch(updateSudokuActiveCellValue(parseInt(event.key)))
      } else if (
        event.key == "Backspace" ||
        event.key == "Delete" ||
        event.key == "0"
      ) {
        dispatch(updateSudokuActiveCellValue(0))
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
  }, [moveActiveCell, toggleNotesMode, dispatch])

  useEffect(() => {
    if (sudoku.id == "") {
      dispatch(createSudoku(SudokuDifficulty.Easy))
    }
  }, [sudoku, dispatch])

  return (
    <div className="sudoku-container">
      <div>
        <SudokuHeader />
        <Board />
      </div>
    </div>
  )
}
