import { style } from "@vanilla-extract/css";
import { bentoSprinkles } from "../internal";
import { vars } from "../vars.css";

export const modal = style([
  {
    width: "560px",
    border: `1px solid ${vars.outlineColor.outlineContainer}`,
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
