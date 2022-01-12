import { StyleRule, styleVariants } from "@vanilla-extract/css";

const styleForScale = (scale: number): StyleRule => ({
  flex: `0 0 ${scale * 100}%`,
});

export const width = styleVariants({
  "1/2": styleForScale(1 / 2),
  "1/3": styleForScale(1 / 3),
  "2/3": styleForScale(2 / 3),
  "1/4": styleForScale(1 / 4),
  "3/4": styleForScale(3 / 4),
  "1/5": styleForScale(1 / 5),
  "2/5": styleForScale(2 / 5),
  "3/5": styleForScale(3 / 5),
  "4/5": styleForScale(4 / 5),
});
