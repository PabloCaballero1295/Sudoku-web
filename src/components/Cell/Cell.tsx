import { useState } from "react"
import "./Cell.css"

export interface CellProps {
  row: number
  col: number
  value: number
}

export const Cell = ({ row, col, value }: CellProps) => {
  const [cellValue, setCellValue] = useState(value)

  const handleClick = () => {
    console.log(row, col)
  }

  return (
    <div className="cell" onClick={handleClick}>
      {cellValue === 0 ? "" : cellValue}
    </div>
  )
}
