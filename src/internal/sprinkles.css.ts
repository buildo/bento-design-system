import {
  ConditionalValue,
  createMapValueFn,
  createNormalizeValueFn,
  RequiredConditionalValue,
} from "@vanilla-extract/sprinkles";
import { defineBentoSprinkles } from "../sprinkles";
import { unconditionalProperties, responsiveProperties, statusProperties } from "../util/atoms";

export const [bentoSprinkles, _, responsiveStyles] = defineBentoSprinkles(
  unconditionalProperties,
  responsiveProperties,
  statusProperties
);

export type BentoSprinkles = Parameters<typeof bentoSprinkles>[0];

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
