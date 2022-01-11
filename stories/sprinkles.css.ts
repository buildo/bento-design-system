import {
  defineProperties,
  createSprinkles,
  createMapValueFn,
  createNormalizeValueFn,
  ConditionalValue,
  RequiredConditionalValue,
} from "@vanilla-extract/sprinkles";
import { breakpoints } from "../src/util/breakpoints";
import {
  defineUnconditionalProperties,
  defineStatusProperties,
  defineResponsiveProperties,
} from "../src/sprinkles.css";
import { myVars } from "./theme.css";

const unconditionalProperties = defineUnconditionalProperties(myVars.fontFamily);
const statusProperties = defineStatusProperties(myVars.color);
const responsiveProperties = defineResponsiveProperties(myVars.space);
export const sprinkles = createSprinkles(
  unconditionalProperties,
  statusProperties,
  responsiveProperties
);
export type Sprinkles = Parameters<typeof sprinkles>[0];

export const mapResponsiveValue = createMapValueFn(responsiveProperties);
export const normalizeResponsiveValue = createNormalizeValueFn(responsiveProperties);

export type OptionalResponsiveValue<Value extends string | number> = ConditionalValue<
  typeof responsiveProperties,
  Value
>;

export type RequiredResponsiveValue<Value extends string | number> = RequiredConditionalValue<
  typeof responsiveProperties,
  Value
>;
