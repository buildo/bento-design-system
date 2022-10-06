import { Body, Box, Card, Checkbox, Column, Columns, Stack, Title } from "..";
import { createComponentStories, textArgType } from "../util";

const { defaultExport, createControlledStory } = createComponentStories({
  component: Checkbox,
  args: {
    "aria-label": "Toggle card selection",
  },
  argTypes: {
    label: textArgType,
  },
  decorators: [
    (Story) => (
      <Card>
        <Box background="softOrange" padding={24}>
          <Columns space={16}>
            <Column width="content">
              <Story />
            </Column>
            <Stack space={8}>
              <Title size="medium">Selectable card</Title>
              <Body size="medium">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </Body>
            </Stack>
          </Columns>
        </Box>
      </Card>
    ),
  ],
});

export default defaultExport;

export const Unchecked = createControlledStory(false, {});

export const Checked = createControlledStory(true, {});

export const Disabled = createControlledStory(false, {
  disabled: true,
});
