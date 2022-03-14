import { Story } from "@storybook/react";
import { ComponentProps, useRef, useState } from "react";
import { Box, Button, Placeholder, Popover } from "../";
import { createComponentStories, formatMessage } from "../util";

const { defaultExport } = createComponentStories({
  component: Popover,
  args: {},
});

export default defaultExport;

const Template = ({ isOpen, ...props }: ComponentProps<typeof Popover> & { isOpen: boolean }) => {
  return (
    isOpen && (
      <Popover {...props}>
        <Placeholder width={300} />
      </Popover>
    )
  );
};

export const popover: Story = Template.bind({});

popover.decorators = [
  (story: Story) => {
    const [isOpen, setIsOpen] = useState(true);
    const triggerRef = useRef(null);

    return (
      <Box ref={triggerRef} display="inline-block">
        <Button
          kind="solid"
          hierarchy="primary"
          label={formatMessage(`${isOpen ? "Close" : "Open"} popover`)}
          onPress={() => setIsOpen(!isOpen)}
        />
        {story({
          args: { isOpen, onClose: () => setIsOpen(false), triggerRef },
        })}
      </Box>
    );
  },
];
