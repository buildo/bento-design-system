import { action } from "@storybook/addon-actions";
import { Body, link, makeTextChildrenFromElements } from "..";
import { createComponentStories, formatMessage } from "../util";

const { defaultExport, createStory } = createComponentStories({
  component: Body,
  args: {},
  parameters: {
    // NOTE(gabro): this is to avoid Storybook erroring when trying to parse the DSL
    // See https://github.com/storybookjs/storybook/issues/11543#issuecomment-684130442
    docs: { source: { type: "code" } },
  },
});

export default defaultExport;

export const LinkButton = createStory({
  size: "medium",
  children: makeTextChildrenFromElements(
    link(formatMessage("I look like a link, but I'm actually a button!"), {
      onClick: action("onClick"),
    })
  ),
});
