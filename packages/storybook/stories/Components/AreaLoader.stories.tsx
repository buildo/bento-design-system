import { Body, Box, Card, AreaLoader, Stack, Title, Inset } from "../";
import { createComponentStories } from "../util";
import { Story } from "@storybook/react";
import { useArgs } from "@storybook/addons";
import { useEffect } from "react";

const { defaultExport, createStory } = createComponentStories({
  component: AreaLoader,
  args: {},
});

export default defaultExport;

export const Standalone = createStory({});

export const InCard = createStory({});
InCard.decorators = [
  (Story: Story) => (
    <Card padding={0} elevation="small">
      <Box position="relative">
        <Inset space={24}>
          <Stack space={8}>
            <Title size="large">Campaign type</Title>
            <Body size="large">Drive-traffic advanced</Body>
          </Stack>
        </Inset>
        <Story />
      </Box>
    </Card>
  ),
];

export const LongLoading = createStory({});
LongLoading.decorators = [
  (Story: Story) => {
    const [_, updateArgs] = useArgs();

    useEffect(() => {
      const timeout = setTimeout(() => {
        updateArgs({ message: "This may take several minutes..." });
      }, 2000);
      return () => clearTimeout(timeout);
    }, [updateArgs]);

    return <Story />;
  },
];
LongLoading.parameters = {
  chromatic: { delay: 3000 },
};
