import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"

import { ChangeDifficultyModal } from "../Modal/ChangeDifficultyModal/ChangeDifficultyModal"
import { ResetGameModal } from "../Modal/ResetGameModal/ResetGameModal"
import styles from "./SudokuHeader.module.css"
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
    <div className={styles.header_container}>
      <div className={styles.difficulty_row}>
        <div>Difficulty</div>
        <ChangeDifficultyModal />
      </div>

      <div className={styles.difficulty_row}>
        <div className={styles.errors_flex}>
          <div>Errors: </div>
          <div>{errors}</div>
        </div>
        <div className={styles.time_flex}>
          <div>Time: </div>
          {getTimeSpent(timeSpent)}
          <div></div>
        </div>
        <div className={styles.game_buttons}>
          <ResetGameModal />
          {screenSize.width > 768 ? undefined : <NewGameModal />}
        </div>
      </div>
    </div>
  )
}
