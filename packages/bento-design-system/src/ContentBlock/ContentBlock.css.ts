import { strictRecipe } from "../util/strictRecipe";

export const contentBlockRecipe = strictRecipe({
  variants: {
    alignSelf: {
      left: {},
      center: { margin: "0 auto" },
    },
  },
});
