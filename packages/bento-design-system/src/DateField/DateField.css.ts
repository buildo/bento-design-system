import { createVar, style } from "@vanilla-extract/css";
import { bentoSprinkles } from "../internal";
import { strictRecipe } from "../util/strictRecipe";

export const topLeftRadius = createVar();
export const topRightRadius = createVar();
export const bottomLeftRadius = createVar();
export const bottomRightRadius = createVar();

export const calendar = bentoSprinkles({
  background: "backgroundPrimary",
  position: "absolute",
  display: "flex",
  outline: "none",
  overflowY: "auto",
  borderColor: "outlineContainer",
  borderStyle: "solid",
  borderWidth: 1,
});

export const dateFieldRecipe = strictRecipe({
  variants: {
    validation: {
      valid: {},
      invalid: {},
      notSet: {},
    },
    isFocused: {
      true: {},
    },
  },
  compoundVariants: [
    {
      variants: {
        validation: "valid",
        isFocused: true,
      },
      style: bentoSprinkles({
        boxShadow: { default: "outlineInputFocus", hover: "outlineInputFocus" },
      }),
    },
    {
      variants: {
        validation: "invalid",
        isFocused: true,
      },
      style: bentoSprinkles({
        boxShadow: { default: "outlineNegativeStrong", hover: "outlineNegativeStrong" },
      }),
    },
  ],
});

export const input = bentoSprinkles({
  outline: "none",
  background: "primaryTransparentEnabledBackground",
  width: "full",
});

export const weekDay = [
  bentoSprinkles({
    display: "flex",
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  }),
];

export const dayRecipe = strictRecipe({
  base: [
    bentoSprinkles({
      display: "flex",
      cursor: "pointer",
      width: 40,
      height: 40,
      alignItems: "center",
      justifyContent: "center",
      outline: "none",
    }),
  ],
  variants: {
    style: {
      default: bentoSprinkles({
        background: {
          hover: "backgroundSecondary",
        },
        color: {
          default: "textPrimary",
          disabled: "textDisabled",
        },
      }),
      selectedStart: [
        bentoSprinkles({
          color: { default: "foregroundPrimaryInverse", hover: "textPrimary" },
          background: { default: "backgroundInteractive", hover: "backgroundSecondary" },
        }),
        style({
          borderTopLeftRadius: topLeftRadius,
          borderBottomLeftRadius: bottomLeftRadius,
        }),
      ],
      selectedEnd: [
        bentoSprinkles({
          color: { default: "foregroundPrimaryInverse", hover: "textPrimary" },
          background: { default: "backgroundInteractive", hover: "backgroundSecondary" },
        }),
        style({
          borderTopRightRadius: topRightRadius,
          borderBottomRightRadius: bottomRightRadius,
        }),
      ],
      selectedRange: bentoSprinkles({
        color: "textPrimary",
        background: { default: "backgroundInteractiveOverlay", hover: "backgroundSecondary" },
      }),
      selected: [
        bentoSprinkles({
          color: { default: "foregroundPrimaryInverse", hover: "textPrimary" },
          background: { default: "backgroundInteractive", hover: "backgroundSecondary" },
        }),
        style({
          borderTopLeftRadius: topLeftRadius,
          borderBottomLeftRadius: bottomLeftRadius,
          borderTopRightRadius: topRightRadius,
          borderBottomRightRadius: bottomRightRadius,
        }),
      ],
      inHoverRange: bentoSprinkles({
        color: "textPrimary",
        background: "backgroundSecondary",
      }),
      disabled: bentoSprinkles({
        color: "textDisabled",
      }),
      focused: bentoSprinkles({
        background: { default: "backgroundOverlay", hover: "backgroundSecondary" },
        color: "textPrimary",
      }),
    },
  },
});

export const selector = bentoSprinkles({
  paddingX: 16,
  paddingY: 8,
  borderRadius: 4,
  background: {
    default: "secondaryTransparentEnabledBackground",
    focus: "secondaryTransparentFocusBackground",
    hover: "secondaryTransparentHoverBackground",
  },
});
