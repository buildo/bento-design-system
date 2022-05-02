import { createVar, style } from "@vanilla-extract/css";
import { bentoSprinkles } from "../internal";
import { strictRecipe } from "../util/strictRecipe";

export const dayRadius = createVar();

export const calendar = bentoSprinkles({
  background: "backgroundPrimary",
  position: "absolute",
  display: "flex",
  outline: "none",
  overflowY: "auto",
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
  style({ display: "flex" }),
  bentoSprinkles({
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  }),
];

export const dayRecipe = strictRecipe({
  base: [
    style({ display: "flex" }),
    bentoSprinkles({
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
          borderTopLeftRadius: dayRadius,
          borderBottomLeftRadius: dayRadius,
        }),
      ],
      selectedEnd: [
        bentoSprinkles({
          color: { default: "foregroundPrimaryInverse", hover: "textPrimary" },
          background: { default: "backgroundInteractive", hover: "backgroundSecondary" },
        }),
        style({
          borderTopRightRadius: dayRadius,
          borderBottomRightRadius: dayRadius,
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
          borderRadius: dayRadius,
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
