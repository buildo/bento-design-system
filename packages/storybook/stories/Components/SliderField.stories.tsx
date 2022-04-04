import { SliderField, SliderFieldProps, Omit } from "..";
import { Actions, createComponentStories, formatMessage } from "../util";
import { Parameters } from "@storybook/addons";
import { ComponentStory } from "@storybook/react";

const args = {
  name: "slider-field",
  minValue: 0,
  maxValue: 100,
  kind: "currency",
  currency: "EUR",
  label: formatMessage("Label"),
  labels: [formatMessage("Min"), formatMessage("Max")],
  hint: formatMessage("Some hint that is very useful to you"),
} as const;

const { defaultExport, createControlledStory: createControlledStory_ } = createComponentStories<
  typeof SliderField,
  Partial<SliderFieldProps>
>({
  component: SliderField,
  args,
});

// NOTE(gabro): a little help to TypeScript since SliderFieldProps is hard to infer going through
// the normal ComponentProps helper
function createControlledStory<S>(
  initialValue: S,
  args_: Omit<SliderFieldProps, keyof typeof args | Actions<SliderFieldProps> | "value">,
  parameters?: Parameters
): ComponentStory<typeof SliderField> {
  return createControlledStory_(initialValue, args_ as any, parameters);
}

export default defaultExport;

export const Single = createControlledStory(30, {
  type: "single",
  assistiveText: formatMessage("Assistive text"),
});

export const Double = createControlledStory([30, 80], {
  type: "double",
});

export const SingleDisabled = createControlledStory(30, {
  type: "single",
  disabled: true,
});

export const DoubleDisabled = createControlledStory([30, 80], {
  type: "double",
  disabled: true,
});

export const CustomStep = createControlledStory(30, {
  type: "single",
  step: 0.5,
});
