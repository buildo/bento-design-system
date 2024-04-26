import { style } from "@vanilla-extract/css";
import { bentoSprinkles } from "../internal";
import { strictRecipe } from "../util/strictRecipe";
import { vars } from "../vars.css";

export const modalRecipe = strictRecipe({
  base: style([
    {
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
    elevation: {
      none: {},
      small: bentoSprinkles({ boxShadow: "elevationSmall" }),
      medium: bentoSprinkles({ boxShadow: "elevationMedium" }),
      large: bentoSprinkles({ boxShadow: "elevationLarge" }),
    },
  },
});

export const underlay = bentoSprinkles({
  position: "fixed",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "backgroundDarkScrim",
});

export const modalBody = bentoSprinkles({
  overflowY: "auto",
});
