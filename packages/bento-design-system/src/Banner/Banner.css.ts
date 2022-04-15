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
    hasOutline: { true: {} },
  },
  compoundVariants: [
    {
      variants: {
        kind: "informative",
        hasOutline: true,
      },
      style: bentoSprinkles({ boxShadow: "outlineInformative" }),
    },
    {
      variants: {
        kind: "positive",
        hasOutline: true,
      },
      style: bentoSprinkles({ boxShadow: "outlinePositive" }),
    },
    {
      variants: {
        kind: "warning",
        hasOutline: true,
      },
      style: bentoSprinkles({ boxShadow: "outlineWarning" }),
    },
    {
      variants: {
        kind: "negative",
        hasOutline: true,
      },
      style: bentoSprinkles({ boxShadow: "outlineNegative" }),
    },
    {
      variants: {
        kind: "secondary",
        hasOutline: true,
      },
      style: bentoSprinkles({ boxShadow: "outlineDecorative" }),
    },
  ],
});
