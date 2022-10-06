import { IconPlaceholder } from "@buildo/bento-design-system";
import { Chip } from "../";
import { createComponentStories, textArgType } from "../util";

const { defaultExport, createStory } = createComponentStories({
  component: Chip,
  args: {
    label: "Label",
  },
  argTypes: {
    label: textArgType,
  },
});

export default defaultExport;

export const NonDismissable = createStory(
  {
    color: "blue",
  },
  { actions: { argTypesRegex: "" } }
);

export const Dismissable = createStory({
  color: "blue",
});

export const CustomColor = createStory({
  color: "custom",
});

export const WithIcon = createStory({
  color: "blue",
  icon: IconPlaceholder,
});

export const MaxWidth = createStory({
  label: "Very very long label",
  color: "blue",
  maxCharacters: 10,
});
