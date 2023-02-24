import { useField } from "@react-aria/label";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { useCallback, useEffect, useState } from "react";
import { ErrorCode as DropzoneErrorCode, FileRejection, useDropzone } from "react-dropzone";
import { match, __ } from "ts-pattern";
import {
  Body,
  Box,
  Button,
  Column,
  Columns,
  Field,
  IconButton,
  InlineLoader,
  Inset,
  Link,
  Stack,
  IconClose,
  ContentBlock,
} from "..";
import { useBentoConfig } from "../BentoConfigContext";
import { FieldProps } from "../Field/FieldProps";
import { Children } from "../util/Children";
import { LocalizedString, unsafeLocalizedString } from "../util/LocalizedString";
import { NonEmptyArray } from "../util/NonEmptyArray";
import { fieldHeight, fileUploaderRecipe, max4Lines } from "./FileUploaderField.css";

const errorCodes = [
  DropzoneErrorCode.FileInvalidType,
  DropzoneErrorCode.FileTooLarge,
  DropzoneErrorCode.TooManyFiles,
] as const;

type KnownDropzoneErrorCode = typeof errorCodes[number];

export type ErrorCode =
  | `${KnownDropzoneErrorCode}`
  | "generic-error"
  | "wrong-structure"
  | "unable-to-read";

function isDropzoneKnownError(error: string): error is KnownDropzoneErrorCode {
  return errorCodes.find((c) => c === error) !== undefined;
}

export type FileUploaderTexts = {
  title: LocalizedString;
  description: LocalizedString;
  uploadAgainMessage: LocalizedString;
  uploadingMessage: LocalizedString;
  uploadButtonLabel: LocalizedString;
  assistiveTextFileTypes: (allowedFileTypes?: Record<string, string[]>) => LocalizedString;
  assistiveTextMaxSize: (maxFileSizeMb?: number) => LocalizedString;
};

export type FileResult<E extends string> =
  | {
      readonly status: "valid";
      file: File;
    }
  | {
      readonly status: "invalid";
      file: File;
      issues: NonEmptyArray<E | ErrorCode>;
    };

type Props<E extends string> = {
  /**
   * Texts used in the component
   */
  texts: FileUploaderTexts;
  /**
   * A function to render validation issues. It's used to display a user-friendly error message under the field.
   */
  renderIssue: (issue: E | ErrorCode, file?: File) => Children;
  /**
   * A non-empty array of validation issues for the field
   */
  issues?: NonEmptyArray<E>;
  /**
   * The maximum size of uploaded files, in megabytes.
   */
  maxFileSize?: number;
  /**
   * An object where the keys are MIME types and the values are file extensions.
   */
  allowedFileTypes?: Record<string, string[]>;
  /**
   * Custom validation function.
   * If the function returns an error code, the file is considered invalid.
   * Returning `null` means the file is valid.
   */
  validate?: (file: File) => Promise<E | null>;
  /**
   * The field height
   */
  height?: string | number;
  /**
   * A parameter that allows external control of the uploading status.
   */
  isUploading?: boolean;
} & Omit<FieldProps<FileResult<E> | undefined>, "assistiveText" | "issues">;

export type { Props as FileUploaderProps };

type Status =
  | "default"
  | "disabled"
  | "dragActive"
  | "uploading"
  | "uploadingWithError"
  | "hasError"
  | "hasFile";

function getStatus(
  disabled: boolean,
  dragActive: boolean,
  uploading: boolean,
  hasError: boolean,
  hasFile: boolean
): Status {
  if (disabled) return "disabled";
  if (dragActive) return "dragActive";
  if (uploading && hasError) return "uploadingWithError";
  if (uploading) return "uploading";
  if (hasError) return "hasError";
  if (hasFile) return "hasFile";
  return "default";
}

export function FileUploaderField<E extends string>({
  label,
  validate = async () => null,
  value,
  onChange,
  issues,
  texts,
  renderIssue,
  disabled,
  maxFileSize,
  allowedFileTypes,
  height: height_,
  isUploading,
}: Props<E>) {
  const config = useBentoConfig().fileUploaderField;
  const height = height_ ?? config.defaultHeight;
  const [uploading, setUploading] = useState<boolean>(isUploading ?? false);

  // note(Fede): useDropzone already exposes a `isDragActive` flag, but it is true
  // only when a file is dragged over the component, not the whole window, which is what we prefer.
  const [isDragActive, setDragActive] = useState<boolean>(false);

  const setDragActiveOnEvent = useCallback(
    (active: boolean) => (e: DragEvent) => {
      if (e.type !== "dragleave" || !(e as any).fromElement) {
        setDragActive(active);
      }
      e.stopPropagation();
      e.preventDefault();
      return false;
    },
    []
  );

  const onDragEnter = useCallback(
    (e: DragEvent) => setDragActiveOnEvent(!uploading && !disabled)(e),
    [uploading, disabled, setDragActiveOnEvent]
  );
  const onDragLeave = useCallback(
    (e: DragEvent) => setDragActiveOnEvent(false)(e),
    [setDragActiveOnEvent]
  );
  const onDragEnd = useCallback(
    (e: DragEvent) => setDragActiveOnEvent(false)(e),
    [setDragActiveOnEvent]
  );
  const onDrop = useCallback(
    (e: DragEvent) => setDragActiveOnEvent(false)(e),
    [setDragActiveOnEvent]
  );

  useEffect(() => {
    window.addEventListener("dragenter", onDragEnter);
    window.addEventListener("dragleave", onDragLeave);
    window.addEventListener("dragend", onDragEnd);
    window.addEventListener("drop", onDrop);
    return () => {
      window.removeEventListener("dragenter", onDragEnter);
      window.removeEventListener("dragleave", onDragLeave);
      window.removeEventListener("dragend", onDragEnd);
      window.removeEventListener("drop", onDrop);
    };
  }, [onDragEnter, onDragLeave, onDragEnd, onDrop]);

  const renderedIssues = match(value)
    .with(
      { status: "invalid" },
      (v) => v.issues.map((issue) => renderIssue(issue, v.file)) as NonEmptyArray<Children>
    )
    .with({ status: "valid" }, __.nullish, (v) =>
      issues
        ? (issues.map((issue) => renderIssue(issue, v?.file)) as NonEmptyArray<Children>)
        : undefined
    )
    .exhaustive();

  const assistiveText = unsafeLocalizedString(
    `${texts.assistiveTextFileTypes(allowedFileTypes)} ${texts.assistiveTextMaxSize(maxFileSize)}`
  );

  const { descriptionProps, errorMessageProps, fieldProps, labelProps } = useField({
    label,
    description: assistiveText,
    errorMessage: renderedIssues,
    validationState: renderedIssues && renderedIssues.length ? "invalid" : "valid",
  });

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop: async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      onChange(undefined);

      if (fileRejections.length) {
        const fileRejection = fileRejections[0];
        const fileRejectionErrorCode = fileRejection.errors[0]?.code;
        const errorCode: ErrorCode = isDropzoneKnownError(fileRejectionErrorCode)
          ? fileRejectionErrorCode
          : "generic-error";
        onChange({ status: "invalid", file: fileRejection.file, issues: [errorCode] });
      } else if (acceptedFiles.length) {
        const file = acceptedFiles[0];
        setUploading(true);
        const result = (await validate?.(file)) ?? null;
        setUploading(false);
        if (result !== null) {
          onChange({ status: "invalid", file, issues: [result] });
        } else {
          onChange({ status: "valid", file });
        }
      } else {
        // this should never happen
      }
    },
    noClick: true,
    multiple: false,
    disabled,
    // NOTE(fede): we need to pass both mime types and file extension because:
    // 1. defining accepted mime types correctly prevent other files from being selected
    // in the browse dialog but the subsequent validation fails;
    // 2. defining accepted file extensions doesn't prevent other files from being selected
    // in the browse dialog but the validation works.
    accept: allowedFileTypes,
    maxSize: maxFileSize && maxFileSize * 1024 * 1024,
  });

  const {
    onDragEnter: _onDragEnter,
    onDragOver: _onDragOver,
    onDragLeave: _onDragLeave,
    onDragEnd: _onDragEnd,
    ...rootProps
  } = getRootProps();

  return (
    <Field
      label={label}
      labelProps={labelProps}
      assistiveText={assistiveText}
      assistiveTextProps={descriptionProps}
      errorMessageProps={errorMessageProps}
      issues={renderedIssues}
      disabled={disabled}
    >
      <Box
        className={fileUploaderRecipe({
          status: getStatus(
            !!disabled,
            isDragActive,
            uploading,
            !!renderedIssues || value?.status === "invalid",
            value?.status === "valid" && !renderedIssues
          ),
        })}
        style={assignInlineVars({
          [fieldHeight]: match(height)
            .with(__.number, (v) => `${v}px`)
            .with(__.string, (v) => v)
            .exhaustive(),
        })}
        {...rootProps}
        display="flex"
        flexDirection="column"
        color={undefined}
        padding={16}
        gap={8}
      >
        {uploading ? (
          <Box height="full" display="flex" alignItems="center" justifyContent="center">
            <InlineLoader message={texts.uploadingMessage} />
          </Box>
        ) : value && value.status !== "invalid" && !renderedIssues ? (
          <>
            <Box flexGrow={1} display="flex" alignItems="center" justifyContent="center">
              <Columns space={16} alignY="center">
                <Box className={max4Lines}>
                  <Body size="medium" color={!!disabled ? "disabled" : "default"}>
                    {unsafeLocalizedString(value.file.name)}
                  </Body>
                </Box>
                <Column width="content">
                  <IconButton
                    kind="transparent"
                    hierarchy="secondary"
                    size={12}
                    label={unsafeLocalizedString("remove")}
                    icon={IconClose}
                    onPress={() => onChange(undefined)}
                    isDisabled={disabled}
                  />
                </Column>
              </Columns>
            </Box>
            <Box display="flex" justifyContent="center">
              <Body size="small" color={!!disabled ? "disabled" : "default"}>
                {texts.uploadAgainMessage}
                <Link label={texts.uploadButtonLabel} onClick={open} />
              </Body>
            </Box>
          </>
        ) : (
          <Inset spaceY={8}>
            <Stack space={8} align="center">
              <ContentBlock maxWidth={700}>
                <Stack space={4} align="center">
                  <Body size="medium" color={!!disabled ? "disabled" : "default"}>
                    {texts.title}
                  </Body>
                  <Body size="small" color={!!disabled ? "disabled" : "secondary"}>
                    {texts.description}
                  </Body>
                </Stack>
              </ContentBlock>
              <Button
                kind={config.buttonKind}
                hierarchy="secondary"
                label={texts.uploadButtonLabel}
                onPress={open}
                isDisabled={!!disabled}
              />
            </Stack>
          </Inset>
        )}
        <input {...getInputProps()} {...fieldProps} />
      </Box>
    </Field>
  );
}
