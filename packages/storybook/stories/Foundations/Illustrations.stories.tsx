import { Meta } from "@storybook/react";
import { Box, Inline, Stack, Body, IllustrationProps, illustrations } from "..";

export default {
  title: "Illustrations",
  args: {
    size: 24,
    kind: "color",
  },
  argTypes: {
    size: {
      options: [24, 32, 40, 80, 160],
      control: { type: "select" },
    },
    kind: {
      options: ["color", "outline"],
      control: { type: "select" },
    },
    color: {
      options: ["default", "disabled"],
      control: { type: "select" },
    },
  },
};

export const Illustrations = (args: IllustrationProps) => {
  const illustrationProps: IllustrationProps =
    args.kind === "outline"
      ? {
          size: args.size,
          kind: "outline",
          color: args.color,
        }
      : {
          size: args.size,
          kind: "color",
        };

  return (
    <Stack space={32}>
      <Inline space={32}>
        {Object.entries(illustrations).map(([name, Illustration]) => (
          <Box padding={16} alignItems="center" justifyContent="center" style={{ width: 150 }}>
            <Stack space={8} align="center">
              <Box display="flex" alignItems="center" style={{ height: 24 }}>
                <Illustration {...illustrationProps} />
              </Box>
              <Body size="small">{name.replace(/^Icon/g, "")}</Body>
            </Stack>
          </Box>
        ))}
      </Inline>
    </Stack>
  );
};
