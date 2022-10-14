import { Button, IconCheck } from "../";

const meta = {
  component: Button,
  args: {
    label: "Button",
  },
}; // satisfies Meta<ButtonProps>;

export default meta;

// type Story = StoryObj<typeof meta>;

export const PrimarySolid = {
  args: {
    kind: "solid",
    hierarchy: "primary",
  },
}; // satisfies Story;

export const SecondarySolid = {
  args: {
    kind: "solid",
    hierarchy: "secondary",
  },
}; // satisfies Story;

export const DangerSolid = {
  args: {
    kind: "solid",
    hierarchy: "danger",
  },
}; // satisfies Story;

// export const PrimaryTransparent = createStory({
//   kind: "transparent",
//   hierarchy: "primary",
// });

// export const SecondaryTransparent = createStory({
//   kind: "transparent",
//   hierarchy: "secondary",
// });

// export const DangerTransparent = createStory({
//   kind: "transparent",
//   hierarchy: "danger",
// });

// export const PrimaryOutline = createStory({
//   kind: "outline",
//   hierarchy: "primary",
// });

// export const SecondaryOutline = createStory({
//   kind: "outline",
//   hierarchy: "secondary",
// });

// export const DangerOutline = createStory({
//   kind: "outline",
//   hierarchy: "danger",
// });

// export const SolidDisabled = createStory({
//   kind: "solid",
//   hierarchy: "primary",
//   isDisabled: true,
// });

// export const TransparentDisabled = createStory({
//   kind: "transparent",
//   hierarchy: "primary",
//   isDisabled: true,
// });

// export const OutlineDisabled = createStory({
//   kind: "outline",
//   hierarchy: "primary",
//   isDisabled: true,
// });

// export const PrimarySmall = createStory({
//   kind: "solid",
//   hierarchy: "primary",
//   size: "small",
// });

// export const PrimaryLarge = createStory({
//   kind: "solid",
//   hierarchy: "primary",
//   size: "large",
// });

// export const WithIcon = createStory({
//   kind: "solid",
//   hierarchy: "primary",
//   icon: IconCheck,
// });
