import { bentoSprinkles } from "../internal/sprinkles.css";
import { strictRecipe } from "../util/strictRecipe";

export const linkRecipe = strictRecipe({
  base: bentoSprinkles({
    cursor: {
      default: "pointer",
      disabled: "notAllowed",
    },
    outline: "none",
    textDecoration: {
      default: "underline",
      active: "none",
      hover: "underline",
      focus: "underline",
      disabled: "underline",
    },
  }),
  variants: {
    kind: {
      default: bentoSprinkles({
        color: {
          default: "linkEnabled",
          hover: "linkHover",
          focus: "linkFocus",
          disabled: "linkDisabled",
        },
      }),
      inverse: bentoSprinkles({
        color: {
          default: "linkEnabledInverse",
          hover: "linkHoverInverse",
          focus: "linkFocusInverse",
          disabled: "linkDisabledInverse",
        },
      }),
    },
  },
});
