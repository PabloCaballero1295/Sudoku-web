import { SudokuDifficulty } from "../../constants/enum"
import "./SudokuHeader.css"

interface SudokuHeaderProps {
  errors: number
  difficulty: SudokuDifficulty
  updateDifficulty: (newDifficulty: SudokuDifficulty) => void
}

export const SudokuHeader = ({
  errors,
  difficulty,
  updateDifficulty,
}: SudokuHeaderProps) => {
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
        <div>Difficulty</div>
        <div
          className={getStyle(SudokuDifficulty.Easy)}
          onClick={() => updateDifficulty(SudokuDifficulty.Easy)}
        >
          Easy
        </div>
        <div
          className={getStyle(SudokuDifficulty.Medium)}
          onClick={() => updateDifficulty(SudokuDifficulty.Medium)}
        >
          Medium
        </div>
        <div
          className={getStyle(SudokuDifficulty.Hard)}
          onClick={() => updateDifficulty(SudokuDifficulty.Hard)}
        >
          Hard
        </div>
      </div>
      <div className="difficulty-row">
        <div>Errors: {errors}</div>
        {/*<div>Puntuación: 1111</div>*/}
        <div>Time: 00:00</div>
      </div>
    </div>
  )
}
