import { CheckboxGroupField } from "../";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: CheckboxGroupField,
  args: {
    value: [],
    label: "What are your favourite colors?",
    orientation: "vertical",
    assistiveText: "You can select multiple options",
    options: [
      {
        value: "blue",
        label: "Blue",
      },
      {
        value: "green",
        label: "Green",
      },
      {
        value: "pink",
        label: "Pink",
        isDisabled: true,
      },
      {
        value: "red",
        label: "Red",
      },
    ],
  },
} satisfies Meta<typeof CheckboxGroupField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Vertical = {} satisfies Story;

export const Horizontal = {
  args: {
    orientation: "horizontal",
  },
} satisfies Story;

export const Error = {
  args: { issues: ["Select at least 1 option"] },
} satisfies Story;
