import { useTextField } from "@react-aria/textfield";
import { useRef } from "react";
import { Field, Children } from "..";
import { LocalizedString } from "../util/LocalizedString";
import { FieldProps } from "../Field/FieldProps";
import { BaseTextInput } from "./BaseTextInput";

type Props = FieldProps<string> & {
  placeholder?: LocalizedString;
  isReadOnly?: boolean;
  type?: "text" | "email" | "url" | "password";
  rightAccessory?: Children;
  showPasswordLabel?: never;
  hidePasswordLabel?: never;
} & Pick<React.HTMLProps<HTMLInputElement>, "onKeyDown" | "onKeyUp">;

export function TextField(props: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const validationState = props.isReadOnly ? undefined : props.issues ? "invalid" : "valid";

  const { labelProps, inputProps, descriptionProps, errorMessageProps } = useTextField(
    {
      ...props,
      errorMessage: props.issues,
      description: props.assistiveText,
      validationState,
      isDisabled: props.disabled,
    },
    inputRef
  );

  return (
    <Field
      {...props}
      labelProps={labelProps}
      assistiveTextProps={descriptionProps}
      errorMessageProps={errorMessageProps}
    >
      <BaseTextInput
        inputProps={inputProps}
        inputRef={inputRef}
        validationState={validationState}
        {...props}
      />
    </Field>
  );
}

export type { Props as TextFieldProps };
