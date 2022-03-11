import { action } from "@storybook/addon-actions";
import { Avatar, Box, Button, Dropdown } from "../";
import { createComponentStories, formatMessage } from "../util";

const { defaultExport, createStory } = createComponentStories({
  component: Dropdown,
  args: {
    size: "medium",
    initialIsOpen: true,
    items: [
      {
        label: formatMessage("Item 1"),
        onPress: action("Item 1"),
      },
      {
        label: formatMessage("Item 2 (link)"),
        href: "https://www.google.com",
      },
      {
        label: formatMessage("Item 3"),
        onPress: action("Item 3"),
        disabled: true,
      },
      {
        label: formatMessage("Item 4"),
        onPress: action("Item 4"),
      },
    ],
  },
});

export default defaultExport;

export const ButtonTrigger = createStory({
  trigger: (ref, triggerProps, { toggle }) => (
    <Box ref={ref} display="inline-block" {...triggerProps}>
      <Button
        kind="solid"
        hierarchy="primary"
        label={formatMessage("Open menu")}
        onPress={() => toggle()}
      />
    </Box>
  ),
});

export const AvatarTrigger = createStory({
  trigger: (ref, triggerProps, { toggle }) => (
    <Box
      ref={ref}
      display="inline-block"
      onClick={() => toggle()}
      cursor="pointer"
      {...triggerProps}
    >
      <Avatar color="violet" />
    </Box>
  ),
});

export const Large = createStory({
  size: "large",
  trigger: (ref, triggerProps, { toggle }) => (
    <Box
      ref={ref}
      display="inline-block"
      onClick={() => toggle()}
      cursor="pointer"
      {...triggerProps}
    >
      <Avatar color="violet" />
    </Box>
  ),
});
