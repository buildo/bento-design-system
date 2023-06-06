import { SliderField } from "..";
import { ComponentStory } from "@storybook/react";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: SliderField,
  args: {
    name: "slider-field",
    minValue: 0,
    maxValue: 100,
    label: "Label",
    hint: "Some hint that is very useful to you",
  },
} satisfies Meta<typeof SliderField>;

export default meta;

type Story = ComponentStory<typeof SliderField>;

export const Single = {
  args: { value: 30, type: "single", assistiveText: "Assistive text" },
} satisfies Story;

export const Double = { args: { value: [30, 80], type: "double" } } satisfies Story;

export const SingleDisabled = {
  args: { value: 30, type: "single", disabled: true },
} satisfies Story;

export const DoubleDisabled = {
  args: { value: [30, 80], type: "double", disabled: true },
} satisfies Story;

export const CustomStep = { args: { value: 30, type: "single", step: 0.5 } } satisfies Story;

export const CustomDragStep = {
  args: { value: 28, type: "single", step: 2, dragStep: 9 },
} satisfies Story;

export const WithoutThumbValue = {
  args: { value: [30, 80], type: "double", hideThumbValue: true },
} satisfies Story;
