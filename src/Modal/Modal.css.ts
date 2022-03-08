import { style } from "@vanilla-extract/css";
import { bentoSprinkles } from "../internal";

export const modal = style([
  {
    width: "560px",
  },
  bentoSprinkles({
    background: "backgroundPrimary",
    boxShadow: "elevationLarge",
  }),
]);

export const underlay = bentoSprinkles({
  position: "fixed",
  zIndex: "modalUnderlay",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "backgroundDarkScrim",
});
