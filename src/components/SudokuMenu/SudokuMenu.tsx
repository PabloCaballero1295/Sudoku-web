import "./SudokuMenu.css"
import { GrEdit } from "react-icons/gr"
import { FaEraser } from "react-icons/fa"
import { FaRegLightbulb } from "react-icons/fa"
import { TbArrowBackUp } from "react-icons/tb"
import { NewGameModal } from "../Modal/NewGameModal/NewGameModal"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import {
  sudokuUseClue,
  updateSudokuActiveCellValue,
  updateSudokuNotesMode,
} from "../../redux/sudokuSlice"

export const SudokuMenu = () => {
  const sudoku = useAppSelector((state) => state.sudoku)
  const dispatch = useAppDispatch()

  const updateCellValue = (newValue: number) => {
    dispatch(updateSudokuActiveCellValue(newValue))
  }

  const handleClueButton = () => {
    dispatch(sudokuUseClue())
  }

  const toggleNotesMode = () => {
    dispatch(updateSudokuNotesMode(!sudoku.notesMode))
  }

  return (
    <div className="sudoku-menu">
      <div className="button-row">
        <div>
          <button className="sudoku-button">
            <TbArrowBackUp className="sudoku-button-icon" />
          </button>
          <div className="sudoku-button-text">Deshacer</div>
        </div>
        <div>
          <button className="sudoku-button" onClick={() => updateCellValue(0)}>
            <FaEraser className="sudoku-button-icon" />
          </button>
          <div className="sudoku-button-text">Delete</div>
        </div>
        <div>
          <button
            className={`sudoku-button ${
              sudoku.notesMode ? "notes-button-border" : undefined
            }`}
            onClick={toggleNotesMode}
          >
            {sudoku.notesMode ? (
              <div className="notes-mode on">On</div>
            ) : (
              <div className="notes-mode off">Off</div>
            )}
            <GrEdit className="sudoku-button-icon" />
          </button>
          <div className="sudoku-button-text">Notes</div>
        </div>
        <div>
          <button
            className="sudoku-button"
            onClick={handleClueButton}
            disabled={sudoku.clues > 0 ? false : true}
          >
            <div
              className={`clues-counter ${
                sudoku.clues == 0 ? "off" : undefined
              }`}
            >
              {sudoku.clues}
            </div>
            <FaRegLightbulb className="sudoku-button-icon" />
          </button>
          <div className="sudoku-button-text">Clue</div>
        </div>
      </div>
      <div className="numbers">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index + 1}
            className="button-number"
            onClick={() => updateCellValue(index + 1)}
          >
            {index + 1}
          </div>
        ))}
      </div>
      <div className="bottom-row-menu">
        <NewGameModal />
      </div>
    </div>
  )
}
