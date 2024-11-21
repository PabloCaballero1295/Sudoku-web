import { useState } from "react"
import styles from "./ChangeDifficultyModal.module.css"
import { SudokuDifficulty } from "../../../constants/enum"
import { ModalBox } from "../ModalBox/ModalBox"
import { createSudoku } from "../../../redux/sudokuSlice"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"

export const ChangeDifficultyModal = () => {
  const [open, setOpen] = useState(false)
  const [difficultyCLicked, setDifficultyClicked] = useState(
    SudokuDifficulty.Easy
  )

  const difficulty = useAppSelector((state) => state.sudoku.difficulty)
  const dispatch = useAppDispatch()

  const startNewGame = () => {
    dispatch(createSudoku(difficultyCLicked))
  }

  const handleOpen = (difficultySelection: SudokuDifficulty) => {
    setOpen(true)
    setDifficultyClicked(difficultySelection)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleStartNewGame = () => {
    startNewGame()
  }

  const getStyle = (buttonDifficulty: SudokuDifficulty) => {
    if (difficulty == buttonDifficulty) {
      return styles.difficulty_button_active
    } else {
      return styles.difficulty_button
    }
  }

  return (
    <>
      <button
        className={getStyle(SudokuDifficulty.Easy)}
        onClick={() => handleOpen(SudokuDifficulty.Easy)}
      >
        Easy
      </button>
      <button
        className={getStyle(SudokuDifficulty.Medium)}
        onClick={() => handleOpen(SudokuDifficulty.Medium)}
      >
        Medium
      </button>
      <button
        className={getStyle(SudokuDifficulty.Hard)}
        onClick={() => handleOpen(SudokuDifficulty.Hard)}
      >
        Hard
      </button>

      <ModalBox
        title="New Game"
        open={open}
        closeModal={handleClose}
        acceptAction={handleStartNewGame}
        acceptButtonText="Start new game"
      >
        <div>
          <div className={styles.modal_body}>
            {`Are you sure you want to start a new game in the "${difficultyCLicked}" difficulty?`}
            <br /> All progress made will be lost.
          </div>
        </div>
      </ModalBox>
    </>
  )
}
