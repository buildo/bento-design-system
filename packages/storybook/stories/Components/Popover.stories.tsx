import { Meta, StoryObj } from "@storybook/react";
import { ComponentProps, useRef, useState } from "react";
import { Box, Button, Placeholder, Popover } from "..";

const meta = {
  component: Popover,
} satisfies Meta<typeof Popover>;

export default meta;

type Story = ComponentProps<typeof Popover>;

export const popover = {
  args: {
    children: <Placeholder width={300} />,
  },
  decorators: [
    (Story, ctx) => {
      const [isOpen, setIsOpen] = useState(false);
      const triggerRef = useRef(null);
      return (
        <Box ref={triggerRef} display="inline-block">
          <Button
            kind="solid"
            hierarchy="primary"
            label={`${isOpen ? "Close" : "Open"} popover`}
            onPress={() => setIsOpen(!isOpen)}
          />
          {isOpen && <Story args={{ ...ctx.args, triggerRef, onClose: () => setIsOpen(false) }} />}
        </Box>
      );
    },
  ],
} satisfies Story;
