import { style } from "@vanilla-extract/css";
import { bentoSprinkles } from "../internal";
import { strictRecipe } from "../util/strictRecipe";

export const table = style({
  gridAutoRows: "max-content",
});

export const lastLeftStickyColumn = bentoSprinkles({
  background: "backgroundPrimary",
  paddingRight: 8,
});

export const columnHeader = bentoSprinkles({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  background: "backgroundPrimary",
  boxShadow: "outlineDecorativeBottom",
  paddingX: 16,
  paddingY: 8,
  height: "full",
});

export const cellContainerRecipe = strictRecipe({
  base: bentoSprinkles({
    height: "full",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  }),
  variants: {
    even: {
      true: bentoSprinkles({ background: "backgroundSecondary" }),
      false: bentoSprinkles({ background: "backgroundPrimary" }),
    },
  },
});

export const sectionHeaderContainer = style([
  {
    zIndex: 1,
  },
  bentoSprinkles({
    position: "sticky",
    left: 0,
    background: "backgroundPrimary",
  }),
]);

export const sectionHeader = bentoSprinkles({
  display: "inline-block",
  position: "sticky",
  left: 0,
  paddingX: 24,
  paddingY: 4,
});
