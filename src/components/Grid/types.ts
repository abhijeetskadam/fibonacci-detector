export type Grid = Array<Array<number>>;

export interface GridProps {
  numberOfRows?: number;
  numberOfColumns?: number;
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
