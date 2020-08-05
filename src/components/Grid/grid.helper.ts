import { GridShape, GridCell, Grid } from "./types";

export function getEmptyGrid({
  numberOfRows,
  numberOfColumns,
}: GridShape): Array<Array<number>> {
  return Array.from({ length: numberOfRows }, () =>
    Array.from({ length: numberOfColumns }, () => -1)
  );
}

export function incrementGridRowColumn({ grid, row, column }: GridCell): Grid {
  const numberOfRows = grid.length;
  const numberOfColumns = grid[0].length;
  if (row > numberOfRows) throw Error(`row should be less than grid row size`);
  if (column > numberOfColumns)
    throw Error(`column should be less than grid column size`);

  //increment column
  for (let r = 0; r < numberOfRows; r++) {
    grid[r][column] = Math.max(1, grid[r][column] + 1);
  }

  //increment row
  for (let c = 0; c < numberOfColumns; c++) {
    grid[row][c] = Math.max(1, grid[row][c] + 1);
  }

  //decrement clicked cell value as it gets incremented twice above
  grid[row][column] -= 1;

  return [...grid];
}
