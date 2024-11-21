import { useState } from "react"
import styles from "./NewGameModal.module.css"
import { SudokuDifficulty } from "../../../constants/enum"
import { ModalBox } from "../ModalBox/ModalBox"
import { useAppDispatch } from "../../../redux/hooks"
import { createSudoku } from "../../../redux/sudokuSlice"

export const NewGameModal = () => {
  const dispatch = useAppDispatch()

  const [open, setOpen] = useState(false)
  const [difficulty, setDifficulty] = useState(SudokuDifficulty.Easy)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDifficultySelection = (dif: SudokuDifficulty) => {
    setDifficulty(dif)
  }

  const handleStartNewGame = () => {
    dispatch(createSudoku(difficulty))
  }

  return (
    <>
      <button className={styles["new-game-button"]} onClick={handleOpen}>
        New Game
      </button>
      <ModalBox
        title="New Game"
        open={open}
        closeModal={handleClose}
        acceptAction={handleStartNewGame}
        acceptButtonText="Start new game"
      >
        <div>
          <div className={styles["modal-body"]}>
            Select the game difficulty to start a new game
          </div>
          <div className={styles["difficulty-select"]}>
            <button
              onClick={() => handleDifficultySelection(SudokuDifficulty.Easy)}
              className={`${styles["difficulty-selection-button"]} ${
                difficulty == "easy" ? styles.selected : undefined
              }`}
            >
              Easy
            </button>
            <button
              onClick={() => handleDifficultySelection(SudokuDifficulty.Medium)}
              className={`${styles["difficulty-selection-button"]} ${
                difficulty == "medium" ? styles.selected : undefined
              }`}
            >
              Medium
            </button>
            <button
              onClick={() => handleDifficultySelection(SudokuDifficulty.Hard)}
              className={`${styles["difficulty-selection-button"]} ${
                difficulty == "hard" ? styles.selected : undefined
              }`}
            >
              Hard
            </button>
          </div>
        </div>
      </ModalBox>
    </>
  )
}
