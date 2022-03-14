import { Card, Disclosure, Placeholder } from "../";
import { createComponentStories, formatMessage } from "../util";
import { Story } from "@storybook/react";

const { defaultExport, createStory } = createComponentStories({
  component: Disclosure,
  args: {
    title: formatMessage("Title"),
    children: <Placeholder />,
  },
  argTypes: {},
  parameters: {
    actions: {
      argTypesRegex: "",
    },
  },
});

export default defaultExport;

export const Level1 = createStory({});

export const Level2 = createStory({ level: 2 });

export const InCard = createStory({ level: 2 });
InCard.decorators = [
  (Story: Story) => (
    <Card paddingX={40} paddingY={24} elevation="small">
      <Story />
    </Card>
  ),
];
