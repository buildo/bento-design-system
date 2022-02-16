import * as bentoAtoms from "../src/util/atoms";
import { vars } from "./theme.css";

const space = {
  ...bentoAtoms.responsiveProperties.gap,
  ...vars.space,
};

const color = {
  ...bentoAtoms.statusProperties.color,
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
  fill: { ...color, ...bentoAtoms.statusProperties.background },
  stroke: color,
};
