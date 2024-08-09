import { useState } from "react"
import "./Cell.css"

interface CellProps {
  n: number
}

export const Cell = ({ n }: CellProps) => {
  const [value, setValue] = useState(n)

  return <div className="cell">{value}</div>
}
