import { bentoSprinkles } from "../internal";
import { strictRecipe } from "../util/strictRecipe";

export const listItemRecipe = strictRecipe({
  variants: {
    interactive: {
      true: bentoSprinkles({
        cursor: { default: "pointer", disabled: "notAllowed" },
      }),
    },
    focused: {
      true: bentoSprinkles({
        background: "secondaryTransparentFocusBackground",
      }),
    },
    selected: {
      true: {},
    },
  },
  compoundVariants: [
    {
      variants: {
        interactive: true,
        selected: true,
      },
      style: bentoSprinkles({
        background: {
          default: "backgroundInteractiveOverlay",
          hover: "secondaryTransparentHoverBackground",
          focus: "secondaryTransparentFocusBackground",
          disabled: "disabledTransparentBackground",
        },
      }),
    },
    {
      variants: {
        interactive: true,
        selected: false,
      },
      style: bentoSprinkles({
        background: {
          default: "secondaryTransparentEnabledBackground",
          hover: "secondaryTransparentHoverBackground",
          focus: "secondaryTransparentFocusBackground",
          disabled: "disabledTransparentBackground",
        },
      }),
    },
  ],
});
