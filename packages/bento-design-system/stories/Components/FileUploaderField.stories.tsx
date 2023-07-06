import { StoryObj, Meta } from "@storybook/react";
import { FileUploaderField, BentoConfigProvider, Button, Stack } from "..";
import { useArgs } from "@storybook/addons";

const fileUploaderProps = {
  value: undefined,
  label: "Upload a file",
  allowedFileTypes: {
    "text/csv": [".csv"],
  },
  name: "file",
  texts: {
    title: "Upload a file",
    description:
      "You can upload a file in CSV format by clicking the button below or dragging and dropping it into the box.",
    uploadAgainMessage: "Upload another file: ",
    uploadingMessage: "Uploading...",
    uploadButtonLabel: "Choose a file",
    assistiveTextFileTypes: (fileTypes?: Record<string, string[]>) =>
      fileTypes ? "Allowed file types: " + Object.values(fileTypes).flat().join(", ") : "",
    assistiveTextMaxSize: (maxSizeMb?: number) =>
      maxSizeMb ? "Max file size: " + maxSizeMb + "MB" : "",
  },
  renderIssue: () => "error",
  maxFileSize: 1000,
};

const meta = {
  component: FileUploaderField,
  args: fileUploaderProps,
} satisfies Meta<typeof FileUploaderField>;

export default meta;

type Story = StoryObj<typeof meta>;

// eslint-disable-next-line storybook/prefer-pascal-case
export const fileUploaderField = {} satisfies Story;

export const Loading = {
  args: { isUploading: false },
  decorators: [
    (Story, ctx) => {
      const [, setArgs] = useArgs();

      return (
        <Stack space={16}>
          <Story args={ctx.args} />
          <Button
            kind="solid"
            hierarchy="primary"
            label={ctx.args.isUploading ? "Stop loading" : "Start loading"}
            onPress={() => setArgs({ isUploading: !ctx.args.isUploading })}
          />
        </Stack>
      );
    },
  ],
} satisfies Story;

export const WithOutlineButton = {
  decorators: [
    (Story) => (
      <BentoConfigProvider
        value={{
          fileUploaderField: {
            buttonKind: "outline",
          },
        }}
      >
        <Story />
      </BentoConfigProvider>
    ),
  ],
} satisfies Story;

export const WithSolidButton = {
  decorators: [
    (Story) => (
      <BentoConfigProvider
        value={{
          fileUploaderField: {
            buttonKind: "solid",
          },
        }}
      >
        <Story />
      </BentoConfigProvider>
    ),
  ],
} satisfies Story;

export const WithSmallButton = {
  decorators: [
    (Story) => (
      <BentoConfigProvider
        value={{
          fileUploaderField: {
            buttonSize: "small",
          },
        }}
      >
        <Story />
      </BentoConfigProvider>
    ),
  ],
} satisfies Story;
