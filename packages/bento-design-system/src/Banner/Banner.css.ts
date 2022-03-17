import { strictRecipe } from "../util/strictRecipe";
import { bentoSprinkles } from "../internal";

export const bannerRecipe = strictRecipe({
  variants: {
    kind: {
      informative: bentoSprinkles({
        background: "backgroundInformative",
      }),
      positive: bentoSprinkles({
        background: "backgroundPositive",
      }),
      warning: bentoSprinkles({
        background: "backgroundWarning",
      }),
      negative: bentoSprinkles({
        background: "backgroundNegative",
      }),
      secondary: bentoSprinkles({
        background: "backgroundSecondary",
      }),
    },
  },
});
