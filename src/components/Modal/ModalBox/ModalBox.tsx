import { ReactNode } from "react"
import { Modal } from "@mui/material"
import "./ModalBox.css"

interface ModalBox {
  title: string
  open: boolean
  closeModal: () => void
  children?: ReactNode
  acceptButtonText?: string
  cancelButtonText?: string
  acceptAction?: () => void
}

export const ModalBox = ({
  title,
  open,
  closeModal,
  acceptAction,
  acceptButtonText = "Accept",
  cancelButtonText = "Cancel",
  children,
}: ModalBox) => {
  const handleAcceptAction = () => {
    if (acceptAction) {
      acceptAction()
    }
    closeModal()
  }

  return (
    <Modal open={open} onClose={closeModal}>
      <div className="modal-box">
        <div className="modal-header">
          <div className="modal-title">{title}</div>
        </div>
        {children}
        <div className="modal-button-row">
          <button className="accept-button" onClick={handleAcceptAction}>
            {acceptButtonText}
          </button>
          <button className="cancel-button" onClick={closeModal}>
            {cancelButtonText}
          </button>
        </div>
      </div>
    </Modal>
  )
}
