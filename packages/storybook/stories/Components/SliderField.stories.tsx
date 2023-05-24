import { LocalizedString } from "@buildo/bento-design-system";
import { SliderField, SliderFieldProps, Omit } from "..";
import { Actions, createComponentStories } from "../util";
import { Parameters } from "@storybook/addons";
import { ComponentStory } from "@storybook/react";

const args = {
  name: "slider-field",
  minValue: 0,
  maxValue: 100,
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

const singleArgs = {
  type: "single" as const,
  assistiveText: "Assistive text",
  label: "Label",
  placeholder: "Insert a value",
  hint: "Some hint that is very useful to you",
};

const doubleArgs = {
  type: "double" as const,
  labels: ["Min", "Max"] as [LocalizedString, LocalizedString],
  placeholders: ["Insert min", "Insert max"] as [LocalizedString, LocalizedString],
  assistiveTexts: ["Min value", "Max value"] as [LocalizedString, LocalizedString],
  hints: ["Some hint that is very useful to you", "Some hint that is very useful to you"] as [
    LocalizedString,
    LocalizedString
  ],
};

export const Single = createControlledStory(30, singleArgs);

export const Double = createControlledStory([30, 80], doubleArgs);

export const SingleDisabled = createControlledStory(30, {
  ...singleArgs,
  disabled: true,
});

export const SingleError = createControlledStory(30, {
  ...singleArgs,
  issues: ["Something went wrong"],
});

export const DoubleDisabled = createControlledStory([30, 80], {
  ...doubleArgs,
  disabled: true,
});

export const DoubleErrors = createControlledStory([30, 80], {
  ...doubleArgs,
  issues: [["Something went wrong"], ["Something went wrong"]],
});

export const CustomStep = createControlledStory(30, {
  ...singleArgs,
  step: 0.5,
});

export const CustomDragStep = createControlledStory(28, {
  ...singleArgs,
  step: 2,
  dragStep: 9,
});

export const WithoutThumbValue = createControlledStory([30, 80], {
  ...doubleArgs,
  hideThumbValue: true,
});
