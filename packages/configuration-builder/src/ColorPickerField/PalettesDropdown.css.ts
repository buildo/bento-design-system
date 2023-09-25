import { sprinkles } from "../sprinkles.css";
import { strictRecipe } from "@buildo/bento-design-system";

export const colorBoxRecipe = strictRecipe({
  base: [
    {
      width: 28,
      height: 28,
    },
    sprinkles({
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: {
        default: "outlineContainer",
        hover: "outlineInputHover",
        focus: "outlineInputHover",
      },
      cursor: "pointer",
      outline: "none",
    }),
  ],
  variants: {
    isSelected: {
      true: sprinkles({ borderRadius: "circled" }),
      false: {},
    },
  },
});
