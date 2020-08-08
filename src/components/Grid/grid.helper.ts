import {
  GridShape,
  GridCell,
  Grid,
  ResetFibonacciSequenceParams,
  DetectAndResetFibonacciSequenceParams,
} from "./types";
import { isFibonacciNumber, isFibonacciSequence } from "../../utils/fibonacci";

export const COLORS = {
  default: "rgba(0,0,0,0.13)",
  onIncrement: "yellow",
  onReset: "green",
};

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

export function detectAndResetFibonacciSequence({
  grid,
  changedRow,
  changedColumn,
  sequenceLength,
}: ResetFibonacciSequenceParams): Grid {
  let _grid = [...grid];
  const numberOfRows = _grid.length;
  const numberOfColumns = _grid[0].length;
  const startIndexRow = Math.max(0, changedRow - sequenceLength + 1);
  const endIndexRow = Math.min(
    numberOfRows - 1,
    changedRow + sequenceLength - 1
  );
  const startIndexColumn = Math.max(0, changedColumn - sequenceLength + 1);
  const endIndexColumn = Math.min(
    numberOfColumns - 1,
    changedColumn + sequenceLength - 1
  );
  const commonParams = {
    changedRow,
    changedColumn,
    sequenceLength,
    numberOfRows,
    numberOfColumns,
    startIndexRow,
    endIndexRow,
    startIndexColumn,
    endIndexColumn,
  };

  _grid = detectAndResetFibonacciSequenceInRows({
    grid: _grid,
    ...commonParams,
  });

  _grid = detectAndResetFibonacciSequenceInColumns({
    grid: _grid,
    ...commonParams,
  });

  _grid = detectAndResetFibonacciSequenceInDiagonal1({
    grid: _grid,
    ...commonParams,
  });

  _grid = detectAndResetFibonacciSequenceInDiagonal2({
    grid: _grid,
    ...commonParams,
  });

  return _grid;
}

function detectAndResetFibonacciSequenceInRows({
  grid,
  changedColumn,
  sequenceLength,
  numberOfRows,
  startIndexColumn,
  endIndexColumn,
}: DetectAndResetFibonacciSequenceParams): Grid {
  for (let r = 0; r < numberOfRows; r++) {
    if (isFibonacciNumber(grid[r][changedColumn])) {
      for (
        let i = startIndexColumn;
        i <= endIndexColumn - sequenceLength + 1;
        i++
      ) {
        const sequenceToVerify = grid[r].slice(i, i + sequenceLength);
        if (
          isFibonacciSequence(sequenceToVerify) ||
          isFibonacciSequence(sequenceToVerify.reverse())
        ) {
          for (let j = i; j < i + sequenceLength; j++) {
            grid[r][j] = 0;
          }
          break;
        }
      }
    }
  }

  return grid;
}

function detectAndResetFibonacciSequenceInColumns({
  grid,
  changedRow,
  sequenceLength,
  numberOfColumns,
  startIndexRow,
  endIndexRow,
}: DetectAndResetFibonacciSequenceParams): Grid {
  for (let c = 0; c < numberOfColumns; c++) {
    if (isFibonacciNumber(grid[changedRow][c])) {
      for (let i = startIndexRow; i <= endIndexRow - sequenceLength + 1; i++) {
        const sequenceToVerify = [];
        for (let k = i; k < i + sequenceLength; k++) {
          sequenceToVerify.push(grid[k][c]);
        }

        if (
          isFibonacciSequence(sequenceToVerify) ||
          isFibonacciSequence(sequenceToVerify.reverse())
        ) {
          for (let k = i; k < i + sequenceLength; k++) {
            grid[k][c] = 0;
          }
          break;
        }
      }
    }
  }

  return grid;
}

function detectAndResetFibonacciSequenceInDiagonal1({
  grid,
  changedRow,
  changedColumn,
  sequenceLength,
  startIndexRow,
  endIndexRow,
  startIndexColumn,
  endIndexColumn,
}: DetectAndResetFibonacciSequenceParams): Grid {
  if (isFibonacciNumber(grid[changedRow][changedColumn])) {
    const offset1 = Math.max(
      startIndexColumn - changedColumn,
      startIndexRow - changedRow
    );
    const offset2 = Math.min(
      endIndexRow - changedRow,
      endIndexColumn - changedColumn
    );

    for (let d = offset1; d <= offset2 - sequenceLength + 1; d++) {
      const sequenceToVerify = [];
      for (let k = d; k < d + sequenceLength; k++) {
        sequenceToVerify.push(grid[changedRow + k][changedColumn + k]);
      }

      if (
        isFibonacciSequence(sequenceToVerify) ||
        isFibonacciSequence(sequenceToVerify.reverse())
      ) {
        for (let k = d; k < d + sequenceLength; k++) {
          grid[changedRow + k][changedColumn + k] = 0;
        }
        break;
      }
    }
  }

  return grid;
}

function detectAndResetFibonacciSequenceInDiagonal2({
  grid,
  changedRow,
  changedColumn,
  sequenceLength,
  startIndexRow,
  endIndexRow,
  startIndexColumn,
  endIndexColumn,
}: DetectAndResetFibonacciSequenceParams): Grid {
  if (isFibonacciNumber(grid[changedRow][changedColumn])) {
    const offset1 = Math.max(
      startIndexColumn - changedColumn,
      changedRow - endIndexRow
    );
    const offset2 = Math.min(
      changedRow - startIndexRow,
      endIndexColumn - changedColumn
    );

    for (let d = offset1; d <= offset2 - sequenceLength + 1; d++) {
      const sequenceToVerify = [];
      for (let k = d; k < d + sequenceLength; k++) {
        sequenceToVerify.push(grid[changedRow - k][changedColumn + k]);
      }

      if (
        isFibonacciSequence(sequenceToVerify) ||
        isFibonacciSequence(sequenceToVerify.reverse())
      ) {
        for (let k = d; k < d + sequenceLength; k++) {
          grid[changedRow - k][changedColumn + k] = 0;
        }
        break;
      }
    }
  }

  return grid;
}
