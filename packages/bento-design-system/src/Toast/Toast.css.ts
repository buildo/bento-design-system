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
    hasOutline: {
      true: {
        borderWidth: 1,
        borderStyle: "solid",
      },
    },
    elevation: {
      none: {},
      small: { boxShadow: "elevationSmall" },
      medium: { boxShadow: "elevationMedium" },
      large: { boxShadow: "elevationLarge" },
    },
  },
  compoundVariants: [
    {
      variants: {
        kind: "informative",
        hasOutline: true,
      },
      style: bentoSprinkles({ borderColor: "outlineInformative" }),
    },
    {
      variants: {
        kind: "positive",
        hasOutline: true,
      },
      style: bentoSprinkles({ borderColor: "outlinePositive" }),
    },
    {
      variants: {
        kind: "warning",
        hasOutline: true,
      },
      style: bentoSprinkles({ borderColor: "outlineWarning" }),
    },
    {
      variants: {
        kind: "negative",
        hasOutline: true,
      },
      style: bentoSprinkles({ borderColor: "outlineNegative" }),
    },
    {
      variants: {
        kind: "secondary",
        hasOutline: true,
      },
      style: bentoSprinkles({ borderColor: "outlineDecorative" }),
    },
  ],
});
