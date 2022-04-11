import { style } from "@vanilla-extract/css";
import { bentoSprinkles } from "../internal";
import { strictRecipe } from "../util/strictRecipe";

export const calendar = [
  bentoSprinkles({
    position: "absolute",
    display: "flex",
    outline: "none",
  }),
];

export const input = bentoSprinkles({
  outline: "none",
  background: "primaryTransparentEnabledBackground",
  width: "full",
});

export const weekDay = [
  style({ display: "inline-flex" }),
  bentoSprinkles({
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  }),
];

export const dayRecipe = strictRecipe({
  base: [
    style({ display: "inline-flex" }),
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
      selectedStart: bentoSprinkles({
        color: { default: "foregroundPrimaryInverse", hover: "textPrimary" },
        background: { default: "backgroundInteractive", hover: "backgroundSecondary" },
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
      }),
      selectedEnd: bentoSprinkles({
        color: { default: "foregroundPrimaryInverse", hover: "textPrimary" },
        background: { default: "backgroundInteractive", hover: "backgroundSecondary" },
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
      }),
      selectedRange: bentoSprinkles({
        color: "textPrimary",
        background: { default: "backgroundInteractiveOverlay", hover: "backgroundSecondary" },
      }),
      selected: bentoSprinkles({
        color: { default: "foregroundPrimaryInverse", hover: "textPrimary" },
        background: { default: "backgroundInteractive", hover: "backgroundSecondary" },
        borderRadius: 4,
      }),
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
