import { Body, Title } from "@buildo/bento-design-system";
import { action } from "@storybook/addon-actions";
import { ComponentProps } from "react";
import { Avatar, Box, Button, Menu, Stack } from "..";
import { createComponentStories } from "../util";

const items: ComponentProps<typeof Menu>["items"] = [
  {
    label: "Item 1",
    items: [
      { label: "Sub item 1.1", onPress: action("Sub item 1.1") },
      { label: "Sub item 1.2", onPress: action("Sub item 1.2") },
    ],
  },
  {
    label: "Item 2 (link)",
    href: "https://www.google.com",
  },
  {
    label: "Item 3",
    onPress: action("Item 3"),
    disabled: true,
  },
  {
    label: "Item 4",
    items: [
      {
        label: "Sub item 4.1",
        items: [
          { label: "Sub item 4.1.1", onPress: action("Sub item 4.1.1") },
          { label: "Sub item 4.1.2", onPress: action("Sub item 4.1.2") },
        ],
      },
      { label: "Sub item 4.2", onPress: action("Sub item 4.2") },
      { label: "Sub item 4.3", onPress: action("Sub item 4.3") },
      { label: "Sub item 4.4", onPress: action("Sub item 4.4") },
      { label: "Sub item 4.5", onPress: action("Sub item 4.5") },
      {
        label: "Sub item 4.6",
        items: [
          { label: "Sub item 4.6.1", onPress: action("Sub item 4.6.1") },
          { label: "Sub item 4.6.2", onPress: action("Sub item 4.6.2") },
        ],
      },
      { label: "Sub item 4.7", onPress: action("Sub item 4.7") },
      { label: "Sub item 4.8", onPress: action("Sub item 4.8") },
      { label: "Sub item 4.9", onPress: action("Sub item 4.9") },
    ],
  },
  {
    label: "Item 5",
    onPress: action("Item 5"),
  },
];

const { defaultExport, createStory } = createComponentStories({
  component: Menu,
  args: {
    size: "medium",
    initialIsOpen: true,
    items,
  },
});

export default defaultExport;

export const ButtonTrigger = createStory({
  trigger: (ref, triggerProps, { toggle }) => (
    <Box ref={ref} display="inline-block" {...triggerProps}>
      <Button kind="solid" hierarchy="primary" label="Open menu" onPress={() => toggle()} />
    </Box>
  ),
});

export const AvatarTrigger = createStory({
  header: (
    <Stack space={4}>
      <Title size="medium">Jane Doe</Title>
      <Body size="medium">hello@example.com</Body>
      <Body size="small" color="secondary">
        Admin
      </Body>
    </Stack>
  ),
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
  offset: 20,
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

export const WithDividers = createStory({
  dividers: true,
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
