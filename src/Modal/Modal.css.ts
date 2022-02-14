import { style } from "@vanilla-extract/css";
import { bentoSprinkles } from "../internal";

export const modal = style([
  {
    width: "560px",
  },
  bentoSprinkles({
    background: "backgroundPrimary",
    borderRadius: "16",
    boxShadow: "elevationLarge",
  }),
]);

export const underlay = bentoSprinkles({
  position: "fixed",
  zIndex: "modalUnderlay",
  inset: "0",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "backgroundDarkOverlay",
});
