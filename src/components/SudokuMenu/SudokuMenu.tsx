import styles from "./SudokuMenu.module.css"
import { GrEdit } from "react-icons/gr"
import { FaEraser } from "react-icons/fa"
import { FaRegLightbulb } from "react-icons/fa"
import { TbArrowBackUp } from "react-icons/tb"
import { NewGameModal } from "../Modal/NewGameModal/NewGameModal"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import {
  sudokuUseClue,
  undoSudokuBoard,
  updateSudokuActiveCellValue,
} from "../../redux/sudokuSlice"
import { toggleNotesMode } from "../../redux/sudokuToolsSlice"
import useWindowSize from "../../hooks/hooks"

export const SudokuMenu = () => {
  const screenSize = useWindowSize()

  const sudoku = useAppSelector((state) => state.sudoku)
  const sudokuTools = useAppSelector((state) => state.sudokuTools)
  const dispatch = useAppDispatch()

  const updateCellValue = (newValue: number) => {
    dispatch(
      updateSudokuActiveCellValue({
        newValue: newValue,
        activeCell: sudokuTools.activeCell,
        notesMode: sudokuTools.notesMode,
      })
    )
  }

  const handleClueButton = () => {
    dispatch(sudokuUseClue(sudokuTools.activeCell))
  }

  const handleNotesButton = () => {
    dispatch(toggleNotesMode())
  }

  const undo = () => {
    dispatch(undoSudokuBoard())
  }

  return (
    <div className={styles.sudoku_menu}>
      <div className={styles.button_row}>
        <div>
          <button className={styles.sudoku_button} onClick={undo}>
            <TbArrowBackUp className={styles.sudoku_button_icon} />
          </button>
          <div className={styles.sudoku_button_text}>Undo</div>
        </div>
        <div>
          <button
            className={styles.sudoku_button}
            onClick={() => updateCellValue(0)}
          >
            <FaEraser className={styles.sudoku_button_icon} />
          </button>
          <div className={styles.sudoku_button_text}>Delete</div>
        </div>
        <div>
          <button
            className={`${styles.sudoku_button} ${
              sudokuTools.notesMode
                ? `${styles.notes_button_border}`
                : undefined
            }`}
            onClick={handleNotesButton}
          >
            {sudokuTools.notesMode ? (
              <div className={`${styles.notes_mode} ${styles.on}`}>On</div>
            ) : (
              <div className={`${styles.notes_mode} ${styles.off}`}>Off</div>
            )}
            <GrEdit className={styles.sudoku_button_icon} />
          </button>
          <div className={styles.sudoku_button_text}>Notes</div>
        </div>
        <div>
          <button
            className={styles.sudoku_button}
            onClick={handleClueButton}
            disabled={sudoku.clues > 0 ? false : true}
          >
            <div
              className={`${styles.clues_counter} ${
                sudoku.clues == 0 ? styles.off : undefined
              }`}
            >
              {sudoku.clues}
            </div>
            <FaRegLightbulb className={styles.sudoku_button_icon} />
          </button>
          <div className={styles.sudoku_button_text}>Clue</div>
        </div>
      </div>
      <div className={styles.numbers}>
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index + 1}
            className={styles.button_number}
            onClick={() => updateCellValue(index + 1)}
          >
            {index + 1}
          </div>
        ))}
      </div>

      {screenSize.width > 768 ? (
        <div className={styles.bottom_row_menu}>
          <NewGameModal />
        </div>
      ) : undefined}
    </div>
  )
}
