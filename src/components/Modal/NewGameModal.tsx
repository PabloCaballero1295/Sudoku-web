import { Modal } from "@mui/material"
import { useState } from "react"
import "./NewGameModal.css"
import { SudokuDifficulty } from "../../constants/enum"

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
    setOpen(false)
  }

  return (
    <>
      <button className="new-game-button" onClick={handleOpen}>
        New Game
      </button>
      <Modal open={open} onClose={handleClose}>
        <div className="modal-box">
          <div className="modal-header">
            <div className="modal-title">New Game</div>
          </div>
          <div>
            Select game difficulty
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
                onClick={() =>
                  handleDifficultySelection(SudokuDifficulty.Medium)
                }
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
          <div className="modal-button-row">
            <button className="new-game-button" onClick={handleStartNewGame}>
              Start new game
            </button>
            <button className="cancel-button" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}
