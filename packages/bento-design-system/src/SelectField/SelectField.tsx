import { GroupBase } from "react-select";
import { ListSize, LocalizedString } from "..";
import { useField } from "@react-aria/label";
import { FieldProps } from "../Field/FieldProps";
import { Field } from "../Field/Field";
import { BaseSelect } from "./BaseSelect";
import { BaseMultiProps, BaseSelectProps, BaseSingleProps } from "./types";

type MultiProps<A> = BaseMultiProps & FieldProps<A[]>;

type SingleProps<A> = BaseSingleProps & FieldProps<A | undefined>;

type Props<A> = BaseSelectProps<A> & (SingleProps<A> | MultiProps<A>);

export type { Props as SelectFieldProps };

declare module "react-select/dist/declarations/src/Select" {
  export interface Props<Option, IsMulti extends boolean, Group extends GroupBase<Option>> {
    menuSize?: ListSize;
    validationState: "valid" | "invalid";
    multiValueMessage?: (numberOfSelectedOptions: number) => LocalizedString;
    isReadOnly?: boolean;
    showMultiSelectBulkActions?: boolean;
    selectAllButtonLabel?: LocalizedString;
    clearAllButtonLabel?: LocalizedString;
    multiSelectMode?: "summary" | "chips";
  }
}

export function SelectField<A>(props: Props<A>) {
  const { label, hint, hintPlacement, assistiveText, issues, disabled } = props;

  const validationState = issues ? "invalid" : "valid";
  const { labelProps, fieldProps, descriptionProps, errorMessageProps } = useField({
    label,
    description: assistiveText,
    errorMessage: issues,
    validationState,
  });

  const hintProps = hint !== undefined ? { hint, hintPlacement } : { hint };

  return (
    <Field
      label={label}
      labelProps={labelProps}
      assistiveText={assistiveText}
      issues={issues}
      assistiveTextProps={descriptionProps}
      errorMessageProps={errorMessageProps}
      disabled={disabled}
      {...hintProps}
    >
      <BaseSelect fieldProps={fieldProps} validationState={validationState} {...props} />
    </Field>
  );
}
