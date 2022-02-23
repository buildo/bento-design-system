import { bentoSprinkles } from "../internal";
import { strictRecipe } from "../util/strictRecipe";

export const cardRecipe = strictRecipe({
  base: bentoSprinkles({
    background: "backgroundPrimary",
    outline: "outlineContainer",
    overflow: "hidden",
  }),
  variants: {
    elevation: {
      none: {},
      small: bentoSprinkles({ boxShadow: "elevationSmall" }),
      medium: bentoSprinkles({ boxShadow: "elevationMedium" }),
      large: bentoSprinkles({ boxShadow: "elevationLarge" }),
    },
  },
});
