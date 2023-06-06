import { FunctionComponent } from "react";
import { Box, Inset, Placeholder } from "..";
import { createComponentStories, spaceArgType } from "../util";

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

export const allAxis = {
  args: {
    space: 16,
  },
} satisfies Story;

export const horizontal = {
  args: {
    spaceX: 16,
  },
} satisfies Story;

export const vertical = {
  args: {
    spaceY: 16,
  },
} satisfies Story;

export const horizontalAndVertical = {
  args: {
    spaceX: 40,
    spaceY: 16,
  },
} satisfies Story;
