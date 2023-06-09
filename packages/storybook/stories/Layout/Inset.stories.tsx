import { FunctionComponent } from "react";
import { Box, Inset, Placeholder } from "..";
import { spaceArgType } from "../util";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Inset,
  args: {
    children: <Placeholder height={100} width={100} />,
  },
  argTypes: {
    space: spaceArgType,
    spaceX: spaceArgType,
    spaceY: spaceArgType,
  },
  decorators: [
    (Story: FunctionComponent) => (
      <Box background="backgroundDarkScrim" style={{ width: "fit-content" }}>
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof Inset>;

export default meta;

type Story = StoryObj<typeof meta>;

export const AllAxis = {
  args: {
    space: 16,
  },
} satisfies Story;

export const Horizontal = {
  args: {
    spaceX: 16,
  },
} satisfies Story;

export const Vertical = {
  args: {
    spaceY: 16,
  },
} satisfies Story;

export const HorizontalAndVertical = {
  args: {
    spaceX: 40,
    spaceY: 16,
  },
} satisfies Story;
