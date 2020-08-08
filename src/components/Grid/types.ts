export type Grid = Array<Array<number>>;

export interface GridProps {
  numberOfRows?: number;
  numberOfColumns?: number;
  sequenceLength?: number;
}

export interface CellProps {
  value: number;
  id: string;
  backgroundColor: string;
}

export interface GridShape {
  numberOfRows: number;
  numberOfColumns: number;
}

export interface GridCell {
  grid: Grid;
  row: number;
  column: number;
}

export interface ResetFibonacciSequenceParams {
  grid: Grid;
  changedRow: number;
  changedColumn: number;
  sequenceLength: number;
}

export interface DetectFibonacciSequenceParams {
  startIndexRow: number;
  endIndexRow: number;
  startIndexColumn: number;
  endIndexColumn: number;
}

export type DetectAndResetFibonacciSequenceParams = ResetFibonacciSequenceParams &
  DetectFibonacciSequenceParams &
  GridShape;
