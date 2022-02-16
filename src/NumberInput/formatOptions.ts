import { useMemo } from "react";
import { FormatProps } from "./FormatProps";

export function useFormatOptions({ kind }: FormatProps) {
  // This function must be memoized, see this relevant issue:
  // https://github.com/adobe/react-spectrum/issues/1893
  return useMemo((): Intl.NumberFormatOptions | undefined => {
    switch (kind) {
      case "currency":
        return {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        };

      case "percentage":
      case "decimal":
      case undefined:
        return undefined;
    }
  }, [kind]);
}
