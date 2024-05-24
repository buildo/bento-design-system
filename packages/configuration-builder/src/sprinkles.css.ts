import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import {
  unconditionalProperties,
  unconditionalPropertiesShorthands,
  responsiveProperties,
  responsivePropertiesConditions,
  responsivePropertiesDefaultCondition,
  responsivePropertiesShorthands,
  statusProperties as bentoStatusProperties,
  statusPropertiesConditions,
  statusPropertiesDefaultCondition,
} from "@buildo/bento-design-system";

const backgrounds = {
  ...bentoStatusProperties.background,
  "linear-gradient-1": "linear-gradient(285deg, #E0D5F5 0%, #EFE9FA 100%)",
  "linear-gradient-2": "linear-gradient(285deg, #DCE0FB 0%, #EDEFFD 100%)",
  "linear-gradient-3": "linear-gradient(285deg, #CCE6FB 0%, #E4F2FD 100%)",
};

const statusProperties = {
  ...bentoStatusProperties,
  background: backgrounds,
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
