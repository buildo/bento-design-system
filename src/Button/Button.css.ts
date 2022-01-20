import { strictRecipe } from "../util/strictRecipe";
import { bentoSprinkles } from "../internal/sprinkles.css";
import { extendedHitAreaRecipe } from "../util/extendedHitArea.css";

export const buttonRecipe = strictRecipe({
  base: bentoSprinkles({
    textTransform: "uppercase",
    cursor: {
      default: "pointer",
      disabled: "notAllowed",
    },
    outline: "none",
  }),
  variants: {
    kind: {
      primary: bentoSprinkles({
        color: {
          default: "interactivePrimaryOnEnabled",
          focus: "interactivePrimaryOnFocus",
          hover: "interactivePrimaryOnHover",
          disabled: "interactiveOnDisabled",
        },
        background: {
          default: "interactivePrimaryEnabled",
          focus: "interactivePrimaryFocus",
          hover: "interactivePrimaryHover",
          disabled: "interactiveDisabled",
        },
      }),
      danger: bentoSprinkles({
        color: {
          default: "interactiveDangerOnEnabled",
          focus: "interactiveDangerOnFocus",
          hover: "interactiveDangerOnHover",
          disabled: "interactiveOnDisabled",
        },
        background: {
          default: "interactiveDangerEnabled",
          focus: "interactiveDangerFocus",
          hover: "interactiveDangerHover",
          disabled: "disabled",
        },
      }),
      ghostPrimary: bentoSprinkles({
        color: {
          default: "interactivePrimaryEnabled",
          hover: "interactivePrimaryHover",
          focus: "interactivePrimaryFocus",
          disabled: "interactiveDisabled",
        },
        background: "transparent",
      }),
      ghostDanger: bentoSprinkles({
        color: {
          default: "interactiveDangerEnabled",
          focus: "interactiveDangerFocus",
          hover: "interactiveDangerHover",
          disabled: "interactiveDisabled",
        },
        background: "transparent",
      }),
    },
    size: {
      small: extendedHitAreaRecipe({ axis: "y" }),
      medium: [],
    },
  },
});
