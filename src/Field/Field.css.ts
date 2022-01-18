import { bentoSprinkles } from "../internal/sprinkles.css";
import { strictRecipe } from "../util/strictRecipe";

export const inputRecipe = strictRecipe({
  base: [
    {
      "::placeholder": {
        color: "textPrimary",
      },
      selectors: {
        "&:disabled::placeholder": {
          color: "textDisabled",
        },
      },
    },
    bentoSprinkles({
      background: {
        default: "primary",
        disabled: "disabled",
      },
      outline: "none",
      boxShadow: { disabled: "disabled" },
    }),
  ],
  variants: {
    validation: {
      valid: bentoSprinkles({
        boxShadow: { default: "neutral", focus: "elevation4" },
      }),
      invalid: bentoSprinkles({
        boxShadow: { default: "negative", focus: "negativeStrong" },
      }),
    },
  },
});
