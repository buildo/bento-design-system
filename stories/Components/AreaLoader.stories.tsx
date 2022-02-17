import { Body, Box, Card, AreaLoader, Stack, Title, Inset } from "../";
import { createComponentStories, formatMessage } from "../util";
import { Story } from "@storybook/react";

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
            <Title size="large">{formatMessage("Campaign type")}</Title>
            <Body size="large">{formatMessage("Drive-traffic advanced")}</Body>
          </Stack>
        </Inset>
        <Story />
      </Box>
    </Card>
  ),
];
