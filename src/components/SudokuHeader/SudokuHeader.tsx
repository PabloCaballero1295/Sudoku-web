import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"

import { ChangeDifficultyModal } from "../Modal/ChangeDifficultyModal/ChangeDifficultyModal"
import { ResetGameModal } from "../Modal/ResetGameModal/ResetGameModal"
import "./SudokuHeader.css"
import { incrementSudokuTime } from "../../redux/sudokuSlice"
import useWindowSize from "../../hooks/hooks"
import { NewGameModal } from "../Modal/NewGameModal/NewGameModal"
import { getTimeSpent } from "../../utils/utils"

export const SudokuHeader = () => {
  const sudoku = useAppSelector((state) => state.sudoku)
  const errors = sudoku.errors
  const timeSpent = sudoku.timeSpent
  const dispatch = useAppDispatch()

  const screenSize = useWindowSize()

  useEffect(() => {
    if (sudoku.isSolved) {
      return
    }

    const interval = setInterval(() => {
      dispatch(incrementSudokuTime())
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [dispatch, sudoku])

  return (
    <div className="header-container">
      <div className="difficulty-row">
        <div>Difficulty</div>
        <ChangeDifficultyModal />
      </div>

      <div className="difficulty-row">
        <div className="errors-flex">
          <div>Errors: </div>
          <div>{errors}</div>
        </div>
        <div className="time-flex">
          <div>Time: </div>
          {getTimeSpent(timeSpent)}
          <div></div>
        </div>
        <div className="game-buttons">
          <ResetGameModal />
          {screenSize.width > 768 ? undefined : <NewGameModal />}
        </div>
      </div>
    </div>
  )
}
