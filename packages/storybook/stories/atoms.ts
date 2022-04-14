import {
  responsiveProperties as bentoResponsiveProperties,
  statusProperties as bentoStatusProperties,
  unconditionalProperties as bentoUnconditionalProperties,
} from "@buildo/bento-design-system";
import { customVars } from "./theme.css";

const space = {
  ...bentoResponsiveProperties.gap,
  ...customVars.space,
};

const color = {
  ...bentoStatusProperties.color,
  ...customVars.color,
};

const background = {
  ...bentoStatusProperties.background,
  ...customVars.color,
};

const fill = {
  ...bentoStatusProperties.fill,
  ...customVars.color,
};

export const unconditionalProperties = {
  ...bentoUnconditionalProperties,
  fontFamily: {
    ...bentoUnconditionalProperties.fontFamily,
    ...customVars.fontFamily,
  },
};

export const responsiveProperties = {
  ...bentoResponsiveProperties,
  paddingTop: space,
  paddingBottom: space,
  paddingLeft: space,
  paddingRight: space,
  gap: space,
};

export const statusProperties = {
  ...bentoStatusProperties,
  background,
  color,
  fill,
  stroke: color,
};
