import { createVar, style } from "@vanilla-extract/css";
import { bentoSprinkles } from "../internal";
import { strictRecipe } from "../util/strictRecipe";
import { vars } from "../vars.css";

export const table = style({
  gridAutoRows: "max-content",
  // NOTE(gabro): this is to avoid the internal z-indexes to "leak" out of the Table
  isolation: "isolate",
});

export const lastLeftStickyColumn = bentoSprinkles({
  background: "backgroundPrimary",
  paddingRight: 8,
});

export const columnHeader = bentoSprinkles({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  boxShadow: "outlineDecorativeBottom",
  height: "full",
});

export const columnFooter = style([
  {
    boxShadow: `inset 0px 1px 0px ${vars.outlineColor.outlineDecorative}`,
  },
  bentoSprinkles({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "full",
  }),
]);

export const sortIconContainer = style({
  filter: "opacity(80%)",
});

export const stickyTopHeight = createVar();

export const stickyColumnHeader = style([
  {
    top: stickyTopHeight,
  },
  bentoSprinkles({
    position: "sticky",
  }),
]);

export const stickyColumnFooter = style([
  {
    bottom: 0,
  },
  bentoSprinkles({
    position: "sticky",
  }),
]);

export const rowContainer = style({
  // NOTE(gabro): this allows us to use the entire row as a parent selector,
  // for applying a hover effect on all of its children or clicking on row,
  // without intrucing a DOM container that would break the grid layout.
  display: "contents",
});

export const selectedRowBackgroundColor = createVar();

export const cellContainerRecipe = strictRecipe({
  base: bentoSprinkles({
    height: "full",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  }),
  variants: {
    interactiveRow: {
      true: {
        selectors: {
          [`${rowContainer}:hover &`]: {
            cursor: "pointer",
            background: selectedRowBackgroundColor,
          },
        },
      },
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
