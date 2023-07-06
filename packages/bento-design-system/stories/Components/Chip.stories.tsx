import { Chip, IconPlaceholder } from "..";
import { StoryObj, Meta } from "@storybook/react";

const meta = {
  component: Chip,
  args: {
    label: "Label",
  },
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NonDismissable = {
  args: {
    color: "blue",
  },
  parameters: { actions: { argTypesRegex: "" } },
} satisfies Story;

export const Dismissable = {
  args: {
    color: "blue",
  },
} satisfies Story;

export const CustomColor = {
  args: {
    color: "custom",
  },
} satisfies Story;

export const WithIcon = {
  args: {
    color: "blue",
    icon: IconPlaceholder,
  },
} satisfies Story;

export const MaxWidth = {
  args: {
    label: "Very very long label",
    color: "blue",
    maxCharacters: 10,
  },
} satisfies Story;

export const Uppercase = {
  args: {
    color: "blue",
    uppercase: true,
  },
} satisfies Story;
