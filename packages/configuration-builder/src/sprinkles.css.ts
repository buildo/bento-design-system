import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import {
  unconditionalProperties,
  unconditionalPropertiesShorthands,
  responsiveProperties as bentoResponsiveProperties,
  responsivePropertiesConditions,
  responsivePropertiesDefaultCondition,
  responsivePropertiesShorthands,
  statusProperties,
  statusPropertiesConditions,
  statusPropertiesDefaultCondition,
} from "@buildo/bento-design-system";

const spaces = { ...bentoResponsiveProperties.gap, 120: "120px" };

const responsiveProperties = {
  ...bentoResponsiveProperties,
  paddingTop: spaces,
  paddingBottom: spaces,
  paddingLeft: spaces,
  paddingRight: spaces,
  gap: spaces,
};

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
