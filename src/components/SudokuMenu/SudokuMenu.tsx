import "./SudokuMenu.css"
import { GrEdit } from "react-icons/gr"
import { FaEraser } from "react-icons/fa"
import { FaRegLightbulb } from "react-icons/fa"
import { TbArrowBackUp } from "react-icons/tb"

interface SudokuMenuProps {
  updateActiveCell: (newValue: number) => void
  notesMode: boolean
  updateNotesMode: () => void
  clues: number
  handleClue: () => void
}

export const SudokuMenu = ({
  updateActiveCell,
  notesMode,
  updateNotesMode,
  clues,
  handleClue,
}: SudokuMenuProps) => {
  const updateCellValue = (newValue: number) => {
    updateActiveCell(newValue)
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
          <div className="sudoku-button-text">Borrar</div>
        </div>
        <div>
          <button
            className={`sudoku-button ${
              notesMode ? "notes-button-border" : undefined
            }`}
            onClick={updateNotesMode}
          >
            {notesMode ? (
              <div className="notes-mode on">On</div>
            ) : (
              <div className="notes-mode off">Off</div>
            )}
            <GrEdit className="sudoku-button-icon" />
          </button>
          <div className="sudoku-button-text">Notas</div>
        </div>
        <div>
          <button
            className="sudoku-button"
            onClick={handleClue}
            disabled={clues > 0 ? false : true}
          >
            <div className={`clues-counter ${clues == 0 ? "off" : undefined}`}>
              {clues}
            </div>
            <FaRegLightbulb className="sudoku-button-icon" />
          </button>
          <div className="sudoku-button-text">Pista</div>
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
    </div>
  )
}
