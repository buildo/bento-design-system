import { Card, Disclosure, Placeholder } from "../";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Disclosure,
  args: {
    title: "Title",
    children: <Placeholder />,
  },
  parameters: {
    actions: {
      argTypesRegex: "",
    },
  },
} satisfies Meta<typeof Disclosure>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Level1 = {} satisfies Story;

export const Level2 = {
  args: {
    level: 2,
  },
} satisfies Story;

export const LeadingIcon = {
  args: {
    iconPosition: "leading",
  },
} satisfies Story;

export const InCard = {
  args: { level: 2 },
  decorators: [
    (Story) => (
      <Card paddingX={40} paddingY={24} elevation="small">
        <Story />
      </Card>
    ),
  ],
} satisfies Story;
