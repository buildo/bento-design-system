import {
  unconditionalProperties as bentoUnconditionalProperties,
  statusProperties as bentoStatusProperties,
  responsiveProperties as bentoResponsiveProperties,
} from "../lib";
import { vars } from "./theme.css";

const space = {
  ...bentoResponsiveProperties.gap,
  ...vars.space,
};

const color = {
  ...bentoStatusProperties.color,
  ...vars.color,
};

export const unconditionalProperties = {
  ...bentoUnconditionalProperties,
  fontFamily: {
    ...bentoUnconditionalProperties.fontFamily,
    ...vars.fontFamily,
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
  color,
  fill: color,
  stroke: color,
};
