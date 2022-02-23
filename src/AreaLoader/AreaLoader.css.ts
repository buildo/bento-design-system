import { keyframes, style } from "@vanilla-extract/css";
import { bentoSprinkles } from "../internal";

export const container = style([
  bentoSprinkles({
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingY: 24,
    paddingX: 8,
    width: "full",
    height: "full",
  }),
  {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
]);

const scaleL = keyframes({
  "0%": {
    transform: "scale(0.8) translateY(20px)",
  },
  "100%": {
    transform: "scale(1.2) translateY(-20px)",
  },
});

export const dot = style([
  bentoSprinkles({ display: "inline-block", borderRadius: "circled", padding: 8 }),
  {
    animation: `${scaleL} 0.6s infinite alternate`,
  },
]);

export const text = style({
  transform: "translateY(20px)",
});
