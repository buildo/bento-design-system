import { createVar } from "@vanilla-extract/css";
import { bentoSprinkles } from "../internal/sprinkles.css";
import { strictRecipe } from "../util/strictRecipe";
import { vars } from "../vars.css";

export const readOnlyBackground = createVar();

const notDisabled = ":not(:disabled):not([disabled])";

export const inputRecipe = strictRecipe({
  base: [
    {
      "::placeholder": {
        color: vars.textColor.textSecondary,
      },
      selectors: {
        "&:disabled, &[disabled]": {
          background: vars.backgroundColor.backgroundPrimary,
        },
        "&:disabled::placeholder": {
          color: vars.textColor.textDisabled,
        },
        [`input&:read-only${notDisabled}, textarea&:read-only${notDisabled}, &.readOnly${notDisabled}, &[readonly]${notDisabled}`]:
          {
            background: readOnlyBackground,
          },
      },
    },
    bentoSprinkles({
      boxShadow: {
        disabled: "outlineInputDisabled",
      },
      outline: "none",
    }),
  ],
  variants: {
    validation: {
      valid: [
        bentoSprinkles({
          boxShadow: {
            default: "outlineInputEnabled",
            hover: "outlineInputHover",
            focus: "outlineInputFocus",
          },
        }),
        {
          selectors: {
            [`&:focus-within${notDisabled}`]: {
              boxShadow: vars.boxShadow.outlineInputFocus,
            },
          },
        },
      ],
      invalid: [
        bentoSprinkles({
          boxShadow: {
            default: "outlineNegative",
            focus: "outlineNegativeStrong",
          },
        }),
        {
          selectors: {
            [`&:focus-within${notDisabled}`]: {
              boxShadow: vars.boxShadow.outlineNegativeStrong,
            },
          },
        },
      ],
      notSet: {},
    },
  },
});
