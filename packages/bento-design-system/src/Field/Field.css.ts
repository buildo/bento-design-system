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
        "input&:read-only, textarea&:read-only, &.readOnly": {
          background: vars.backgroundColor.backgroundSecondary,
        },
      },
    },
    bentoSprinkles({
      background: "backgroundPrimary",
      boxShadow: {
        disabled: "outlineInputDisabled",
      },
      outline: "none",
    }),
  ],
  variants: {
    validation: {
      valid: bentoSprinkles({
        boxShadow: {
          default: "outlineInputEnabled",
          hover: "outlineInputHover",
          focus: "outlineInputFocus",
        },
      }),
      invalid: bentoSprinkles({
        boxShadow: {
          default: "outlineNegative",
          focus: "outlineNegativeStrong",
        },
      }),
      notSet: {},
    },
  },
});
