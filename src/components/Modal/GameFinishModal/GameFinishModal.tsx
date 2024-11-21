import { useEffect, useState } from "react"
import styles from "./GameFinishModal.module.css"
import { SudokuDifficulty } from "../../../constants/enum"
import { ModalBox } from "../ModalBox/ModalBox"
import { useAppDispatch, useAppSelector } from "../../../redux/hooks"
import { createSudoku } from "../../../redux/sudokuSlice"
import { getTimeSpent } from "../../../utils/utils"

export const GameFinishModal = () => {
  const dispatch = useAppDispatch()

  const sudoku = useAppSelector((state) => state.sudoku)

  const [open, setOpen] = useState(false)
  const [difficulty, setDifficulty] = useState(sudoku.difficulty)

  /*
  const handleOpen = () => {
    setOpen(true)
  }
  */

  useEffect(() => {
    if (sudoku.isSolved) {
      setOpen(true)
    }
  }, [sudoku])

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
      {/*
      <button className="new-game-button" onClick={handleOpen}>
        New Game
      </button>*/}
      <ModalBox
        title="Sudoku solved"
        open={open}
        closeModal={handleClose}
        acceptAction={handleStartNewGame}
        acceptButtonText="Start new game"
      >
        <div>
          <div className={styles.modal_body}>
            Errors: {sudoku.errors}
            <br />
            Time: {getTimeSpent(sudoku.timeSpent)}
            <br />
            Do you want to play a new game?
          </div>
          <div className={styles.difficulty_select}>
            <button
              onClick={() => handleDifficultySelection(SudokuDifficulty.Easy)}
              className={`${styles.difficulty_selection_button} ${
                difficulty == "easy" ? styles.selected : undefined
              }`}
            >
              Easy
            </button>
            <button
              onClick={() => handleDifficultySelection(SudokuDifficulty.Medium)}
              className={`${styles.difficulty_selection_button} ${
                difficulty == "medium" ? styles.selected : undefined
              }`}
            >
              Medium
            </button>
            <button
              onClick={() => handleDifficultySelection(SudokuDifficulty.Hard)}
              className={`${styles.difficulty_selection_button} ${
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
