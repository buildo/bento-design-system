import { Placeholder, Stack } from "..";
import { alignArgType, createComponentStories, disableControlArgType, spaceArgType } from "../util";

const { createStory, defaultExport } = createComponentStories({
  component: Stack,
  args: {
    space: 32,
    children: [
      <Placeholder height={100} width={100} />,
      <Placeholder height={100} width={100} />,
      <Placeholder height={100} width={100} />,
    ],
  },
  argTypes: {
    space: spaceArgType,
    children: disableControlArgType,
    align: alignArgType,
  },
});

export default defaultExport;

export const basic = createStory({});

export const alignLeft = createStory({
  align: "left",
});

export const alignCenter = createStory({
  align: "center",
});

export const alignRight = createStory({
  align: "right",
});

export const responsiveAlign = createStory({
  align: {
    mobile: "center",
    desktop: "left",
  },
});

export const dividers = createStory({
  dividers: true,
});
