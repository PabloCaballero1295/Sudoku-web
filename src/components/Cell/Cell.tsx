import { useEffect, useState } from "react"
import "./Cell.css"
import { checkNextActiveCellBox } from "../../utils/utils"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
//import { updateSudokuActiveCell } from "../../redux/sudokuSlice"
import { updateActiveCell } from "../../redux/sudokuToolsSlice"

interface CellProps {
  row: number
  col: number
  value: number
  notes: number[]
  solutionValue: number
  readOnly: boolean
}

export const Cell = ({
  row,
  col,
  value,
  notes,
  solutionValue,
  readOnly,
}: CellProps) => {
  //const sudoku = useAppSelector((state) => state.sudoku)
  const sudokuTools = useAppSelector((state) => state.sudokuTools)
  const activeCell = sudokuTools.activeCell

  const dispatch = useAppDispatch()

  const [cellValue, setCellValue] = useState(value)
  const [borderBottom, setBorderBottom] = useState(false)
  const [borderRight, setBorderRight] = useState(false)

  useEffect(() => {
    setCellValue(value)
    if ((row + 1) % 3 == 0 && row + 1 < 9) {
      setBorderBottom(true)
    }
    if ((col + 1) % 3 == 0 && col + 1 < 9) {
      setBorderRight(true)
    }
  }, [row, col, value])

  const handleClick = () => {
    //updateActiveCell(row, col)
    //dispatch(updateSudokuActiveCell({ row: row, col: col }))
    dispatch(updateActiveCell({ row: row, col: col }))
  }

  const getCellStyle = () => {
    let cellStyle = "cell"

    if (borderBottom) {
      cellStyle += " bottom-border"
    }

    if (borderRight) {
      cellStyle += " right-border"
    }

    if (readOnly) {
      cellStyle += " read-only"
    }

    if (activeCell.row == row && activeCell.col == col) {
      cellStyle += " active-cell"
    } else if (activeCell.row == row || activeCell.col == col) {
      cellStyle += " active-cell-row-col"
    } else if (
      checkNextActiveCellBox(activeCell.row, activeCell.col, row, col)
    ) {
      cellStyle += " active-cell-row-col"
    }

    if (cellValue != 0 && cellValue != solutionValue) {
      cellStyle += " error-cell"
    }

    return cellStyle
  }

  return (
    <>
      <div className={getCellStyle()} onClick={handleClick}>
        {notes.length == 0 ? (
          cellValue === 0 ? (
            ""
          ) : (
            cellValue
          )
        ) : (
          <div className="notes">
            {Array(9)
              .fill("")
              .map((_, index) => (
                <div className="notes-number" key={index}>
                  {notes.includes(index + 1) ? index + 1 : " "}
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  )
}
