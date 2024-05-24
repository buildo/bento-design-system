import { recipe } from "@vanilla-extract/recipes";
import { bentoSprinkles } from "../internal";

export const iconRecipe = recipe({
  variants: {
    width: {
      8: bentoSprinkles({ width: 8 }),
      12: bentoSprinkles({ width: 12 }),
      16: bentoSprinkles({ width: 16 }),
      24: bentoSprinkles({ width: 24 }),
      40: bentoSprinkles({ width: 40 }),
    },
    height: {
      8: bentoSprinkles({ height: 8 }),
      12: bentoSprinkles({ height: 12 }),
      16: bentoSprinkles({ height: 16 }),
      24: bentoSprinkles({ height: 24 }),
      40: bentoSprinkles({ height: 40 }),
    },
    color: {
      default: bentoSprinkles({ fill: "foregroundSecondary" }),
      primary: bentoSprinkles({ fill: "foregroundPrimary" }),
      primaryInverse: bentoSprinkles({ fill: "foregroundPrimaryInverse" }),
      secondary: bentoSprinkles({ fill: "foregroundSecondary" }),
      secondaryInverse: bentoSprinkles({ fill: "foregroundSecondaryInverse" }),
      brandPrimary: bentoSprinkles({ fill: "brandPrimary" }),
      brandSecondary: bentoSprinkles({ fill: "brandSecondary" }),
      brandTertiary: bentoSprinkles({ fill: "brandTertiary" }),
      informative: bentoSprinkles({ fill: "foregroundInformative" }),
      positive: bentoSprinkles({ fill: "foregroundPositive" }),
      warning: bentoSprinkles({ fill: "foregroundWarning" }),
      negative: bentoSprinkles({ fill: "foregroundNegative" }),
      disabled: bentoSprinkles({ fill: "foregroundDisabled" }),
      inherit: bentoSprinkles({ fill: "inherit" }),
      interactive: bentoSprinkles({ fill: "foregroundInteractive" }),
      currentColor: bentoSprinkles({ fill: "currentColor" }),
    },
  },
});
