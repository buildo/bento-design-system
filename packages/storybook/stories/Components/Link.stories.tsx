import { action } from "@storybook/addon-actions";
import { Body, Label, link, makeTextChildrenFromElements } from "..";
import { createComponentStories, formatMessage } from "../util";

const { defaultExport, createStory } = createComponentStories({
  component: Body,
  args: {
    size: "medium",
  },
  parameters: {
    // NOTE(gabro): this is to avoid Storybook erroring when trying to parse the DSL
    // See https://github.com/storybookjs/storybook/issues/11543#issuecomment-684130442
    docs: { source: { type: "code" } },
  },
});

export default defaultExport;

export const Link = createStory({
  children: makeTextChildrenFromElements(
    link(formatMessage("I'm a link"), {
      href: "http://www.example.com",
      target: "_blank",
    })
  ),
});

export const Strong = createStory({
  weight: "strong",
  children: makeTextChildrenFromElements(
    link(formatMessage("I'm a link"), {
      href: "http://www.example.com",
      target: "_blank",
    })
  ),
});

export const Inverse = createStory({
  children: makeTextChildrenFromElements(
    link(formatMessage("I'm a link"), {
      href: "http://www.example.com",
      target: "_blank",
      kind: "inverse",
    })
  ),
});
Inverse.parameters = {
  backgrounds: {
    default: "dark",
  },
};

export const Disabled = createStory({
  children: makeTextChildrenFromElements(
    link(formatMessage("I'm a link"), {
      href: "http://www.example.com",
      target: "_blank",
      disabled: true,
    })
  ),
});

export const LinkButton = createStory({
  children: makeTextChildrenFromElements(
    link(formatMessage("I look like a link, but I'm actually a button!"), {
      onClick: action("onClick"),
    })
  ),
});

export const InLabel = () => (
  <Label size="large">
    {makeTextChildrenFromElements(
      link(formatMessage("I'm a link inside a Label"), {
        href: "http://www.example.com",
        target: "_blank",
      })
    )}
  </Label>
);
