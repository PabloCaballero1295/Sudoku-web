import "./SudokuMenu.css"

interface SudokuMenuProps {
  updateActiveCell: (newValue: number) => void
}

export const SudokuMenu = ({ updateActiveCell }: SudokuMenuProps) => {
  const updateCellValue = (newValue: number) => {
    console.log(newValue)
    updateActiveCell(newValue)
  }

  return (
    <div className="sudoku-menu">
      <div className="numbers">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index + 1}
            className="button-number"
            onClick={() => updateCellValue(index + 1)}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  )
}
