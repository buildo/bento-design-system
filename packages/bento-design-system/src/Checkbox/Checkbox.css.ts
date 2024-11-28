import { bentoSprinkles } from "../internal";
import { strictRecipe } from "../util/strictRecipe";
import { extendedHitAreaRecipe } from "../util/extendedHitArea.css";

export const fieldContainer = extendedHitAreaRecipe({ axis: "y" });

export const checkboxRecipe = strictRecipe({
  base: [
    { position: "relative" },
    bentoSprinkles({
      width: 24,
      height: 24,
      display: "flex",
      alignItems: "center",
      padding: 4,
      boxShadow: "outlineInputEnabled",
    }),
  ],
  variants: {
    isSelected: {
      false: bentoSprinkles({
        boxShadow: { hover: "outlineInputHover" },
        background: { default: "backgroundPrimary" },
      }),
      true: bentoSprinkles({
        boxShadow: "none",
        background: {
          default: "primarySolidEnabledBackground",
          hover: "primarySolidHoverBackground",
        },
      }),
    },
    isFocused: {
      true: bentoSprinkles({
        boxShadow: "outlineInputFocus",
      }),
    },
    isDisabled: {
      true: bentoSprinkles({
        boxShadow: { default: "outlineInputDisabled", hover: "outlineInputDisabled" },
        background: "backgroundPrimary",
        cursor: "notAllowed",
      }),
    },
  },
  compoundVariants: [
    {
      variants: {
        isFocused: true,
        isSelected: true,
      },
      style: bentoSprinkles({
        background: "primarySolidFocusBackground",
      }),
    },
  ],
});
