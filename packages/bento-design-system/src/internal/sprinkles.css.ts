import {
  ConditionalValue,
  createMapValueFn,
  createNormalizeValueFn,
  RequiredConditionalValue,
} from "@vanilla-extract/sprinkles";
import { createDefineBentoSprinklesFn } from "../sprinkles";

const defineBentoSprinkles = createDefineBentoSprinklesFn();
export const { sprinkles: bentoSprinkles, responsiveStyles, statusStyles } = defineBentoSprinkles();

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

export const mapStatusValue = createMapValueFn(statusStyles);
export const normalizeStatusValue = createNormalizeValueFn(statusStyles);
export type OptionalStatusValue<Value extends string | number> = ConditionalValue<
  typeof statusStyles,
  Value
>;
export type RequiredStatusValue<Value extends string | number> = RequiredConditionalValue<
  typeof statusStyles,
  Value
>;
