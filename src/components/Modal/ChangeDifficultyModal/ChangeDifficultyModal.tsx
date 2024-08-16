import { useState } from "react"
import "./ChangeDifficultyModal.css"
import { SudokuDifficulty } from "../../../constants/enum"
import { ModalBox } from "../ModalBox/ModalBox"

interface ChangeDifficultyModalProps {
  startNewGame: (gameDifficulty: SudokuDifficulty) => void
}

export const ChangeDifficultyModal = ({
  startNewGame: startNewGame,
}: ChangeDifficultyModalProps) => {
  const [open, setOpen] = useState(false)
  const [difficulty, setDifficulty] = useState(SudokuDifficulty.Easy)
  const [difficultyCLicked, setDifficultyClicked] = useState(
    SudokuDifficulty.Easy
  )

  const handleOpen = (difficultySelection: SudokuDifficulty) => {
    setOpen(true)
    setDifficultyClicked(difficultySelection)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleStartNewGame = () => {
    setDifficulty(difficultyCLicked)
    startNewGame(difficulty)
  }

  const getStyle = (buttonDifficulty: SudokuDifficulty) => {
    if (difficulty == buttonDifficulty) {
      return "difficulty-button-active"
    } else {
      return "difficulty-button"
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
          <div className="modal-body">
            {`Are you sure you want to start a new game in the "${difficultyCLicked}" difficulty?`}
            <br /> All progress made will be lost.
          </div>
        </div>
      </ModalBox>
    </>
  )
}
