import { bentoSprinkles } from "../internal";
import { strictRecipe } from "../util/strictRecipe";

export const toastRecipe = strictRecipe({
  base: [
    {
      width: 320,
    },
  ],
  variants: {
    kind: {
      informative: bentoSprinkles({ background: "backgroundInformative" }),
      positive: bentoSprinkles({ background: "backgroundPositive" }),
      negative: bentoSprinkles({ background: "backgroundNegative" }),
      warning: bentoSprinkles({ background: "backgroundWarning" }),
      secondary: bentoSprinkles({ background: "backgroundSecondary" }),
    },
  },
});
