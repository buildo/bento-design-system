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
      background: {
        default: "backgroundPrimary",
        disabled: "backgroundDisabled",
      },
      outline: "none",
      boxShadow: { disabled: "disabled" },
    }),
  ],
  variants: {
    validation: {
      valid: bentoSprinkles({
        boxShadow: { default: "neutral", focus: "primaryStrong" },
      }),
      invalid: bentoSprinkles({
        boxShadow: { default: "negative", focus: "negativeStrong" },
      }),
    },
  },
});
