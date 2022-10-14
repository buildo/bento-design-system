import { Placeholder, Stack } from "..";
import { alignArgType, disableControlArgType, spaceArgType } from "../util";

export default {
  component: Stack,
  args: {
    space: 32,
    children: [
      <Placeholder height={100} width={100} />,
      <Placeholder height={100} width={100} />,
      <Placeholder height={100} width={100} />,
    ],
  },
  argTypes: {
    space: spaceArgType,
    children: disableControlArgType,
    align: alignArgType,
  },
};

export const basic = {};

export const alignLeft = {
  args: { align: "left" },
};

export const alignCenter = {
  args: { align: "center" },
};

export const alignRight = {
  args: { align: "right" },
};

export const responsiveAlign = {
  args: {
    align: {
      mobile: "center",
      desktop: "left",
    },
  },
};

export const dividers = {
  args: { dividers: true },
};
