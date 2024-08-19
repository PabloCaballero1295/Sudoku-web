import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"

import { ChangeDifficultyModal } from "../Modal/ChangeDifficultyModal/ChangeDifficultyModal"
import { ResetGameModal } from "../Modal/ResetGameModal/ResetGameModal"
import "./SudokuHeader.css"
import { incrementSudokuTime } from "../../redux/sudokuSlice"

export const SudokuHeader = () => {
  const sudoku = useAppSelector((state) => state.sudoku)
  const errors = sudoku.errors
  const timeSpent = sudoku.timeSpent
  const dispatch = useAppDispatch()

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(incrementSudokuTime())
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [dispatch])

  const transformDigitTo2DigitString = (n: number) => {
    let text = ""

    if (n < 10) {
      text = "0" + n.toString()
    } else {
      text = n.toString()
    }

    return text
  }

  const getTimeSpent = () => {
    const hours = Math.floor(timeSpent / 3600)
    const minutes = Math.floor((timeSpent % 3600) / 60)
    const seconds = Math.floor((timeSpent % 3600) % 60)

    const hoursString = transformDigitTo2DigitString(hours)
    const minutesString = transformDigitTo2DigitString(minutes)
    const secondsString = transformDigitTo2DigitString(seconds)

    let timeSpentString = `${minutesString}:${secondsString}`

    if (hours > 0) {
      timeSpentString = `${hoursString}:` + timeSpentString
    }
    return timeSpentString
  }

  return (
    <div className="header-container">
      <div className="difficulty-row">
        <div>Difficulty</div>
        <ChangeDifficultyModal />
        <ResetGameModal />
      </div>

      <div className="difficulty-row">
        <div>Errors: {errors}</div>
        <div>Time: {getTimeSpent()}</div>
      </div>
    </div>
  )
}
