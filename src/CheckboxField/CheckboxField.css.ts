import { bentoSprinkles } from "../internal";
import { strictRecipe } from "../util/strictRecipe";
import { extendedHitAreaRecipe } from "../util/extendedHitArea.css";

export const fieldContainer = extendedHitAreaRecipe({ axis: "y" });

export const checkboxRecipe = strictRecipe({
  base: [
    { position: "relative", zIndex: "1" },
    bentoSprinkles({
      width: "24",
      height: "24",
      display: "flex",
      alignItems: "center",
      padding: "4",
      borderRadius: "4",
      boxShadow: "outlineInteractive",
    }),
  ],
  variants: {
    isSelected: {
      false: bentoSprinkles({
        boxShadow: { hover: "outlineInteractiveStrong" },
        background: { default: "backgroundPrimary" },
      }),
      true: bentoSprinkles({
        boxShadow: "none",
        background: {
          default: "solidEnabledBackground",
          hover: "solidHoverBackground",
        },
      }),
    },
    isFocused: {
      true: bentoSprinkles({
        boxShadow: "outlineInteractiveStrong",
      }),
    },
    isDisabled: {
      true: bentoSprinkles({
        boxShadow: { default: "outlineDisabled", hover: "outlineDisabled" },
        background: "solidDisabledBackground",
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
        background: "solidFocusBackground",
      }),
    },
  ],
});
