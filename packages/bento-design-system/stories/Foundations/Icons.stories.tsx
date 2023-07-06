import { Meta, StoryObj } from "@storybook/react";
import { Box, Inline, Stack, Body, IconProps, icons, svgIconProps } from "..";
import { Horse, Icon as PhosphorIcon } from "@phosphor-icons/react";

const meta = {
  title: "Foundations/Icons",
  args: {
    size: 24,
    color: "default",
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
} as Meta<IconProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Icons = {
  render: (args) => (
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

function phosphorToBento(Icon: PhosphorIcon) {
  return (props: IconProps) => {
    const { viewBox, ...svgProps } = svgIconProps(props);
    return <Icon width={undefined} height={undefined} {...svgProps} />;
  };
}

const IconHorse = phosphorToBento(Horse);

export const PhosphorIcons = {
  args: {
    color: "brandPrimary",
    size: 40,
  },
  render: (args) => {
    return <IconHorse {...args} />;
  },
} satisfies Story;
