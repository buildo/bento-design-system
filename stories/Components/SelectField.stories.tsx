import { StoryFn } from "@storybook/react";
import { IllustrationProps, Modal, SelectField, svgIllustrationProps } from "../";
import { createComponentStories, fieldArgTypes, formatMessage, textArgType } from "../util";

function Illustration(props: IllustrationProps) {
  return (
    <svg {...svgIllustrationProps(props)}>
      <path d="M47.5 0A2.505 2.505 0 0 0 45 2.5v10H21.25C10.913 12.5 2.5 20.913 2.5 31.25v26.48c-1.45.517-2.5 1.894-2.5 3.52A3.757 3.757 0 0 0 3.75 65h24.229l1.46 2.93A3.74 3.74 0 0 0 32.793 70H35v8.75c0 .693.557 1.25 1.25 1.25s1.25-.557 1.25-1.25V70H45v8.75c0 .693.557 1.25 1.25 1.25s1.25-.557 1.25-1.25V70h2.207c1.426 0 2.71-.796 3.355-2.07l1.46-2.93H76.25A3.757 3.757 0 0 0 80 61.25c0-1.626-1.05-3.003-2.5-3.52V31.25c0-10.337-8.413-18.75-18.75-18.75H52.5V8.774l5.488-1.098A2.517 2.517 0 0 0 60 5.225V2.5C60 1.123 58.877 0 57.5 0h-10Zm0 2.5h10v2.725l-5.488 1.103A2.507 2.507 0 0 0 50 8.774V28.95c-.81-.2-1.69-.2-2.5 0V2.5ZM21.25 15c7.666 0 14.097 5.347 15.796 12.5H13.75A3.757 3.757 0 0 0 10 31.25v25c0 .44.088.86.23 1.25H5V31.25C5 22.29 12.29 15 21.25 15Zm9.316 0H45v15.45a4.943 4.943 0 0 0-1.25 3.3c0 1.338.527 2.588 1.465 3.535a4.996 4.996 0 0 0 7.07 0 4.996 4.996 0 0 0 1.465-3.535c0-1.226-.44-2.388-1.25-3.3V15h6.25C67.715 15 75 22.285 75 31.25v1.25h-7.5c-.693 0-1.25.557-1.25 1.25S66.807 35 67.5 35H75v22.5H40V31.25c0-6.948-3.809-13.013-9.434-16.25ZM13.75 30h23.687c.034.415.063.825.063 1.25v8.862l-5.518 3.99a1.23 1.23 0 0 1-1.464 0L12.534 31.079A1.233 1.233 0 0 1 13.75 30Zm35 1.25c.45 0 .874.112 1.25.352a2.463 2.463 0 0 1 1.25 2.148c0 .664-.264 1.299-.737 1.763-.464.473-1.114.713-1.763.713-.65 0-1.299-.24-1.763-.713a2.463 2.463 0 0 1-.737-1.763c0-.664.264-1.299.737-1.763.152-.151.328-.288.513-.385.376-.24.8-.352 1.25-.352Zm8.75 1.25c-.693 0-1.25.557-1.25 1.25S56.807 35 57.5 35h5c.693 0 1.25-.557 1.25-1.25s-.557-1.25-1.25-1.25h-5Zm-45 1.64 16.548 11.988c.659.478 1.435.713 2.202.713.772 0 1.543-.235 2.202-.713l4.048-2.93V57.5H13.75c-.688 0-1.25-.562-1.25-1.25V34.14ZM45 50c-.693 0-1.25.557-1.25 1.25v2.5c0 .693.557 1.25 1.25 1.25s1.25-.557 1.25-1.25v-2.5c0-.693-.557-1.25-1.25-1.25Zm6.25 0c-.693 0-1.25.557-1.25 1.25v2.5c0 .693.557 1.25 1.25 1.25s1.25-.557 1.25-1.25v-2.5c0-.693-.557-1.25-1.25-1.25Zm6.25 0c-.693 0-1.25.557-1.25 1.25v2.5c0 .693.557 1.25 1.25 1.25s1.25-.557 1.25-1.25v-2.5c0-.693-.557-1.25-1.25-1.25Zm6.25 0c-.693 0-1.25.557-1.25 1.25v2.5c0 .693.557 1.25 1.25 1.25S65 54.443 65 53.75v-2.5c0-.693-.557-1.25-1.25-1.25ZM70 50c-.693 0-1.25.557-1.25 1.25v2.5c0 .693.557 1.25 1.25 1.25s1.25-.557 1.25-1.25v-2.5c0-.693-.557-1.25-1.25-1.25ZM3.75 60h72.5c.689 0 1.25.562 1.25 1.25s-.561 1.25-1.25 1.25H3.75c-.688 0-1.25-.562-1.25-1.25S3.062 60 3.75 60Zm27.021 5h20.957l-.908 1.811c-.21.425-.64.689-1.113.689H32.793c-.474 0-.903-.264-1.113-.689L30.77 65Z" />
    </svg>
  );
}

const { defaultExport, createControlledStory } = createComponentStories({
  component: SelectField,
  args: {
    size: "large",
    name: "color",
    label: formatMessage("What's your favorite color?"),
    placeholder: formatMessage("Select a color"),
    options: [
      {
        value: 1,
        label: formatMessage("Red"),
        kind: "two-line",
        secondLine: formatMessage("prova"),
        illustration: Illustration,
      },
      {
        value: 2,
        label: formatMessage("Blue"),
        kind: "two-line",
        secondLine: formatMessage("prova"),
        illustration: Illustration,
      },
      {
        value: 3,
        label: formatMessage("Green"),
        kind: "two-line",
        secondLine: formatMessage("prova"),
        illustration: Illustration,
        disabled: true,
      },
      {
        value: 4,
        label: formatMessage(`
          Very very very very very very very very long label. Did I say this label is very long? Well let me say it again, it's loooooong, very looooooooong. Maybe we should say it again, let's go! Very very very very very very very very long label.
          Very very very very very very very very long label. Did I say this label is very long? Well let me say it again, it's loooooong, very looooooooong. Maybe we should say it again, let's go! Very very very very very very very very long label.`),
        kind: "single-line",
      },
    ],
    noOptionsMessage: formatMessage("No options"),
  },
  argTypes: {
    ...fieldArgTypes,
    placeholder: textArgType,
  },
});

export default defaultExport;

export const LargeMenu = createControlledStory(undefined, {});

export const MediumMenu = createControlledStory(undefined, { size: "medium" });

export const Disabled = createControlledStory(undefined, {
  disabled: true,
});

export const Error = createControlledStory(undefined, {
  issues: [formatMessage("Please select a color")],
});

export const InModal = createControlledStory(undefined, {});
InModal.decorators = [
  (Story: StoryFn) => (
    <Modal
      title={formatMessage("Title")}
      onClose={() => {}}
      closeButtonLabel={formatMessage("Close")}
    >
      <Story />
    </Modal>
  ),
];

export const MultiSelectOneOptionSelected = createControlledStory([1], {
  isMulti: true,
  multiValueMessage: (numberOfSelectedOptions: number) =>
    formatMessage(`${numberOfSelectedOptions} options selected`),
});

export const MultiSelectMultipleOptionsSelected = createControlledStory([1, 2], {
  isMulti: true,
  multiValueMessage: (numberOfSelectedOptions: number) =>
    formatMessage(`${numberOfSelectedOptions} options selected`),
});
