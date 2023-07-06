import { alignToFlexAlignLookup, alignYToFlexAlignLookup, vars } from "@buildo/bento-design-system";

export const textArgType: any = { control: { type: "text" } };
export const disableControlArgType: any = { control: { disable: true } };
export const spaceArgType: any = {
  options: Object.keys(vars.space),
  control: {
    type: "select",
    mapping: vars.space,
  },
};
export const alignArgType: any = {
  options: Object.keys(alignToFlexAlignLookup),
  control: {
    type: "select",
    mapping: alignToFlexAlignLookup,
  },
};

export const alignYArgType: any = {
  options: Object.keys(alignYToFlexAlignLookup),
  control: {
    type: "select",
    mapping: alignYToFlexAlignLookup,
  },
};

export const issuesArgType: any = { control: { type: "array" } };

export const fieldArgTypes = {
  label: textArgType,
  assistiveText: textArgType,
  issues: issuesArgType,
  hint: textArgType,
};
