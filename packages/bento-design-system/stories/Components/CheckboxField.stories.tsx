import { CheckboxField, IconLightbulb, Body } from "..";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: CheckboxField,
  args: {
    label: "I agree with the terms and conditions",
    name: "terms-and-conditions",
  },
} satisfies Meta<typeof CheckboxField>;

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

export const Error = {
  args: {
    value: false,
    issues: ["This field is required"],
  },
} satisfies Story;

export const Disabled = {
  args: {
    value: false,
    disabled: true,
  },
} satisfies Story;

export const LongLabel = {
  args: {
    value: false,
    label:
      "Very very very very very very very very long label. Did I say this label is very long? Well let me say it again, it's loooooong, very looooooooong. Maybe we should say it again, let's go! Very very very very very very very very long label.",
  },
} satisfies Story;

export const ComplexLabel = {
  args: {
    value: false,
    label: (
      <>
        Some text, some{" "}
        <Body size="large" weight="strong">
          bold words
        </Body>
        , then some more text and an icon <IconLightbulb size={16} />
      </>
    ),
  },
} satisfies Story;
