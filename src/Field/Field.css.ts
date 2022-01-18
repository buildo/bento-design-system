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
          color: "onDisabled",
        },
      },
    },
    bentoSprinkles({
      background: {
        default: "primary",
        disabled: "disabled",
      },
      outline: "none",
    }),
  ],
  variants: {
    validation: {
      valid: bentoSprinkles({
        boxShadow: { focus: "primaryStrong" },
      }),
      invalid: bentoSprinkles({
        boxShadow: { default: "negative", focus: "negativeStrong" },
      }),
    },
  },
});
