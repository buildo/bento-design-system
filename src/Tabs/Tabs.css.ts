import { bentoSprinkles } from "../internal";
import { strictRecipe } from "../util/strictRecipe";

export const tabRecipe = strictRecipe({
  base: bentoSprinkles({
    color: { disabled: "disabledTransparentForeground" },
    cursor: { disabled: "notAllowed" },
    outline: "none",
  }),
  variants: {
    active: {
      true: bentoSprinkles({ background: "backgroundPrimaryInverse", color: "textPrimaryInverse" }),
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
        cursor: "pointer",
      }),
    },
  },
});
