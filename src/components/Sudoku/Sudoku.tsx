import { useEffect, useCallback } from "react"
import { Board } from "../Board/Board"
import { checkSudokuIsSolved, clamp } from "../../utils/utils"
import "./Sudoku.css"
import { SudokuHeader } from "../SudokuHeader/SudokuHeader"
import { SudokuDifficulty } from "../../constants/enum"
import { useAppSelector, useAppDispatch } from "../../redux/hooks"
import {
  createSudoku,
  updateSudokuActiveCellValue,
  updateSudokuSolved,
} from "../../redux/sudokuSlice"
import { toggleNotesMode, updateActiveCell } from "../../redux/sudokuToolsSlice"
import { GameFinishModal } from "../Modal/GameFinishModal/GameFinishModal"

export const Sudoku = () => {
  const sudoku = useAppSelector((state) => state.sudoku)
  const sudokuTools = useAppSelector((state) => state.sudokuTools)
  const dispatch = useAppDispatch()

  const activeCell = sudokuTools.activeCell

  // Function to calculate de position (row and col) of the active cell using the
  // arrow keys, then update the position.
  const moveActiveCell = useCallback(
    (direction: string) => {
      switch (direction) {
        case "ArrowUp":
          dispatch(
            updateActiveCell({
              row: clamp(activeCell.row - 1, 0, 8),
              col: activeCell.col,
            })
          )

          break
        case "ArrowDown":
          dispatch(
            updateActiveCell({
              row: clamp(activeCell.row + 1, 0, 8),
              col: activeCell.col,
            })
          )
          break
        case "ArrowLeft":
          dispatch(
            updateActiveCell({
              row: activeCell.row,
              col: clamp(activeCell.col - 1, 0, 8),
            })
          )
          break
        case "ArrowRight":
          dispatch(
            updateActiveCell({
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
  const handleNotesModeButton = useCallback(() => {
    dispatch(toggleNotesMode())
  }, [dispatch])

  //This useEffect is used to handle All keyboard actions
  useEffect(() => {
    const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
    const moves = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]
    const handleKeyDown = (event: KeyboardEvent) => {
      if (moves.includes(event.key)) {
        moveActiveCell(event.key)
      } else if (numbers.includes(event.key)) {
        dispatch(
          updateSudokuActiveCellValue({
            newValue: parseInt(event.key),
            activeCell: activeCell,
            notesMode: sudokuTools.notesMode,
          })
        )
      } else if (
        event.key == "Backspace" ||
        event.key == "Delete" ||
        event.key == "0"
      ) {
        dispatch(
          updateSudokuActiveCellValue({
            newValue: 0,
            activeCell: activeCell,
            notesMode: sudokuTools.notesMode,
          })
        )
      } else if (event.key == "n") {
        handleNotesModeButton()
      }
    }
    // Adde event listener
    window.addEventListener("keydown", handleKeyDown)

    // clean event listener on component destroy
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [
    moveActiveCell,
    handleNotesModeButton,
    dispatch,
    activeCell,
    sudokuTools.notesMode,
  ])

  useEffect(() => {
    if (sudoku.id == "") {
      dispatch(createSudoku(SudokuDifficulty.Easy))
    } else {
      const sudokuSolved = checkSudokuIsSolved(sudoku.board, sudoku.solution)
      if (sudokuSolved) {
        dispatch(updateSudokuSolved(sudokuSolved))
      }
    }
  }, [sudoku, dispatch])

  return (
    <div className="app-container">
      <div>
        <SudokuHeader />
        <Board />
        <GameFinishModal />
      </div>
    </div>
  )
}
