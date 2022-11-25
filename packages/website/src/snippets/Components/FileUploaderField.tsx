import * as React from "react";
import { FileResult, FileUploaderField } from "..";

export default function FileUploaderFieldExample() {
  const [value, setValue] = React.useState<FileResult<string> | undefined>(undefined);
  return (
    <FileUploaderField
      name="file"
      label="Upload a file"
      value={value}
      onChange={setValue}
      onBlur={() => {}}
      allowedFileTypes={{
        "text/csv": [".csv"],
      }}
      texts={{
        title: "Upload a file",
        description:
          "You can upload a file in CSV format by clicking the button below or dragging and dropping it into the box.",
        uploadAgainMessage: "Upload another file: ",
        uploadingMessage: "Uploading...",
        uploadButtonLabel: "Choose a file",
        assistiveTextFileTypes: (fileTypes) =>
          fileTypes ? "Allowed file types: " + Object.values(fileTypes).flat().join(", ") : "",
        assistiveTextMaxSize: (maxSizeMb) =>
          maxSizeMb ? "Max file size: " + maxSizeMb + "MB" : "",
      }}
      renderIssue={() => "error"}
      maxFileSize={1000}
    />
  );
}
