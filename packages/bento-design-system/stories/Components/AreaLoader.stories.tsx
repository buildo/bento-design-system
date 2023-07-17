import { Body, Box, Card, AreaLoader, Stack, Title, Inset } from "..";
import { useArgs } from "@storybook/addons";
import { useEffect } from "react";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: AreaLoader,
} satisfies Meta<typeof AreaLoader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standalone = {} satisfies Story;

export const InCard = {
  decorators: [
    (Story) => (
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
  ],
} satisfies Story;

export const LongLoading = {
  decorators: [
    (Story) => {
      const [_, updateArgs] = useArgs();

      useEffect(() => {
        const timeout = setTimeout(() => {
          updateArgs({ message: "This may take several minutes..." });
        }, 2000);
        return () => clearTimeout(timeout);
      }, [updateArgs]);

      return <Story />;
    },
  ],
  parameters: {
    chromatic: { delay: 3000 },
  },
} satisfies Story;
