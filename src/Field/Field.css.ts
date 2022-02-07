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
      outline: "outlineInput",
      outlineWidth: { default: "1", active: "2" },
    }),
  ],
  variants: {
    validation: {
      valid: bentoSprinkles({
        outline: { default: "outlineInput", active: "outlineSelected", focus: "outlineSelected" },
      }),
      invalid: bentoSprinkles({
        outline: { default: "outlineNegative" },
      }),
    },
  },
});
