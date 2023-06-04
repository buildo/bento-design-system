import { Banner } from "../";
import { action } from "@storybook/addon-actions";

const meta = {
  component: Banner,
} satisfies Meta<typeof Banner>;

export default meta;

type Story = StoryObj<typeof meta>;

const title = "Title";
const shortDescription = "Description";
const longDescription = `Extensively long description, this is so big that it
should overfill the screen and break into several lines. It's really a long description, not gonna lie.
Extensively long description, this is so big that it
should overfill the screen and break into several lines. It's really a long description, not gonna lie.
Extensively long description, this is so big that it
should overfill the screen and break into several lines. It's really a long description, not gonna lie.`;

export const Dismissable: Story = {
  args: {
    kind: "informative",
    title,
    description: shortDescription,
  },
};

export const DismissableWithAction: Story = {
  args: {
    kind: "informative",
    title,
    description: shortDescription,
    action: {
      label: "Close",
      onPress: action("onAction"),
    },
  },
};

export const NonDismissable: Story = {
  args: {
    kind: "informative",
    title,
    description: shortDescription,
  },
  parameters: {
    actions: { argTypesRegex: "" },
  },
};

export const Informative: Story = {
  args: {
    kind: "informative",
    title,
    description: shortDescription,
  },
};

export const Positive: Story = {
  args: {
    kind: "positive",
    title,
    description: shortDescription,
  },
};

export const Warning: Story = {
  args: {
    kind: "warning",
    title,
    description: shortDescription,
  },
};

export const Negative: Story = {
  args: {
    kind: "negative",
    title,
    description: shortDescription,
  },
};

export const Secondary: Story = {
  args: {
    kind: "secondary",
    title,
    description: shortDescription,
  },
};

export const NoDescription: Story = {
  args: {
    kind: "informative",
    title,
  },
};

export const NoTitle: Story = {
  args: {
    kind: "informative",
    description: shortDescription,
  },
};

export const ShortDescription: Story = {
  args: {
    kind: "informative",
    title,
    description: shortDescription,
  },
};

export const LongDescription: Story = {
  args: {
    kind: "informative",
    title,
    description: longDescription,
  },
};
