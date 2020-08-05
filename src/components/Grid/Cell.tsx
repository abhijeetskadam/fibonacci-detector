import React, { ReactElement, memo } from "react";
import { CellProps } from "./types";

export default memo(function Cell({
  value,
  id,
  backgroundColor,
}: CellProps): ReactElement {
  return (
    <div id={id} className="cell" style={{ backgroundColor }}>
      {value > 0 ? value : ""}
    </div>
  );
});
