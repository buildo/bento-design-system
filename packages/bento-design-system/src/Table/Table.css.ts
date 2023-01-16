import { style } from "@vanilla-extract/css";
import { bentoSprinkles } from "../internal";
import { strictRecipe } from "../util/strictRecipe";

export const table = style({
  gridAutoRows: "max-content",
  // NOTE(gabro): this is to avoid the internal z-indexes to "leak" out of the Table
  isolation: "isolate",
});

export const lastLeftStickyColumn = bentoSprinkles({
  background: "backgroundPrimary",
  paddingRight: 8,
});

export const columnHeaderRecipe = strictRecipe({
  base: bentoSprinkles({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    boxShadow: "outlineDecorativeBottom",
    paddingX: 16,
    paddingY: 8,
    height: "full",
  }),
  variants: {
    firstColumn: {
      true: bentoSprinkles({
        paddingLeft: 24,
        paddingRight: 16,
      }),
    },
    lastColumn: {
      true: bentoSprinkles({
        paddingLeft: 16,
        paddingRight: 24,
      }),
    },
  },
});

export const sortIconContainer = style({
  filter: "opacity(80%)",
});

export const stickyColumnHeader = bentoSprinkles({
  position: "sticky",
  top: 0,
});

export const cellContainerRecipe = strictRecipe({
  base: bentoSprinkles({
    height: "full",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  }),
  variants: {
    firstColumn: {
      true: bentoSprinkles({ paddingLeft: 8 }),
    },
    lastColumn: {
      true: bentoSprinkles({ paddingRight: 8 }),
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
