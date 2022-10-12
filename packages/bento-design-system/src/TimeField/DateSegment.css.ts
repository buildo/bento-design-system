import { style } from "@vanilla-extract/css";
import { bentoSprinkles } from "../internal";
import { vars } from "../vars.css";

export const dateSegment = style([
  bentoSprinkles({ outline: { focus: "none" } }),
  {
    ":focus": {
      borderBottom: `1px solid ${vars.textColor.textSecondary}`,
      marginBottom: "-1px",
    },
  },
]);
