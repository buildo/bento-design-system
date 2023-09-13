import { bentoSprinkles } from "../internal";
import { strictRecipe } from "../util/strictRecipe";

export const tabRecipe = strictRecipe({
  base: bentoSprinkles({
    color: { disabled: "disabledTransparentForeground" },
    fill: { disabled: "disabledTransparentForeground" },
    cursor: { disabled: "notAllowed" },
    outline: "none",
  }),
  variants: {
    active: {
      false: bentoSprinkles({
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
        cursor: "pointer",
      }),
      true: bentoSprinkles({
        color: { default: "textPrimary", hover: "textPrimary", focus: "textPrimary" },
        fill: { default: "textPrimary", hover: "textPrimary", focus: "textPrimary" },
      }),
    },
    kind: {
      folder: {},
      underline: {},
    },
  },
  compoundVariants: [
    {
      variants: {
        active: false,
        kind: "folder",
      },
      style: bentoSprinkles({
        background: {
          default: "secondaryTransparentEnabledBackground",
          hover: "secondaryTransparentHoverBackground",
          focus: "secondaryTransparentFocusBackground",
        },
      }),
    },
    {
      variants: {
        active: true,
        kind: "folder",
      },
      style: bentoSprinkles({
        background: {
          default: "backgroundInteractiveOverlay",
          hover: "backgroundInteractiveOverlay",
          focus: "backgroundInteractiveOverlay",
        },
      }),
    },
  ],
});
