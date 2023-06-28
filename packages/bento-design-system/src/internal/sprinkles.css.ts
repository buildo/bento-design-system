import {
  ConditionalValue,
  createMapValueFn,
  createNormalizeValueFn,
  RequiredConditionalValue,
  defineProperties,
  createSprinkles,
} from "@vanilla-extract/sprinkles";
import {
  responsiveProperties,
  statusProperties,
  unconditionalProperties,
  responsivePropertiesShorthands,
  unconditionalPropertiesShorthands,
  statusPropertiesConditions,
  responsivePropertiesConditions,
  responsivePropertiesDefaultCondition,
  statusPropertiesDefaultCondition,
} from "../util/atoms";

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

export const bentoSprinkles = createSprinkles(unconditionalStyles, responsiveStyles, statusStyles);

export type Sprinkles = Parameters<typeof bentoSprinkles>[0];

export const mapResponsiveValue = createMapValueFn(responsiveStyles);
export const normalizeResponsiveValue = createNormalizeValueFn(responsiveStyles);
export const normalizeStatusValue = createNormalizeValueFn(statusStyles);

export type OptionalResponsiveValue<Value extends string | number> = ConditionalValue<
  typeof responsiveStyles,
  Value
>;

export type RequiredResponsiveValue<Value extends string | number> = RequiredConditionalValue<
  typeof responsiveStyles,
  Value
>;
