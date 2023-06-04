import { SpaceBetweenActions } from "../..";
import { createComponentStories } from "../../util";
import { asyncPrimaryAction, secondaryAction } from "./Actions.stories";

const meta = {
  component: SpaceBetweenActions,
  args: {
    size: "medium",
  },
} satisfies Meta<typeof SpaceBetweenActions>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FillError: Story = {
  args: {
    primaryAction: asyncPrimaryAction,
    secondaryAction,
    errorBannerWidth: "fill",
    error: "Something went wrong",
  },
};

export const ContentWidthError: Story = {
  args: {
    primaryAction: asyncPrimaryAction,
    secondaryAction,
    error: "Something went wrong",
  },
};
