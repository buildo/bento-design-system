import { StoryObj, Meta } from "@storybook/react";
import { Column, Columns, Divider, Placeholder, Stack } from "..";

const meta = {
  component: Divider,
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Vertical = {
  args: {
    orientation: "vertical",
  },
  decorators: [
    (Story) => (
      <Columns space={16} alignY="stretch">
        <Placeholder />
        <Column width="content">
          <Story />
        </Column>
        <Placeholder />
      </Columns>
    ),
  ],
} satisfies Story;

export const Horizontal = {
  args: {
    orientation: "horizontal",
  },
  decorators: [
    (Story) => (
      <Stack space={16}>
        <Placeholder />
        <Story />
        <Placeholder />
      </Stack>
    ),
  ],
} satisfies Story;
