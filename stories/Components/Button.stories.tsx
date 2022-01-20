import { createComponentStories, formatMessage, textArgType } from "../util";
import { Button } from "../";

const { defaultExport, createStory } = createComponentStories({
  component: Button,
  args: {
    label: formatMessage("Button"),
  },
  argTypes: {
    label: textArgType,
  },
});

export default defaultExport;

export const Primary = createStory({
  kind: "primary",
});

// export const Secondary = createStory({
//   kind: "secondary",
// });

export const Danger = createStory({
  kind: "danger",
});

export const GhostPrimary = createStory({
  kind: "ghostPrimary",
});

// export const GhostSecondary = createStory({
//   kind: "ghostSecondary",
// });

export const GhostDanger = createStory({
  kind: "ghostDanger",
});

export const PrimaryDisabled = createStory({
  kind: "primary",
  isDisabled: true,
});

export const PrimarySmall = createStory({
  kind: "primary",
  size: "small",
});
