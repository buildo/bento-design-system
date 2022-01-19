import { bentoSprinkles } from "../internal/sprinkles.css";
import { strictRecipe } from "../util/strictRecipe";
import { vars } from "../vars.css";

export const inputRecipe = strictRecipe({
  base: [
    {
      "::placeholder": {
        color: vars.color.textSecondary,
      },
      selectors: {
        "&:disabled::placeholder": {
          color: vars.color.textDisabled,
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
        boxShadow: { default: "neutral", focus: "primaryStrong" },
      }),
      invalid: bentoSprinkles({
        boxShadow: { default: "negative", focus: "negativeStrong" },
      }),
    },
  },
});
