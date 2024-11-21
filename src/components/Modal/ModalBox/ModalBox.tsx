import { ReactNode } from "react"
import { Modal } from "@mui/material"
import styles from "./ModalBox.module.css"

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
      <div className={styles["modal-box"]}>
        <div className={styles["modal-header"]}>
          <div className={styles["modal-title"]}>{title}</div>
        </div>
        {children}
        <div className={styles["modal-button-row"]}>
          <button
            className={styles["accept-button"]}
            onClick={handleAcceptAction}
          >
            {acceptButtonText}
          </button>
          <button className={styles["cancel-button"]} onClick={closeModal}>
            {cancelButtonText}
          </button>
        </div>
      </div>
    </Modal>
  )
}
