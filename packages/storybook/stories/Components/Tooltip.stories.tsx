import { Box, IconWarning, Tooltip, TooltipProps } from "..";
import { createComponentStories } from "../util";

const { defaultExport, createStory } = createComponentStories({
  component: Tooltip,
  args: {
    content: "Tooltip content",
  },
});

export default defaultExport;

const trigger: TooltipProps["trigger"] = (ref, props) => (
  <Box ref={ref} {...props} display="inline-block">
    <IconWarning size={16} />
  </Box>
);

export const Basic = createStory({
  trigger,
});
