import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { resetSudoku } from "../../redux/sudokuSlice"
import { ChangeDifficultyModal } from "../Modal/ChangeDifficultyModal/ChangeDifficultyModal"
import { ResetGameModal } from "../Modal/ResetGameModal/ResetGameModal"
import "./SudokuHeader.css"

export const SudokuHeader = () => {
  const errors = useAppSelector((state) => state.sudoku.errors)

  const dispatch = useAppDispatch()

  const resetGame = () => {
    dispatch(resetSudoku())
  }

  return (
    <div className="header-container">
      <div className="difficulty-row">
        <div>Difficulty</div>
        <ChangeDifficultyModal />
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
