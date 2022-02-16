import { bentoSprinkles } from "../internal";
import { strictRecipe } from "../util/strictRecipe";
import { vars } from "../vars.css";
import { radioOption } from "./RadioGroupField.css";

export const radio = bentoSprinkles({ width: 24, height: 24 });

export const outerRadioCircleRecipe = strictRecipe({
  variants: {
    selected: {
      false: [
        bentoSprinkles({ fill: "outlineInput" }),
        {
          selectors: {
            [`${radioOption}:hover:not([disabled]) &`]: {
              fill: vars.outlineColor.outlineInteractive,
            },
            [`${radioOption}[disabled] &`]: {
              fill: vars.outlineColor.outlineDisabled,
            },
          },
        },
      ],
      true: [
        bentoSprinkles({ fill: "primarySolidEnabledBackground" }),
        {
          selectors: {
            [`${radioOption}:hover:not([disabled]) &`]: {
              fill: vars.interactiveBackgroundColor.primarySolidHoverBackground,
            },
            [`${radioOption}[disabled] &`]: {
              fill: vars.interactiveBackgroundColor.disabledSolidBackground,
            },
          },
        },
      ],
    },
    focused: {
      true: { fill: vars.interactiveBackgroundColor.primarySolidFocusBackground },
    },
  },
});

export const innerRadioCircleRecipe = strictRecipe({
  base: bentoSprinkles({ fill: "backgroundPrimary" }),
  variants: {
    selected: {
      false: {
        r: "11",
        selectors: {
          [`${radioOption}:hover:not([disabled]) &`]: {
            r: "10",
          },
        },
      },
      true: { r: "5" },
    },
    focused: {
      true: {},
    },
  },
  compoundVariants: [
    {
      variants: { selected: false, focused: true },
      style: { r: "10" },
    },
  ],
});
