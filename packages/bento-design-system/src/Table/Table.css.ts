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

export const columnHeader = strictRecipe({
  base: bentoSprinkles({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "full",
  }),
  variants: {
    withDividers: {
      false: bentoSprinkles({
        boxShadow: "outlineDecorativeBottom",
      }),
    },
    first: {
      true: {},
    },
    lastLeftSticky: {
      true: {},
    },
  },
  compoundVariants: [
    {
      variants: {
        withDividers: true,
        first: true,
        lastLeftSticky: false,
      },
      style: bentoSprinkles({
        boxShadow: "outlineDecorativeBottom",
      }),
    },
    {
      variants: {
        withDividers: true,
        first: true,
        lastLeftSticky: true,
      },
      style: style({
        boxShadow: `inset -1px -1px ${vars.outlineColor.outlineDecorative}`,
      }),
    },
    {
      variants: {
        withDividers: true,
        first: false,
        lastLeftSticky: false,
      },
      style: style({
        boxShadow: `inset 1px -1px ${vars.outlineColor.outlineDecorative}`,
      }),
    },
    {
      variants: {
        withDividers: true,
        first: false,
        lastLeftSticky: true,
      },
      style: style({
        boxShadow: `inset 1px -1px ${vars.outlineColor.outlineDecorative}, inset -1px -1px ${vars.outlineColor.outlineDecorative}`,
      }),
    },
  ],
});

export const columnFooter = strictRecipe({
  base: bentoSprinkles({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "full",
  }),
  variants: {
    withDividers: {
      false: style({
        boxShadow: `inset 0px 1px ${vars.outlineColor.outlineDecorative}`,
      }),
    },
    first: {
      true: {},
    },
    lastLeftSticky: {
      true: {},
    },
  },
  compoundVariants: [
    {
      variants: {
        withDividers: true,
        first: true,
        lastLeftSticky: false,
      },
      style: style({
        boxShadow: `inset 0px 1px ${vars.outlineColor.outlineDecorative}`,
      }),
    },
    {
      variants: {
        withDividers: true,
        first: true,
        lastLeftSticky: true,
      },
      style: style({
        boxShadow: `inset -1px 1px ${vars.outlineColor.outlineDecorative}`,
      }),
    },
    {
      variants: {
        withDividers: true,
        first: false,
        lastLeftSticky: false,
      },
      style: style({
        boxShadow: `inset 1px 1px ${vars.outlineColor.outlineDecorative}`,
      }),
    },
    {
      variants: {
        withDividers: true,
        first: false,
        lastLeftSticky: true,
      },
      style: style({
        boxShadow: `inset 1px 1px ${vars.outlineColor.outlineDecorative}, inset -1px 1px ${vars.outlineColor.outlineDecorative}`,
      }),
    },
  ],
});

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

export const cellColumnDivider = strictRecipe({
  base: style({
    boxShadow: `inset 1px 0px 0px ${vars.outlineColor.outlineDecorative}`,
  }),
  variants: {
    first: {
      true: {},
    },
    lastLeftSticky: {
      true: {},
    },
  },
  compoundVariants: [
    {
      variants: {
        first: true,
        lastLeftSticky: true,
      },
      style: style({
        boxShadow: `inset -1px 0px ${vars.outlineColor.outlineDecorative}`,
      }),
    },
    {
      variants: {
        first: false,
        lastLeftSticky: true,
      },
      style: style({
        boxShadow: `inset 1px 0px ${vars.outlineColor.outlineDecorative}, inset -1px 0px ${vars.outlineColor.outlineDecorative}`,
      }),
    },
    {
      variants: {
        first: true,
        lastLeftSticky: false,
      },
      style: style({
        boxShadow: "none",
      }),
    },
  ],
});
