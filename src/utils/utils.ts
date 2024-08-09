interface GetGridBoxes {
  data: Array<Array<number>>
}

export const GetGridBoxes = ({ data }: GetGridBoxes) => {
  const board = data
  const box1 = [
    { row: 0, col: 0, value: board[0][0] },
    { row: 0, col: 1, value: board[0][1] },
    { row: 0, col: 2, value: board[0][2] },
    { row: 1, col: 0, value: board[1][0] },
    { row: 1, col: 1, value: board[1][1] },
    { row: 1, col: 2, value: board[1][2] },
    { row: 2, col: 0, value: board[2][0] },
    { row: 2, col: 1, value: board[2][1] },
    { row: 2, col: 2, value: board[2][2] },
  ]

  const box2 = [
    { row: 0, col: 3, value: board[0][3] },
    { row: 0, col: 4, value: board[0][4] },
    { row: 0, col: 5, value: board[0][5] },
    { row: 1, col: 3, value: board[1][3] },
    { row: 1, col: 4, value: board[1][4] },
    { row: 1, col: 5, value: board[1][5] },
    { row: 2, col: 3, value: board[2][3] },
    { row: 2, col: 4, value: board[2][4] },
    { row: 2, col: 5, value: board[2][5] },
  ]

  const box3 = [
    { row: 0, col: 6, value: board[0][6] },
    { row: 0, col: 7, value: board[0][7] },
    { row: 0, col: 8, value: board[0][8] },
    { row: 1, col: 6, value: board[1][6] },
    { row: 1, col: 7, value: board[1][7] },
    { row: 1, col: 8, value: board[1][8] },
    { row: 2, col: 6, value: board[2][6] },
    { row: 2, col: 7, value: board[2][7] },
    { row: 2, col: 8, value: board[2][8] },
  ]

  const box4 = [
    { row: 3, col: 0, value: board[3][0] },
    { row: 3, col: 1, value: board[3][1] },
    { row: 3, col: 2, value: board[3][2] },
    { row: 4, col: 0, value: board[4][0] },
    { row: 4, col: 1, value: board[4][1] },
    { row: 4, col: 2, value: board[4][2] },
    { row: 5, col: 0, value: board[5][0] },
    { row: 5, col: 1, value: board[5][1] },
    { row: 5, col: 2, value: board[5][2] },
  ]

  const box5 = [
    { row: 3, col: 3, value: board[3][3] },
    { row: 3, col: 4, value: board[3][4] },
    { row: 3, col: 5, value: board[3][5] },
    { row: 4, col: 3, value: board[4][3] },
    { row: 4, col: 4, value: board[4][4] },
    { row: 4, col: 5, value: board[4][5] },
    { row: 5, col: 3, value: board[5][3] },
    { row: 5, col: 4, value: board[5][4] },
    { row: 5, col: 5, value: board[5][5] },
  ]

  const box6 = [
    { row: 3, col: 6, value: board[3][6] },
    { row: 3, col: 7, value: board[3][7] },
    { row: 3, col: 8, value: board[3][8] },
    { row: 4, col: 6, value: board[4][6] },
    { row: 4, col: 7, value: board[4][7] },
    { row: 4, col: 8, value: board[4][8] },
    { row: 5, col: 6, value: board[5][6] },
    { row: 5, col: 7, value: board[5][7] },
    { row: 5, col: 8, value: board[5][8] },
  ]

  const box7 = [
    { row: 6, col: 0, value: board[6][0] },
    { row: 6, col: 1, value: board[6][1] },
    { row: 6, col: 2, value: board[6][2] },
    { row: 7, col: 0, value: board[7][0] },
    { row: 7, col: 1, value: board[7][1] },
    { row: 7, col: 2, value: board[7][2] },
    { row: 8, col: 0, value: board[8][0] },
    { row: 8, col: 1, value: board[8][1] },
    { row: 8, col: 2, value: board[8][2] },
  ]

  const box8 = [
    { row: 6, col: 3, value: board[6][3] },
    { row: 6, col: 4, value: board[6][4] },
    { row: 6, col: 5, value: board[6][5] },
    { row: 7, col: 3, value: board[7][3] },
    { row: 7, col: 4, value: board[7][4] },
    { row: 7, col: 5, value: board[7][5] },
    { row: 8, col: 3, value: board[8][3] },
    { row: 8, col: 4, value: board[8][4] },
    { row: 8, col: 5, value: board[8][5] },
  ]

  const box9 = [
    { row: 6, col: 6, value: board[6][6] },
    { row: 6, col: 7, value: board[6][7] },
    { row: 6, col: 8, value: board[6][8] },
    { row: 7, col: 6, value: board[7][6] },
    { row: 7, col: 7, value: board[7][7] },
    { row: 7, col: 8, value: board[7][8] },
    { row: 8, col: 6, value: board[8][6] },
    { row: 8, col: 7, value: board[8][7] },
    { row: 8, col: 8, value: board[8][8] },
  ]

  return [box1, box2, box3, box4, box5, box6, box7, box8, box9]
}
