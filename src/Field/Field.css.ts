import { bentoSprinkles } from "../internal/sprinkles.css";
import { strictRecipe } from "../util/strictRecipe";
import { vars } from "../vars.css";

export const inputRecipe = strictRecipe({
  base: [
    {
      "::placeholder": {
        color: vars.textColor.textSecondary,
      },
      selectors: {
        "&:disabled::placeholder": {
          color: vars.textColor.textDisabled,
        },
      },
    },
    bentoSprinkles({
      background: "backgroundPrimary",
      boxShadow: {
        disabled: "outlineDisabled",
      },
      outline: "none",
    }),
  ],
  variants: {
    validation: {
      valid: bentoSprinkles({
        boxShadow: {
          default: "outlineInteractive",
          focus: "outlineInteractiveStrong",
        },
      }),
      invalid: bentoSprinkles({
        boxShadow: {
          default: "outlineNegative",
          focus: "outlineNegativeStrong",
        },
      }),
    },
  },
});
