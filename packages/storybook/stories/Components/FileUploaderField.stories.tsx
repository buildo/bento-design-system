import { FileUploaderField } from "..";
import { createComponentStories } from "../util";

const { defaultExport, createControlledStory } = createComponentStories({
  component: FileUploaderField,
  args: {},
});

export default defaultExport;

export const fileUploader = createControlledStory(undefined, {
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
    assistiveTextFileTypes: (fileTypes) =>
      fileTypes ? "Allowed file types: " + Object.values(fileTypes).flat().join(", ") : "",
    assistiveTextMaxSize: (maxSizeMb) => (maxSizeMb ? "Max file size: " + maxSizeMb + "MB" : ""),
  },
  renderIssue: () => "error",
  maxFileSize: 1000,
});
