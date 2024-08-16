import { useState } from "react"
import "./NewGameModal.css"
import { SudokuDifficulty } from "../../../constants/enum"
import { ModalBox } from "../ModalBox/ModalBox"

interface NewGameModalProps {
  startNewGame: (gameDifficulty: SudokuDifficulty) => void
}

export const NewGameModal = ({
  startNewGame: startNewGame,
}: NewGameModalProps) => {
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
    startNewGame(difficulty)
  }

  return (
    <>
      <button className="new-game-button" onClick={handleOpen}>
        Start New Game
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
            Select the game difficulty to start a new game
          </div>
          <div className="difficulty-select">
            <button
              onClick={() => handleDifficultySelection(SudokuDifficulty.Easy)}
              className={`difficulty-selection-button ${
                difficulty == "easy" ? "selected" : undefined
              }`}
            >
              Easy
            </button>
            <button
              onClick={() => handleDifficultySelection(SudokuDifficulty.Medium)}
              className={`difficulty-selection-button ${
                difficulty == "medium" ? "selected" : undefined
              }`}
            >
              Medium
            </button>
            <button
              onClick={() => handleDifficultySelection(SudokuDifficulty.Hard)}
              className={`difficulty-selection-button ${
                difficulty == "hard" ? "selected" : undefined
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
