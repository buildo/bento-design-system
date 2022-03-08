import { strictRecipe } from "../util/strictRecipe";
import { bentoSprinkles } from "../internal/sprinkles.css";
import { extendedHitAreaRecipe } from "../util/extendedHitArea.css";

export const buttonRecipe = strictRecipe({
  base: bentoSprinkles({
    textTransform: "uppercase",
    cursor: {
      default: "pointer",
      disabled: "notAllowed",
    },
    outline: "none",
  }),
  variants: {
    kind: {
      solid: bentoSprinkles({
        background: { disabled: "disabledSolidBackground" },
        color: { disabled: "disabledSolidForeground" },
        fill: { disabled: "disabledSolidForeground" },
      }),
      transparent: bentoSprinkles({
        background: { disabled: "disabledTransparentBackground" },
        color: { disabled: "disabledTransparentForeground" },
      }),
      outline: bentoSprinkles({
        background: { disabled: "disabledTransparentBackground" },
        color: { disabled: "disabledTransparentForeground" },
        fill: { disabled: "disabledTransparentForeground" },
      }),
    },
    hierarchy: {
      primary: {},
      secondary: {},
      danger: {},
    },
    size: {
      small: extendedHitAreaRecipe({ axis: "y" }),
      medium: [],
      large: [],
    },
    active: {
      true: bentoSprinkles({
        color: "primaryTransparentEnabledForeground",
        background: "backgroundSecondary",
      }),
    },
  },
  compoundVariants: [
    {
      variants: {
        kind: "solid",
        hierarchy: "primary",
      },
      style: bentoSprinkles({
        color: {
          default: "primarySolidEnabledForeground",
          hover: "primarySolidHoverForeground",
          focus: "primarySolidFocusForeground",
        },
        fill: {
          default: "primarySolidEnabledForeground",
          hover: "primarySolidHoverForeground",
          focus: "primarySolidFocusForeground",
        },
        background: {
          default: "primarySolidEnabledBackground",
          hover: "primarySolidHoverBackground",
          focus: "primarySolidFocusBackground",
        },
      }),
    },
    {
      variants: {
        kind: "solid",
        hierarchy: "secondary",
      },
      style: bentoSprinkles({
        color: {
          default: "secondarySolidEnabledForeground",
          hover: "secondarySolidHoverForeground",
          focus: "secondarySolidFocusForeground",
        },
        fill: {
          default: "secondarySolidEnabledForeground",
          hover: "secondarySolidHoverForeground",
          focus: "secondarySolidFocusForeground",
        },
        background: {
          default: "secondarySolidEnabledBackground",
          hover: "secondarySolidHoverBackground",
          focus: "secondarySolidFocusBackground",
        },
      }),
    },
    {
      variants: {
        kind: "solid",
        hierarchy: "danger",
      },
      style: bentoSprinkles({
        color: {
          default: "dangerSolidEnabledForeground",
          hover: "dangerSolidHoverForeground",
          focus: "dangerSolidFocusForeground",
        },
        fill: {
          default: "dangerSolidEnabledForeground",
          hover: "dangerSolidHoverForeground",
          focus: "dangerSolidFocusForeground",
        },
        background: {
          default: "dangerSolidEnabledBackground",
          hover: "dangerSolidHoverBackground",
          focus: "dangerSolidFocusBackground",
        },
      }),
    },
    {
      variants: {
        kind: "transparent",
        hierarchy: "primary",
      },
      style: bentoSprinkles({
        color: {
          default: "primaryTransparentEnabledForeground",
          hover: "primaryTransparentHoverForeground",
          focus: "primaryTransparentFocusForeground",
        },
        fill: {
          default: "primaryTransparentEnabledForeground",
          hover: "primaryTransparentHoverForeground",
          focus: "primaryTransparentFocusForeground",
        },
        background: {
          default: "primaryTransparentEnabledBackground",
          hover: "primaryTransparentHoverBackground",
          focus: "primaryTransparentFocusBackground",
        },
      }),
    },
    {
      variants: {
        kind: "transparent",
        hierarchy: "secondary",
      },
      style: bentoSprinkles({
        color: {
          default: "secondaryTransparentEnabledForeground",
          hover: "secondaryTransparentHoverForeground",
          focus: "secondaryTransparentFocusForeground",
        },
        fill: {
          default: "secondaryTransparentEnabledForeground",
          hover: "secondaryTransparentHoverForeground",
          focus: "secondaryTransparentFocusForeground",
        },
        background: {
          default: "secondaryTransparentEnabledBackground",
          hover: "secondaryTransparentHoverBackground",
          focus: "secondaryTransparentFocusBackground",
        },
      }),
    },
    {
      variants: {
        kind: "transparent",
        hierarchy: "danger",
      },
      style: bentoSprinkles({
        color: {
          default: "dangerTransparentEnabledForeground",
          hover: "dangerTransparentHoverForeground",
          focus: "dangerTransparentFocusForeground",
        },
        fill: {
          default: "dangerTransparentEnabledForeground",
          hover: "dangerTransparentHoverForeground",
          focus: "dangerTransparentFocusForeground",
        },
        background: {
          default: "dangerTransparentEnabledBackground",
          hover: "dangerTransparentHoverBackground",
          focus: "dangerTransparentFocusBackground",
        },
      }),
    },
    {
      variants: {
        kind: "outline",
        hierarchy: "primary",
      },
      style: bentoSprinkles({
        color: {
          default: "primaryTransparentEnabledForeground",
          hover: "primaryTransparentHoverForeground",
          focus: "primaryTransparentFocusForeground",
        },
        fill: {
          default: "primaryTransparentEnabledForeground",
          hover: "primaryTransparentHoverForeground",
          focus: "primaryTransparentFocusForeground",
        },
        background: {
          default: "primaryTransparentEnabledBackground",
          hover: "primaryTransparentHoverBackground",
          focus: "primaryTransparentFocusBackground",
        },
        boxShadow: "inherit",
      }),
    },
    {
      variants: {
        kind: "outline",
        hierarchy: "secondary",
      },
      style: bentoSprinkles({
        color: {
          default: "secondaryTransparentEnabledForeground",
          hover: "secondaryTransparentHoverForeground",
          focus: "secondaryTransparentFocusForeground",
        },
        fill: {
          default: "secondaryTransparentEnabledForeground",
          hover: "secondaryTransparentHoverForeground",
          focus: "secondaryTransparentFocusForeground",
        },
        background: {
          default: "secondaryTransparentEnabledBackground",
          hover: "secondaryTransparentHoverBackground",
          focus: "secondaryTransparentFocusBackground",
        },
        boxShadow: "inherit",
      }),
    },
    {
      variants: {
        kind: "outline",
        hierarchy: "danger",
      },
      style: bentoSprinkles({
        color: {
          default: "dangerTransparentEnabledForeground",
          hover: "dangerTransparentHoverForeground",
          focus: "dangerTransparentFocusForeground",
        },
        fill: {
          default: "dangerTransparentEnabledForeground",
          hover: "dangerTransparentHoverForeground",
          focus: "dangerTransparentFocusForeground",
        },
        background: {
          default: "dangerTransparentEnabledBackground",
          hover: "dangerTransparentHoverBackground",
          focus: "dangerTransparentFocusBackground",
        },
        boxShadow: "inherit",
      }),
    },
  ],
});
