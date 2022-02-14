import {
  ConditionalValue,
  createMapValueFn,
  createNormalizeValueFn,
  createSprinkles,
  defineProperties,
  RequiredConditionalValue,
} from "@vanilla-extract/sprinkles";
import { unconditionalProperties, responsiveProperties, statusProperties } from "../util/atoms";
import { breakpoints } from "../util/breakpoints";
import { statusConditions } from "../util/conditions";

const unconditionalAtomicProperties = defineProperties({
  properties: unconditionalProperties,
  shorthands: {
    inset: ["top", "right", "bottom", "left"],
  },
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

export const bentoSprinkles = createSprinkles(
  unconditionalAtomicProperties,
  statusAtomicProperties,
  responsiveAtomicProperties
);

export type BentoSprinkles = Parameters<typeof bentoSprinkles>[0];

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
