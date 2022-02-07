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
      primary: bentoSprinkles({
        color: {
          default: "solidEnabledForeground",
          focus: "solidFocusForeground",
          hover: "solidHoverForeground",
          disabled: "solidDisabledForeground",
        },
        background: {
          default: "solidEnabledBackground",
          focus: "solidFocusBackground",
          hover: "solidHoverBackground",
          disabled: "solidDisabledBackground",
        },
      }),
      danger: bentoSprinkles({
        color: {
          default: "dangerEnabledForeground",
          focus: "dangerFocusForeground",
          hover: "dangerHoverForeground",
          disabled: "dangerDisabledForeground",
        },
        background: {
          default: "dangerEnabledBackground",
          focus: "dangerFocusBackground",
          hover: "dangerHoverBackground",
          disabled: "dangerDisabledBackground",
        },
      }),
      transparentPrimary: bentoSprinkles({
        color: {
          default: "transparentEnabledForeground",
          focus: "transparentFocusForeground",
          hover: "transparentHoverForeground",
          disabled: "transparentDisabledForeground",
        },
        background: {
          default: "transparentEnabledBackground",
          focus: "transparentFocusBackground",
          hover: "transparentHoverBackground",
          disabled: "transparentDisabledBackground",
        },
      }),
    },
    size: {
      small: extendedHitAreaRecipe({ axis: "y" }),
      medium: [],
    },
  },
});
