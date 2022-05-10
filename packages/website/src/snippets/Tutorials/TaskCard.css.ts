import { bentoSprinkles, strictRecipe } from "@buildo/bento-design-system";

export const taskCardRecipe = strictRecipe({
  base: bentoSprinkles({
    boxShadow: "elevationSmall",
    outlineStyle: "solid",
    borderRadius: 4,
    outlineWidth: 1,
    background: "backgroundSecondary",
    padding: 16,
  }),
  variants: {
    status: {
      InProgress: bentoSprinkles({
        outlineColor: "outlineContainer",
      }),
      Blocked: bentoSprinkles({
        outlineWidth: 2,
        outlineColor: "outlineNegative",
      }),
      Done: bentoSprinkles({
        outlineColor: "outlinePositive",
      }),
    },
  },
});
