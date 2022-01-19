import { Inset } from "../internal";
import { Box } from "../internal/Box/Box";
import { vars } from "../vars.css";
import { unsafeLocalizedString } from "..";

type Props = {
  height?: string | number;
  width?: string | number;
  label?: string;
};

export function Placeholder({ label, height = 120, width = "auto" }: Props) {
  return (
    <Box
      position="relative"
      display="flex"
      style={{ height, width, border: `2px solid ${vars.outlineColor.decorative}` }}
      justifyContent="center"
      alignItems="center"
    >
      {label ? (
        <Inset space="8">{unsafeLocalizedString(label)}</Inset>
      ) : (
        <svg style={{ position: "absolute", width: "100%", height: "100%" }}>
          <line
            style={{ strokeWidth: 2, stroke: vars.outlineColor.decorative }}
            x1={0}
            y1={0}
            x2="100%"
            y2="100%"
          />
          <line
            style={{ strokeWidth: 2, stroke: vars.outlineColor.decorative }}
            x1="100%"
            y1={0}
            x2={0}
            y2="100%"
          />
        </svg>
      )}
    </Box>
  );
}
