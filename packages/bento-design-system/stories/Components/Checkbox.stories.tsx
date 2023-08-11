import { Body, Box, Card, Checkbox, Column, Columns, Stack, Title, CheckboxProps } from "..";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Checkbox,
  args: {
    "aria-label": "Toggle card selection",
  },
  decorators: [
    (Story: any) => (
      <Card padding={24} background="softOrange">
        <Columns space={16}>
          <Column width="content">
            <Story />
          </Column>
          <Stack space={8}>
            <Title size="medium">Selectable card</Title>
            <Body size="medium">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </Body>
          </Stack>
        </Columns>
      </Card>
    ),
  ],
} satisfies Meta<CheckboxProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Unchecked = {
  args: {
    value: false,
  },
} satisfies Story;

export const Checked = {
  args: {
    value: true,
  },
} satisfies Story;

export const Disabled = {
  args: {
    value: false,
    disabled: true,
  },
} satisfies Story;
