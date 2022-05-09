import { Placeholder, Tiles } from "..";
import {
  alignYArgType,
  createComponentStories,
  disableControlArgType,
  spaceArgType,
} from "../util";

const { defaultExport, createStory } = createComponentStories({
  component: Tiles,
  args: {},
  argTypes: {
    space: spaceArgType,
    columns: {
      options: [1, 2, 3, 4, 5, 6],
    },
    children: disableControlArgType,
    alignY: alignYArgType,
  },
});

export default defaultExport;

export const threeColumns = createStory({
  space: 32,
  columns: 3,
  children: [<Placeholder key={1} />, <Placeholder key={2} />, <Placeholder key={3} />],
});

export const responsive = createStory({
  space: { mobile: 8, tablet: 16, desktop: 32, wide: 32 },
  columns: { mobile: 1, tablet: 2, desktop: 4, wide: 6 },
  children: [
    <Placeholder key={1} />,
    <Placeholder key={2} />,
    <Placeholder key={3} />,
    <Placeholder key={4} />,
    <Placeholder key={5} />,
    <Placeholder key={6} />,
  ],
});

export const alignY = createStory({
  columns: 4,
  space: 32,
  alignY: "bottom",
  children: [
    <Placeholder key={1} />,
    <Placeholder height={400} key={2} />,
    <Placeholder key={3} />,
    <Placeholder key={4} />,
  ],
});
