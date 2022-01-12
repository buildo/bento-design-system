import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";
import {
  buildResponsivePropertyOptions,
  buildStatusPropertyOptions,
  buildUnconditionalPropertyOptions,
} from "./util/atoms";

const unconditionalProperties = defineProperties(buildUnconditionalPropertyOptions({}));
const responsiveProperties = defineProperties({
  ...buildResponsivePropertyOptions({}),
  shorthands: {
    padding: ["paddingTop", "paddingBottom", "paddingLeft", "paddingRight"],
    paddingX: ["paddingLeft", "paddingRight"],
    paddingY: ["paddingTop", "paddingBottom"],
  },
});
const statusProperties = defineProperties(buildStatusPropertyOptions({}));

export const baseSprinkles = createSprinkles(
  unconditionalProperties,
  statusProperties,
  responsiveProperties
);
