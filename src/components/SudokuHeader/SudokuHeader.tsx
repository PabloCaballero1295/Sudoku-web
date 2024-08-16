import { SudokuDifficulty } from "../../constants/enum"
import { ChangeDifficultyModal } from "../Modal/ChangeDifficultyModal/ChangeDifficultyModal"
import { ResetGameModal } from "../Modal/ResetGameModal/ResetGameModal"
import "./SudokuHeader.css"

interface SudokuHeaderProps {
  errors: number
  startNewGame: (gameDifficulty: SudokuDifficulty) => void
  resetGame: () => void
}

export const SudokuHeader = ({
  errors,
  startNewGame,
  resetGame,
}: SudokuHeaderProps) => {
  return (
    <div className="header-container">
      <div className="difficulty-row">
        <div>Difficulty</div>
        <ChangeDifficultyModal startNewGame={startNewGame} />
        <ResetGameModal resetGame={resetGame} />
      </div>

      <div className="difficulty-row">
        <div>Errors: {errors}</div>
        {/*<div>Puntuación: 1111</div>*/}
        <div>Time: 00:00</div>
      </div>
    </div>
  )
}
