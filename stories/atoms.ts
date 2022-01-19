import * as bentoAtoms from "../src/util/atoms";
import { vars as bentoVars } from "../src/vars.css";
import { vars } from "./theme.css";

const space = {
  ...bentoVars.space,
  ...vars.space,
};

const color = {
  ...bentoVars.color,
  ...bentoVars.semanticColor,
  ...vars.color,
};

export const unconditionalProperties = {
  ...bentoAtoms.unconditionalProperties,
  fontFamily: {
    ...bentoAtoms.unconditionalProperties.fontFamily,
    ...vars.fontFamily,
  },
};

export const responsiveProperties = {
  ...bentoAtoms.responsiveProperties,
  paddingTop: space,
  paddingBottom: space,
  paddingLeft: space,
  paddingRight: space,
  gap: space,
};

export const statusProperties = {
  ...bentoAtoms.statusProperties,
  color,
  fill: color,
  stroke: color,
};
