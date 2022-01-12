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
  buildUnconditionalPropertyOptions,
  buildResponsivePropertyOptions,
  buildStatusPropertyOptions,
} from "../src/util/atoms";
import { statusConditions } from "../src/util/conditions";
import { myVars } from "./theme.css";

const unconditionalProperties = defineProperties(
  buildUnconditionalPropertyOptions(myVars.fontFamily)
);
const responsiveProperties = defineProperties({
  ...buildResponsivePropertyOptions(myVars.space),
  shorthands: {
    padding: ["paddingTop", "paddingBottom", "paddingLeft", "paddingRight"],
    paddingX: ["paddingLeft", "paddingRight"],
    paddingY: ["paddingTop", "paddingBottom"],
  },
});
const statusProperties = defineProperties(buildStatusPropertyOptions(myVars.color));

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
