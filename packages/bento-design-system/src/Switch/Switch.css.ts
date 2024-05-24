import { style } from "@vanilla-extract/css";
import { vars } from "../vars.css";
import { bentoSprinkles } from "../internal";
import { strictRecipe } from "../util/strictRecipe";
import { extendedHitAreaRecipe } from "../util/extendedHitArea.css";
import { statusProperties } from "../util/atoms";

export const switchContainer = style([
  { position: "relative", zIndex: "1" },
  extendedHitAreaRecipe({ axis: "y" }),
]);

export const switchOuterRecipe = strictRecipe({
  base: [
    style({
      width: "42px",
    }),
    bentoSprinkles({
      height: 24,
      padding: 4,
      display: "flex",
      borderRadius: "circledX",
    }),
  ],
  variants: {
    isSelected: {
      false: [
        bentoSprinkles({
          justifyContent: "flexStart",
          background: {
            default: "backgroundPrimary",
          },
          boxShadow: "outlineInputEnabled",
        }),
        {
          selectors: {
            [`${switchContainer}:hover:not([disabled]) &`]: {
              boxShadow: statusProperties.boxShadow.outlineInputHover,
            },
          },
        },
      ],
      true: [
        bentoSprinkles({
          justifyContent: "flexEnd",
          background: "primarySolidEnabledBackground",
          boxShadow: "none",
        }),
        {
          selectors: {
            [`${switchContainer}:hover:not([disabled]) &`]: {
              background: vars.interactiveBackgroundColor.primarySolidHoverBackground,
            },
          },
        },
      ],
    },
    isFocused: {
      true: bentoSprinkles({
        boxShadow: "outlineInputFocus",
      }),
    },
    isDisabled: {
      true: [
        bentoSprinkles({
          boxShadow: "outlineInputDisabled",
        }),
      ],
    },
  },
  compoundVariants: [
    {
      variants: {
        isSelected: true,
        isFocused: true,
      },
      style: [
        bentoSprinkles({
          background: "primarySolidFocusBackground",
          boxShadow: "none",
        }),
      ],
    },
    {
      variants: {
        isSelected: true,
        isDisabled: true,
      },
      style: [
        bentoSprinkles({
          background: "disabledSolidBackground",
          boxShadow: "none",
        }),
      ],
    },
  ],
});

export const switchInnerRecipe = strictRecipe({
  base: bentoSprinkles({
    width: 16,
    height: 16,
    display: "flex",
    borderRadius: "circled",
  }),
  variants: {
    isSelected: {
      false: style({
        background: vars.interactiveForegroundColor.primaryTransparentEnabledForeground,
        selectors: {
          [`${switchContainer}:hover:not([disabled]) &`]: {
            background: vars.interactiveForegroundColor.primaryTransparentHoverForeground,
          },
        },
      }),
      true: style({
        background: vars.interactiveForegroundColor.primarySolidEnabledForeground,
        selectors: {
          [`${switchContainer}:hover:not([disabled]) &`]: {
            background: vars.interactiveForegroundColor.primarySolidHoverForeground,
          },
        },
      }),
    },
    isFocused: {
      true: style({
        background: vars.interactiveForegroundColor.primaryTransparentFocusForeground,
      }),
    },
    isDisabled: {
      true: style({
        background: vars.interactiveForegroundColor.disabledTransparentForeground,
      }),
    },
  },
  compoundVariants: [
    {
      variants: {
        isSelected: true,
        isFocused: true,
      },
      style: style({
        background: vars.interactiveForegroundColor.primarySolidFocusForeground,
      }),
    },
    {
      variants: {
        isSelected: true,
        isDisabled: true,
      },
      style: style({
        background: vars.interactiveForegroundColor.disabledSolidForeground,
      }),
    },
  ],
});
