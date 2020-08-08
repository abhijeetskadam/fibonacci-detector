import React, { ReactElement, memo, useEffect, useState } from "react";
import { CellProps } from "./types";
import { COLORS } from "./grid.helper";

export default memo(function Cell({
  value,
  id,
  backgroundColor,
}: CellProps): ReactElement {
  const [reset, setReset] = useState(false);
  useEffect(() => {
    if (value === 0) {
      setReset(true);
      setTimeout(() => setReset(false), 500);
    }
  }, [value]);
  return (
    <div
      id={id}
      data-testid={id}
      className="cell"
      style={{ backgroundColor: reset ? COLORS.onReset : backgroundColor }}
    >
      {value > 0 ? value : ""}
    </div>
  );
});
