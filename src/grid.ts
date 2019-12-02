export interface Grid {
  [key: number]: string;
}

const createRow = (rowStart: number, colStart: number, rowEnd: number, colEnd: number, cols: number) => {
  let rows: string[] = []
  for (let i = 0; i < cols; i++) {
    rows.push(`${rowStart} / ${colStart + i} / ${rowEnd} / ${colEnd + i}`)
  }

  return rows
}

const rows = [
  ...createRow(1, 2, 2, 3, 12),
  ...createRow(2 , 1 , 3 , 2, 14),
  ...createRow(3 , 1 , 4 , 2, 14),
  ...createRow(4, 2, 5, 3, 12),
]

export default rows.reduce((acc, row, i) => {
  return { ...acc, [i + 1]: row }
}, {}) as Grid
