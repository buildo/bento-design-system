import { style } from "@vanilla-extract/css";
import { bentoSprinkles } from "../internal";
import { strictRecipe } from "../util/strictRecipe";
import { vars } from "../vars.css";

export const modalRecipe = strictRecipe({
  base: style([
    {
      width: "560px",
      border: `1px solid ${vars.outlineColor.outlineContainer}`,
      maxHeight: "clamp(80%, 500px, 90%)",
    },
    bentoSprinkles({
      display: "flex",
      flexDirection: "column",
      background: "backgroundPrimary",
      boxShadow: "elevationLarge",
    }),
  ]),
  variants: {
    size: {
      small: { width: "400px" },
      medium: { width: "560px" },
      large: { width: "720px" },
    },
  },
});

export const underlay = bentoSprinkles({
  position: "fixed",
  zIndex: "modalUnderlay",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "backgroundDarkScrim",
});

export const modalBody = style({
  overflowY: "auto",
});
