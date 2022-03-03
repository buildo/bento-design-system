import { Inline, Placeholder } from "..";
import {
  alignArgType,
  alignYArgType,
  createComponentStories,
  disableControlArgType,
  spaceArgType,
} from "../util";

const { createStory, defaultExport } = createComponentStories({
  component: Inline,
  args: {
    space: "32",
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
    alignY: alignYArgType,
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

export const multipleLines = createStory({
  children: [
    <Placeholder height={100} width={100} />,
    <Placeholder height={100} width={60} />,
    <Placeholder height={100} width={80} />,
    <Placeholder height={100} width={100} />,
    <Placeholder height={100} width={90} />,
    <Placeholder height={100} width={100} />,
    <Placeholder height={100} width={40} />,
    <Placeholder height={100} width={50} />,
    <Placeholder height={100} width={70} />,
    <Placeholder height={100} width={100} />,
    <Placeholder height={100} width={70} />,
    <Placeholder height={100} width={100} />,
    <Placeholder height={100} width={100} />,
    <Placeholder height={100} width={60} />,
    <Placeholder height={100} width={80} />,
    <Placeholder height={100} width={100} />,
    <Placeholder height={100} width={90} />,
    <Placeholder height={100} width={100} />,
    <Placeholder height={100} width={40} />,
    <Placeholder height={100} width={50} />,
    <Placeholder height={100} width={70} />,
    <Placeholder height={100} width={100} />,
    <Placeholder height={100} width={70} />,
    <Placeholder height={100} width={100} />,
    <Placeholder height={100} width={100} />,
    <Placeholder height={100} width={60} />,
    <Placeholder height={100} width={80} />,
    <Placeholder height={100} width={100} />,
    <Placeholder height={100} width={90} />,
    <Placeholder height={100} width={100} />,
    <Placeholder height={100} width={40} />,
    <Placeholder height={100} width={50} />,
    <Placeholder height={100} width={70} />,
    <Placeholder height={100} width={100} />,
    <Placeholder height={100} width={70} />,
    <Placeholder height={100} width={100} />,
  ],
});

export const collapseBelow = createStory(
  {
    collapseBelow: "tablet",
    align: {
      mobile: "center",
      tablet: "left",
    },
    children: [
      <Placeholder height={100} width={100} />,
      <Placeholder height={100} width={100} />,
      <Placeholder height={100} width={100} />,
    ],
  },
  { viewport: { defaultViewport: "mobile1" } }
);

export const responsiveAlign = createStory({
  align: {
    mobile: "center",
    desktop: "left",
  },
});

export const reverse = createStory({
  reverse: true,
  children: [
    <Placeholder label="1" width={100} />,
    <Placeholder label="2" width={100} />,
    <Placeholder label="3" width={100} />,
  ],
});

export const responsiveReverse = createStory(
  {
    reverse: {
      tablet: true,
    },
    children: [
      <Placeholder label="1" width={100} background="brandPrimary" />,
      <Placeholder label="2" width={100} background="brandSecondary" />,
      <Placeholder label="3" width={100} background="brandTertiary" />,
    ],
  },
  { viewport: { defaultViewport: "tablet" } }
);
