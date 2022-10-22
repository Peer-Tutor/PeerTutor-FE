import React, { useState } from "react";

export function useForceUpdate() {
  const [value, setValue] = useState<number>(0);
  return [value, () => setValue(value => value + 1)] as const;
}
