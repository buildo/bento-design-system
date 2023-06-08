import { Bleed, Box, Inset, Placeholder } from "..";
import { Meta, StoryObj } from "@storybook/react";
import { spaceArgType } from "../util";

const meta = {
  component: Bleed,
  args: {
    children: <Placeholder height={100} width={100} />,
  },
  argTypes: {
    space: spaceArgType,
    spaceX: spaceArgType,
    spaceY: spaceArgType,
  },
  decorators: [
    (Story) => (
      <Box background="softViolet" style={{ width: "fit-content" }}>
        <Inset space={24}>
          <Story />
        </Inset>
      </Box>
    ),
  ],
} satisfies Meta<typeof Bleed>;

export default meta;

type Story = StoryObj<typeof meta>;

export const allAxis = {
  args: {
    space: 40,
  },
} satisfies Story;

export const horizontal = {
  args: {
    spaceX: 40,
  },
} satisfies Story;

export const vertical = {
  args: {
    spaceY: 40,
  },
} satisfies Story;

export const horizontalAndVertical = {
  args: {
    spaceX: 40,
    spaceY: 16,
  },
} satisfies Story;
