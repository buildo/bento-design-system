import { Meta, StoryObj } from "@storybook/react";
import { Box, Inline, Stack, Body, IconProps, icons } from "..";

const meta = {
  title: "Icons",
  args: {
    size: 24,
  },
  argTypes: {
    size: {
      options: [8, 12, 16, 24, 40],
      control: { type: "select" },
    },
    color: {
      options: [
        "default",
        "primary",
        "secondary",
        "primaryInverse",
        "secondaryInverse",
        "brandPrimary",
        "brandSecondary",
        "brandTertiary",
        "informative",
        "positive",
        "warning",
        "negative",
        "disabled",
        "inherit",
        "interactive",
        "currentColor",
      ],
      control: { type: "select" },
    },
  },
} satisfies Meta<IconProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Icons = {
  render: (args: IconProps) => (
    <Stack space={32}>
      <Inline space={32}>
        {Object.entries(icons).map(([name, Icon]) => (
          <Box padding={16} alignItems="center" justifyContent="center" style={{ width: 100 }}>
            <Stack space={8} align="center">
              <Box display="flex" alignItems="center" style={{ height: 24 }}>
                <Icon size={args.size} color={args.color} />
              </Box>
              <Body size="small">{name.replace(/^Icon/g, "")}</Body>
            </Stack>
          </Box>
        ))}
      </Inline>
    </Stack>
  ),
} satisfies Story;
