import { Placeholder } from "@buildo/bento-design-system";
import { DecorativeDivider, Stack } from "../";
import { StoryObj, Meta } from "@storybook/react";

const meta = {
  component: DecorativeDivider,
  decorators: [
    (Story) => (
      <Stack space={16}>
        <Placeholder />
        <Story />
        <Placeholder />
      </Stack>
    ),
  ],
} satisfies Meta<typeof DecorativeDivider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
