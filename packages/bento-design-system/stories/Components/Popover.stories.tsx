import { Meta, StoryObj } from "@storybook/react";
import { useRef, useState } from "react";
import { Box, Button, Placeholder, Popover } from "..";
import { BentoThemeProvider } from "@buildo/bento-design-system";

const meta = {
  component: Popover,
  args: {
    triggerRef: { current: null },
  },
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

// eslint-disable-next-line storybook/prefer-pascal-case
export const popover = {
  args: {
    children: <Placeholder width={300} />,
  },
  decorators: [
    (Story, ctx) => {
      const [isOpen, setIsOpen] = useState(false);
      const triggerRef = useRef(null);
      return (
        <BentoThemeProvider theme={{ outlineColor: { outlineDecorative: "red" } }}>
          <Box ref={triggerRef} display="inline-block">
            <Button
              kind="solid"
              hierarchy="primary"
              label={`${isOpen ? "Close" : "Open"} popover`}
              onPress={() => setIsOpen(!isOpen)}
            />
            {isOpen && (
              <Story args={{ ...ctx.args, triggerRef, onClose: () => setIsOpen(false) }} />
            )}
          </Box>
        </BentoThemeProvider>
      );
    },
  ],
} satisfies Story;
