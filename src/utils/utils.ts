export function deepCopy<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj))
}

export const checkNextActiveCellBox = (
  activeRow: number,
  activeCol: number,
  row: number,
  col: number
) => {
  const boxRowAc = Math.floor(activeRow / 3)
  const boxColAc = Math.floor(activeCol / 3)

  if (boxRowAc == Math.floor(row / 3) && boxColAc == Math.floor(col / 3)) {
    return true
  } else {
    return false
  }
}
