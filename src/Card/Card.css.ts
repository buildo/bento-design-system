import { bentoSprinkles } from "../internal";
import { strictRecipe } from "../util/strictRecipe";

export const cardRecipe = strictRecipe({
  base: bentoSprinkles({
    background: "backgroundPrimary",
    outlineColor: "outlineContainer",
    outlineStyle: "solid",
    outlineWidth: 1,
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
