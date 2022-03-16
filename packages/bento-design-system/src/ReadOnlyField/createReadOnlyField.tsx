import { FunctionComponent } from "react";
import { TextFieldProps } from "../TextField/createTextField";
import { unsafeLocalizedString } from "../util/LocalizedString";

type Props = Omit<
  TextFieldProps,
  "onChange" | "onBlur" | "disabled" | "isReadOnly" | "placeholder" | "issues"
>;

const constVoid = () => {};

export function createReadOnlyField(TextField: FunctionComponent<TextFieldProps>) {
  return function ReadOnlyField(props: Props) {
    return (
      <TextField
        {...props}
        onChange={constVoid}
        onBlur={constVoid}
        placeholder={unsafeLocalizedString("")}
        isReadOnly
      />
    );
  };
}
