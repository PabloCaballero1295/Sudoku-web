import { useState } from "react"
import { ModalBox } from "../ModalBox/ModalBox"
import "./ResetGameModal.css"

interface ResetGameModalProps {
  resetGame: () => void
}

export const ResetGameModal = ({ resetGame }: ResetGameModalProps) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <button className="reset-game-button" onClick={handleOpen}>
        Reset Game
      </button>
      <ModalBox
        title="Reset Game"
        open={open}
        closeModal={handleClose}
        acceptAction={resetGame}
        acceptButtonText="Reset game"
      >
        <div>
          <div className="modal-body">
            Are you sure you want to reset the game to the initial values?
            <br /> All progress made will be lost.
          </div>
        </div>
      </ModalBox>
    </>
  )
}
