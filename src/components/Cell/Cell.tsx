import { useEffect, useState } from "react"
import "./Cell.css"
import { checkNextActiveCellBox } from "../../utils/utils"

export interface CellProps {
  row: number
  col: number
  value: number
  solutionValue: number
  readOnly: boolean
  activeCell: { row: number; col: number }
  updateActiveCell: (row: number, col: number) => void
}

export const Cell = ({
  row,
  col,
  value,
  solutionValue,
  readOnly,
  activeCell,
  updateActiveCell,
}: CellProps) => {
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
    updateActiveCell(row, col)
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
    <div className={getCellStyle()} onClick={handleClick}>
      {cellValue === 0 ? "" : cellValue}
    </div>
  )
}
