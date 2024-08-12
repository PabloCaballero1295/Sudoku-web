import { useEffect, useState } from "react"
import "./Cell.css"

export interface CellProps {
  row: number
  col: number
  value: number
  readOnly: boolean
}

export const Cell = ({ row, col, value, readOnly }: CellProps) => {
  const [cellValue, setCellValue] = useState(value)
  const [borderBottom, setBorderBottom] = useState(false)
  const [borderRight, setBorderRight] = useState(false)

  useEffect(() => {
    if ((row + 1) % 3 == 0 && row + 1 < 9) {
      setBorderBottom(true)
    }
    if ((col + 1) % 3 == 0 && col + 1 < 9) {
      setBorderRight(true)
    }
  }, [row, col])

  const handleClick = () => {
    console.log(`ROW: ${row} COL: ${col} VALUE: ${value}`)
    if (!readOnly) {
      setCellValue(10)
    }
  }

  return (
    <div
      className={`cell ${borderBottom ? "bottom-border" : undefined} ${
        borderRight ? "right-border" : undefined
      } ${readOnly ? "read-only" : undefined}`}
      onClick={handleClick}
    >
      {cellValue === 0 ? "" : cellValue}
    </div>
  )
}
