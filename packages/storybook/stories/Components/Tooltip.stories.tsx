import { Box, IconWarningSolid, Tooltip, TooltipProps } from "..";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Tooltip,
  args: {
    content: "Tooltip content",
  },
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

const trigger: TooltipProps["trigger"] = (ref, props) => (
  <Box ref={ref} {...props} display="inline-block">
    <IconWarningSolid size={16} />
  </Box>
);

export const Basic = {
  args: {
    trigger,
  },
} satisfies Story;

export const ForcedPlacement = {
  args: {
    trigger,
    placement: "bottom",
  },
} satisfies Story;
