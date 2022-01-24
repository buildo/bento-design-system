import { Meta } from "@storybook/react";
import { Box, Inline, Stack } from "../../src/internal";
import { Body } from "../../src";
import * as icons from "../../src/Icons";
import { IconProps } from "../../src/Icons/IconProps";
import { vars } from "../../src/vars.css";
import { formatMessage } from "../util";

const meta = {
  args: {
    size: "24",
  },
  argTypes: {
    size: {
      options: ["8", "16", "24"],
      control: { type: "select" },
    },
    color: {
      options: ["default", "informative", "positive", "warning", "negative", "disabled"],
      control: { type: "select" },
    },
  },
} as Meta<IconProps>;

export default meta;

export const Icons = (args: IconProps) => {
  return (
    <Stack space="32">
      <Inline space="32">
        {Object.entries(icons).map(([name, Icon]) => (
          <Box padding="16" alignItems="center" justifyContent="center" style={{ width: 100 }}>
            <Stack space="8" align="center">
              <Box display="flex" alignItems="center" style={{ height: vars.space[args.size] }}>
                <Icon size={args.size} color={args.color} />
              </Box>
              <Body size="small">{formatMessage(name.replace(/^Icon/g, ""))}</Body>
            </Stack>
          </Box>
        ))}
      </Inline>
    </Stack>
  );
};
