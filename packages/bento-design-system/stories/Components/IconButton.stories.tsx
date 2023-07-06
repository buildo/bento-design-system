import { IconButton } from "../";
import { IconPlaceholder } from "@buildo/bento-design-system";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: IconButton,
  args: {
    label: "Button",
    icon: IconPlaceholder,
    size: 12,
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PrimarySolid = {
  args: {
    kind: "solid",
    hierarchy: "primary",
  },
} satisfies Story;

export const SecondarySolid = {
  args: {
    kind: "solid",
    hierarchy: "secondary",
  },
} satisfies Story;

export const DangerSolid = {
  args: {
    kind: "solid",
    hierarchy: "danger",
  },
} satisfies Story;

export const PrimaryTransparent = {
  args: {
    kind: "transparent",
    hierarchy: "primary",
  },
} satisfies Story;

export const SecondaryTransparent = {
  args: {
    kind: "transparent",
    hierarchy: "secondary",
  },
} satisfies Story;

export const DangerTransparent = {
  args: {
    kind: "transparent",
    hierarchy: "danger",
  },
} satisfies Story;

export const SolidDisabled = {
  args: {
    kind: "solid",
    hierarchy: "primary",
    isDisabled: true,
  },
} satisfies Story;

export const TransparentDisabled = {
  args: {
    kind: "transparent",
    hierarchy: "primary",
    isDisabled: true,
  },
} satisfies Story;

export const PrimaryOutline = {
  args: {
    kind: "outline",
    hierarchy: "primary",
  },
} satisfies Story;

export const SecondaryOutline = {
  args: {
    kind: "outline",
    hierarchy: "secondary",
  },
} satisfies Story;

export const DangerOutline = {
  args: {
    kind: "outline",
    hierarchy: "danger",
  },
} satisfies Story;

export const OutlineDisabled = {
  args: {
    kind: "outline",
    hierarchy: "primary",
    isDisabled: true,
  },
} satisfies Story;
