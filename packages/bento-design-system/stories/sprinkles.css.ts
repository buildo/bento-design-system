import {
  createMapValueFn,
  createNormalizeValueFn,
  ConditionalValue,
  RequiredConditionalValue,
  defineProperties,
  createSprinkles,
} from "@vanilla-extract/sprinkles";
import { unconditionalProperties, statusProperties, responsiveProperties } from "./atoms";
import {
  responsivePropertiesConditions,
  responsivePropertiesDefaultCondition,
  responsivePropertiesShorthands,
  statusPropertiesConditions,
  statusPropertiesDefaultCondition,
  unconditionalPropertiesShorthands,
} from "../src";

const unconditionalStyles = defineProperties({
  properties: unconditionalProperties,
  shorthands: unconditionalPropertiesShorthands,
});

const responsiveStyles = defineProperties({
  conditions: responsivePropertiesConditions,
  defaultCondition: responsivePropertiesDefaultCondition,
  properties: responsiveProperties,
  shorthands: responsivePropertiesShorthands,
});

const statusStyles = defineProperties({
  conditions: statusPropertiesConditions,
  defaultCondition: statusPropertiesDefaultCondition,
  properties: statusProperties,
});

export const sprinkles = createSprinkles(unconditionalStyles, responsiveStyles, statusStyles);

export type Sprinkles = Parameters<typeof sprinkles>[0];

export const mapResponsiveValue = createMapValueFn(responsiveStyles);
export const normalizeResponsiveValue = createNormalizeValueFn(responsiveStyles);

export type OptionalResponsiveValue<Value extends string | number> = ConditionalValue<
  typeof responsiveStyles,
  Value
>;

export type RequiredResponsiveValue<Value extends string | number> = RequiredConditionalValue<
  typeof responsiveStyles,
  Value
>;
