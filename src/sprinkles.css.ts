import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";
import { unconditionalProperties, responsiveProperties, statusProperties } from "./util/atoms";
import { breakpoints } from "./util/breakpoints";
import { statusConditions } from "./util/conditions";

const unconditionalAtomicProperties = defineProperties({
  properties: unconditionalProperties,
});

const responsiveAtomicProperties = defineProperties({
  conditions: breakpoints,
  defaultCondition: "desktop",
  properties: responsiveProperties,
  shorthands: {
    padding: ["paddingTop", "paddingBottom", "paddingLeft", "paddingRight"],
    paddingX: ["paddingLeft", "paddingRight"],
    paddingY: ["paddingTop", "paddingBottom"],
  },
});

const statusAtomicProperties = defineProperties({
  conditions: statusConditions,
  defaultCondition: "default",
  properties: statusProperties,
});

export const baseSprinkles = createSprinkles(
  unconditionalAtomicProperties,
  statusAtomicProperties,
  responsiveAtomicProperties
);
