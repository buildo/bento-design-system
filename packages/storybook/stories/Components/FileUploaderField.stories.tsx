import { StoryObj, Meta } from "@storybook/react";
import { FileUploaderField, BentoConfigProvider, Button, Stack } from "..";
import { useArgs } from "@storybook/addons";

const meta = {
  component: FileUploaderField,
} satisfies Meta<typeof FileUploaderField>;

export default meta;

type Story = StoryObj<typeof meta>;

const fileUploaderProps = {
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

export const fileUploaderField = {
  args: fileUploaderProps,
} satisfies Story;

export const Loading = {
  args: {
    ...fileUploaderProps,
    isUploading: false,
  },
  decorators: [
    (Story, ctx) => {
      const [, setArgs] = useArgs();

      return (
        <Stack space={16}>
          <FileUploaderField
            {...fileUploaderProps}
            value={undefined}
            onChange={() => {}}
            isUploading={ctx.args.isUploading}
          />
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

export const withOutlineButton = {
  args: fileUploaderProps,
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
