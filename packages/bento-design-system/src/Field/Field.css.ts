import { createVar, style } from "@vanilla-extract/css";
import { bentoSprinkles } from "../internal/sprinkles.css";
import { strictRecipe } from "../util/strictRecipe";
import { vars } from "../vars.css";

export const readOnlyBackground = createVar();

const notDisabled = ":not(:disabled):not([disabled])";

export const input = style({
  background: "transparent",
  "::placeholder": {
    color: vars.textColor.textSecondary,
  },
  selectors: {
    [`&:disabled::placeholder`]: {
      color: vars.textColor.textDisabled,
    },
  },
});

const inputContainerRecipeVariants = {
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
} as const;

export const inputContainerRecipe = strictRecipe({
  base: [
    bentoSprinkles({
      boxShadow: {
        disabled: "outlineInputDisabled",
      },
      outline: "none",
    }),
    {
      selectors: {
        [`&:disabled, &[disabled]`]: {
          background: vars.backgroundColor.backgroundPrimary,
        },
        [`input&:read-only${notDisabled}, textarea&:read-only${notDisabled}, &.readOnly${notDisabled}, &[readonly]${notDisabled}`]:
          {
            background: readOnlyBackground,
          },
      },
    },
  ],
  variants: inputContainerRecipeVariants,
});

export const inputRecipe = strictRecipe({
  base: [
    input,
    {
      selectors: {
        "&[disabled], &:disabled": {
          boxShadow: vars.boxShadow.outlineInputDisabled,
        },
      },
    },
  ],
  variants: inputContainerRecipeVariants,
});
