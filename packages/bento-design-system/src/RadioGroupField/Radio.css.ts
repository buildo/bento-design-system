import { style } from "@vanilla-extract/css";
import { bentoSprinkles } from "../internal";
import { strictRecipe } from "../util/strictRecipe";
import { vars } from "../vars.css";
import { radioOption } from "./RadioGroupField.css";
import { statusProperties } from "../util/atoms";

export const outerRadioCircleRecipe = strictRecipe({
  base: bentoSprinkles({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 24,
    height: 24,
    borderRadius: "circled",
    background: "backgroundPrimary",
  }),
  variants: {
    selected: {
      false: [
        bentoSprinkles({ boxShadow: "outlineInputEnabled" }),
        {
          selectors: {
            [`${radioOption}:hover:not([disabled]) &`]: {
              boxShadow: statusProperties.boxShadow.outlineInputHover,
            },
            [`${radioOption}[disabled] &`]: {
              boxShadow: statusProperties.boxShadow.outlineInputDisabled,
            },
          },
        },
      ],
      true: [
        bentoSprinkles({ background: "primarySolidEnabledBackground" }),
        {
          selectors: {
            [`${radioOption}:hover:not([disabled]) &`]: {
              background: vars.interactiveBackgroundColor.primarySolidHoverBackground,
            },
            [`${radioOption}[disabled] &`]: {
              background: vars.interactiveBackgroundColor.disabledSolidBackground,
            },
          },
        },
      ],
    },
    focused: {
      true: { background: vars.interactiveBackgroundColor.primarySolidFocusBackground },
    },
  },
});

export const innerRadioCircle = [
  bentoSprinkles({
    background: "backgroundPrimary",
    borderRadius: "circled",
  }),
  style({ width: 10, height: 10 }),
];
