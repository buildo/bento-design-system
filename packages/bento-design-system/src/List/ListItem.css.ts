import { bentoSprinkles } from "../internal";
import { strictRecipe } from "../util/strictRecipe";

export const listItemRecipe = strictRecipe({
  variants: {
    interactive: {
      true: bentoSprinkles({
        cursor: { default: "pointer", disabled: "notAllowed" },
        background: {
          hover: "primaryTransparentHoverBackground",
          focus: "primaryTransparentFocusBackground",
        },
      }),
    },
    focused: {
      true: bentoSprinkles({
        background: "primaryTransparentFocusBackground",
      }),
    },
    selected: {
      true: bentoSprinkles({
        background: "backgroundInteractiveOverlay",
      }),
    },
  },
});
