import { style } from "@vanilla-extract/css";
import { bentoSprinkles } from "../internal";
import { strictRecipe } from "../util/strictRecipe";
import { vars } from "../vars.css";

const trackContainerHeight = 24;
const trackHeight = 8;
const trackOffsetY = (trackContainerHeight - trackHeight) / 2;

export const slider = style({
  // NOTE(gabro): not super pretty, but this is because the thumbs as positioned absolutely,
  // so their labels don't contribute to the vertical space, causing them to overlap with elements
  // below the Slider.
  // This takes into account the height the label + the space between the label and the thumb
  paddingBottom: `calc(${vars.lineHeight.bodyMedium} + ${vars.space[8]})`,
});

export const trackContainer = style([
  {
    height: trackContainerHeight,
  },
  bentoSprinkles({
    position: "relative",
    width: "full",
  }),
]);

export const trackActive = style([
  { height: 8, top: trackOffsetY },
  bentoSprinkles({
    color: "foregroundDisabled",
    background: {
      disabled: "currentColor",
    },
    position: "absolute",
    width: "full",
    borderRadius: "circledX",
  }),
]);

export const trackInactiveRecipe = strictRecipe({
  base: [
    { height: 8, top: trackOffsetY },
    bentoSprinkles({
      position: "absolute",
      background: "backgroundOverlay",
      borderRadius: "circledX",
    }),
  ],
  variants: {
    side: {
      left: { left: 0 },
      right: { right: 0 },
    },
  },
});

export const thumbRecipe = strictRecipe({
  base: [
    {
      width: 24,
      height: 24,
    },
    bentoSprinkles({
      cursor: { default: "pointer", disabled: "notAllowed" },
      background: "backgroundSecondary",
      boxShadow: {
        disabled: "outlineInputDisabled",
        hover: "outlineInputHover",
      },
      borderRadius: 8,
    }),
  ],
  variants: {
    isFocused: {
      true: bentoSprinkles({
        boxShadow: {
          default: "outlineInputFocus",
        },
      }),
      false: bentoSprinkles({
        boxShadow: {
          default: "outlineInputEnabled",
        },
      }),
    },
  },
});
