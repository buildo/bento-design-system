import { Column, Columns, Placeholder } from "..";
import { createComponentStories, disableControlArgType, spaceArgType } from "../util";

const { defaultExport, createStory } = createComponentStories({
  component: Columns,
  subcomponents: { Column },
  args: {
    space: 32,
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

export const reverse = createStory({
  children: [<Placeholder label="1" />, <Placeholder label="2" />, <Placeholder label="3" />],
  reverse: true,
});

export const responsiveReverse = createStory(
  {
    children: [
      <Placeholder background="brandPrimary" />,
      <Column width={{ wide: "content", desktop: "content", tablet: "full", mobile: "full" }}>
        <Placeholder label="sidebar" background="brandSecondary" />
      </Column>,
    ],
    collapseBelow: "desktop",
    reverse: {
      tablet: true,
      mobile: false,
    },
  },
  { viewport: { defaultViewport: "tablet" } }
);

export const sticky = createStory(
  {
    collapseBelow: "desktop",
    reverse: { tablet: true },
    children: [
      <Placeholder background="brandPrimary" height={600} />,
      <Column
        width={{ desktop: "content", tablet: "full" }}
        sticky={{ top: { desktop: 40, tablet: 16 } }}
      >
        <Placeholder label="sidebar" background="brandSecondary" />
      </Column>,
    ],
  },
  { viewport: { defaultViewport: "mobile1" } }
);
