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
      true: bentoSprinkles({
        background: "backgroundInteractiveOverlay",
        color: "textInteractive",
        fill: "textInteractive",
      }),
      false: bentoSprinkles({
        background: {
          default: "secondaryTransparentEnabledBackground",
          hover: "secondaryTransparentHoverBackground",
          focus: "secondaryTransparentFocusBackground",
        },
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
    },
  },
});
