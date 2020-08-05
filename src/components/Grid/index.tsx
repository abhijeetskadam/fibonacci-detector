import React, { ReactElement, useState, MouseEvent, useRef } from "react";
import Cell from "./Cell";
import { getEmptyGrid, incrementGridRowColumn } from "./grid.helper";
import { GridProps } from "./types";

import "./grid.styles.css";

const COLORS = {
  default: "rgba(0,0,0,0.13)",
  onIncrement: "yellow",
  onReset: "green",
};

export default function Grid({
  numberOfRows = 50,
  numberOfColumns = 50,
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
      const [clickedRow, clickedColumn] = clickedCell.id.split("_");
      if (timeoutHandle.current) clearTimeout(timeoutHandle.current);
      setClickedCell({ row: +clickedRow, column: +clickedColumn });
      setGrid(
        incrementGridRowColumn({
          grid,
          row: Number(clickedRow),
          column: Number(clickedColumn),
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
