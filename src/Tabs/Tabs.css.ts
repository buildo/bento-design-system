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
        background: "primarySolidEnabledBackground",
        color: "primarySolidEnabledForeground",
        fill: "primarySolidEnabledForeground",
      }),
      false: bentoSprinkles({
        background: {
          default: "primaryTransparentEnabledBackground",
          hover: "primaryTransparentHoverBackground",
          focus: "primaryTransparentFocusBackground",
        },
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
        cursor: "pointer",
      }),
    },
  },
});
