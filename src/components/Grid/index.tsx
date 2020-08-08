import React, { ReactElement, useState, MouseEvent, useRef } from "react";
import Cell from "./Cell";
import {
  getEmptyGrid,
  incrementGridRowColumn,
  detectAndResetFibonacciSequence,
  COLORS,
} from "./grid.helper";
import { GridProps } from "./types";

import "./grid.styles.css";

export default function Grid({
  numberOfRows = 20,
  numberOfColumns = 20,
  sequenceLength = 4,
}: GridProps): ReactElement {
  const [grid, setGrid] = useState<Array<Array<number>>>(
    getEmptyGrid({ numberOfRows, numberOfColumns })
  );
  const [clickedCell, setClickedCell] = useState({ row: -1, column: -1 });
  const timeoutHandle = useRef<NodeJS.Timeout>();

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
    const clickedCell = event.target as any;
    if (clickedCell.id) {
      if (timeoutHandle.current) clearTimeout(timeoutHandle.current);

      const [row, column] = clickedCell.id.split("_").map(Number);

      setClickedCell({ row, column });
      setGrid(
        detectAndResetFibonacciSequence({
          grid: incrementGridRowColumn({ grid, row, column }),
          changedColumn: column,
          changedRow: row,
          sequenceLength,
        })
      );

      timeoutHandle.current = setTimeout(() => {
        setClickedCell({ row: -1, column: -1 });
      }, 500);
    }
  }

  return (
    <div onClick={handleClick} className="grid">
      {grid?.map((row: Array<number>, rowIndex: number) => {
        return (
          <div className="row" key={rowIndex}>
            {row.map((cell: number, columnIndex: number) => (
              <Cell
                key={`${rowIndex}_${columnIndex}`}
                id={`${rowIndex}_${columnIndex}`}
                value={cell}
                backgroundColor={
                  clickedCell.row === rowIndex ||
                  clickedCell.column === columnIndex
                    ? COLORS.onIncrement
                    : COLORS.default
                }
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}
