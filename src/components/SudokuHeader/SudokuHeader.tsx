import { useState } from "react"
import { SudokuDifficulty } from "../../constants/enum"
import "./SudokuHeader.css"

interface SudokuHeaderProps {
  difficulty: SudokuDifficulty
  updateDifficulty: (newDifficulty: SudokuDifficulty) => void
}

export const SudokuHeader = ({
  difficulty,
  updateDifficulty,
}: SudokuHeaderProps) => {
  const [errors, setErrors] = useState(0)
  const getStyle = (buttonDifficulty: SudokuDifficulty) => {
    if (difficulty == buttonDifficulty) {
      return "difficulty-button-active"
    } else {
      return "difficulty-button"
    }
  }

  return (
    <div className="header-container">
      <div className="difficulty-row">
        <div>Dificultad</div>
        <div
          className={getStyle(SudokuDifficulty.Easy)}
          onClick={() => updateDifficulty(SudokuDifficulty.Easy)}
        >
          Fácil
        </div>
        <div
          className={getStyle(SudokuDifficulty.Medium)}
          onClick={() => updateDifficulty(SudokuDifficulty.Medium)}
        >
          Medio
        </div>
        <div
          className={getStyle(SudokuDifficulty.Hard)}
          onClick={() => updateDifficulty(SudokuDifficulty.Hard)}
        >
          Difícil
        </div>
      </div>
      <div className="difficulty-row">
        <div>Errores: {errors}</div>
        <div>Puntuación: 1111</div>
        <div>Tiempo: 00:00</div>
      </div>
    </div>
  )
}
