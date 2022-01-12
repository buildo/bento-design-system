import {
  defineProperties,
  createSprinkles,
  createMapValueFn,
  createNormalizeValueFn,
  ConditionalValue,
  RequiredConditionalValue,
} from "@vanilla-extract/sprinkles";
import { breakpoints } from "../src/util/breakpoints";
import { unconditionalProperties, statusProperties, responsiveProperties } from "../src/util/atoms";
import { statusConditions } from "../src/util/conditions";
import { myVars } from "./theme.css";
import { vars as bentoVars } from "../src/vars.css";

const fontFamilies = {
  ...bentoVars.fontFamily,
  ...myVars.fontFamily,
};

const unconditionalAtomicProperties = defineProperties({
  properties: { ...unconditionalProperties, fontFamily: fontFamilies },
});

const spaces = {
  ...bentoVars.space,
  ...myVars.space,
};

const responsiveAtomicProperties = defineProperties({
  conditions: breakpoints,
  defaultCondition: "desktop",
  properties: {
    ...responsiveProperties,
    paddingTop: spaces,
    paddingBottom: spaces,
    paddingLeft: spaces,
    paddingRight: spaces,
    gap: spaces,
  },
  shorthands: {
    padding: ["paddingTop", "paddingBottom", "paddingLeft", "paddingRight"],
    paddingX: ["paddingLeft", "paddingRight"],
    paddingY: ["paddingTop", "paddingBottom"],
  },
});

const colors = {
  ...bentoVars.color,
  ...myVars.color,
};

const statusAtomicProperties = defineProperties({
  conditions: statusConditions,
  defaultCondition: "default",
  properties: { ...statusProperties, color: colors, background: colors },
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
