import { FunctionComponent } from "react";
import { TextFieldProps } from "../TextField/createTextField";

type Props = Omit<
  TextFieldProps,
  "onChange" | "onBlur" | "disabled" | "isReadOnly" | "placeholder" | "issues"
>;

const constVoid = () => {};

/**
 * A convenient wrapper to the TextField, that forces isReadOnly=true
 * and doesn't require all those props that don't make sense for a read-only field (onChange, onBlur, placeholder, ...)
 */
export function createReadOnlyField({
  TextField,
}: {
  TextField: FunctionComponent<TextFieldProps>;
}) {
  return function ReadOnlyField(props: Props) {
    return (
      <TextField {...props} onChange={constVoid} onBlur={constVoid} placeholder="" isReadOnly />
    );
  };
}
export type { Props as ReadOnlyFieldProps };
