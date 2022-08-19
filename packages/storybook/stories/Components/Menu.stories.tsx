import { Body, Title } from "@buildo/bento-design-system";
import { action } from "@storybook/addon-actions";
import { Avatar, Box, Button, Menu, Stack } from "..";
import { createComponentStories, formatMessage } from "../util";

const items = [
  {
    label: formatMessage("Item 1"),
    subItems: [
      { label: formatMessage("Sub item 1.1"), onPress: action("Sub item 1.1") },
      { label: formatMessage("Sub item 1.2"), onPress: action("Sub item 1.2") },
    ],
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
    subItems: [
      {
        label: formatMessage("Sub item 4.1"),
        subItems: [
          { label: formatMessage("Sub item 4.1.1"), onPress: action("Sub item 4.1.1") },
          { label: formatMessage("Sub item 4.1.2"), onPress: action("Sub item 4.1.2") },
        ],
      },
      { label: formatMessage("Sub item 4.2"), onPress: action("Sub item 4.2") },
      { label: formatMessage("Sub item 4.3"), onPress: action("Sub item 4.3") },
      { label: formatMessage("Sub item 4.4"), onPress: action("Sub item 4.4") },
      { label: formatMessage("Sub item 4.5"), onPress: action("Sub item 4.5") },
      {
        label: formatMessage("Sub item 4.6"),
        subItems: [
          { label: formatMessage("Sub item 4.6.1"), onPress: action("Sub item 4.6.1") },
          { label: formatMessage("Sub item 4.6.2"), onPress: action("Sub item 4.6.2") },
        ],
      },
      { label: formatMessage("Sub item 4.7"), onPress: action("Sub item 4.7") },
      { label: formatMessage("Sub item 4.8"), onPress: action("Sub item 4.8") },
      { label: formatMessage("Sub item 4.9"), onPress: action("Sub item 4.9") },
    ],
  },
  {
    label: formatMessage("Item 5"),
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
  header: (
    <Stack space={4}>
      <Title size="medium">{formatMessage("Jane Doe")}</Title>
      <Body size="medium">{formatMessage("hello@example.com")}</Body>
      <Body size="small" color="secondary">
        {formatMessage("Admin")}
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
