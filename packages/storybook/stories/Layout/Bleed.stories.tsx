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

export const AllAxis = {
  args: {
    space: 40,
  },
} satisfies Story;

export const Horizontal = {
  args: {
    spaceX: 40,
  },
} satisfies Story;

export const Vertical = {
  args: {
    spaceY: 40,
  },
} satisfies Story;

export const HorizontalAndVertical = {
  args: {
    spaceX: 40,
    spaceY: 16,
  },
} satisfies Story;
