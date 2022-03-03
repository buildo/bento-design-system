import {
  defineProperties,
  createSprinkles,
  createMapValueFn,
  createNormalizeValueFn,
  ConditionalValue,
  RequiredConditionalValue,
} from "@vanilla-extract/sprinkles";
import { breakpoints } from "../src/util/breakpoints";
import { unconditionalProperties, statusProperties, responsiveProperties } from "./atoms";
import { statusConditions } from "../src/util/conditions";

const unconditionalAtomicProperties = defineProperties({
  properties: unconditionalProperties,
  shorthands: {
    borderTopRadius: ["borderTopLeftRadius", "borderTopRightRadius"],
    borderBottomRadius: ["borderBottomLeftRadius", "borderBottomRightRadius"],
  },
});

const responsiveAtomicProperties = defineProperties({
  conditions: breakpoints,
  defaultCondition: "desktop",
  properties: responsiveProperties,
  shorthands: {
    inset: ["top", "right", "bottom", "left"],
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

export const sprinkles = createSprinkles(
  unconditionalAtomicProperties,
  statusAtomicProperties,
  responsiveAtomicProperties
);
export type Sprinkles = Parameters<typeof sprinkles>[0];

export const mapResponsiveValue = createMapValueFn(responsiveAtomicProperties);
export const normalizeResponsiveValue = createNormalizeValueFn(responsiveAtomicProperties);

export type OptionalResponsiveValue<Value extends string | number> = ConditionalValue<
  typeof responsiveAtomicProperties,
  Value
>;

export type RequiredResponsiveValue<Value extends string | number> = RequiredConditionalValue<
  typeof responsiveAtomicProperties,
  Value
>;
