import { Column, Columns, Placeholder } from "..";
import { createComponentStories, disableControlArgType, spaceArgType } from "../util";

const { defaultExport, createStory } = createComponentStories({
  component: Columns,
  subcomponents: { Column },
  args: {
    space: "32",
  },
  argTypes: {
    space: spaceArgType,
    children: disableControlArgType,
  },
});

export default defaultExport;

export const twoColumn = createStory({
  children: [<Placeholder height={200} />, <Placeholder height={200} />],
});

export const twoColumn1_3 = createStory({
  children: [
    <Column width="1/3">
      <Placeholder height={200} label="1/3" />
    </Column>,
    <Column>
      <Placeholder height={200} />
    </Column>,
  ],
});

export const threeColumn = createStory({
  children: [
    <Column width="1/5">
      <Placeholder height={200} label="1/5" />
    </Column>,
    <Column>
      <Placeholder height={200} />
    </Column>,
    <Column width="1/5">
      <Placeholder height={200} label="1/5" />
    </Column>,
  ],
});

export const contentSizedColumn = createStory({
  children: [
    <Column width="content">
      <Placeholder height={200} label="I'm a content-sized column" />
    </Column>,
    <Column>
      <Placeholder height={200} />
    </Column>,
  ],
});

export const collapseBelow = createStory(
  {
    collapseBelow: "desktop",
    align: {
      mobile: "center",
      desktop: "left",
    },
    children: [
      <Placeholder height={100} />,
      <Placeholder height={100} />,
      <Placeholder height={100} />,
    ],
  },
  {
    viewport: { defaultViewport: "mobile1" },
  }
);

export const alignY = createStory({
  alignY: "bottom",
  children: [<Placeholder height={50} />, <Placeholder height={100} />],
});

export const alignYStretch = createStory({
  alignY: "stretch",
  children: [<Placeholder height={100} />, <Placeholder height="100%" />],
});
