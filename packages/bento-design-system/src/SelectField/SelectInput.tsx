import { useField } from "@react-aria/label";
import { FieldProps } from "../Field/FieldProps";
import { BaseMultiProps, BaseSelectProps, BaseSingleProps } from "./types";
import { AtLeast } from "../util/AtLeast";
import { HTMLAttributes } from "react";
import { BaseSelect } from "./BaseSelect";

type MultiProps<A> = BaseMultiProps &
  Pick<FieldProps<A[]>, "autoFocus" | "disabled" | "name" | "onBlur" | "onChange" | "value">;

type SingleProps<A> = BaseSingleProps &
  Pick<
    FieldProps<A | undefined>,
    "autoFocus" | "disabled" | "name" | "onBlur" | "onChange" | "value"
  >;

type Props<A> = AtLeast<Pick<HTMLAttributes<HTMLInputElement>, "aria-label" | "aria-labelledby">> &
  BaseSelectProps<A> & {
    validationState: "valid" | "invalid";
  } & (SingleProps<A> | MultiProps<A>);

export function SelectInput<A>(props: Props<A>) {
  const { fieldProps } = useField({
    ...props,
  });

  return <BaseSelect fieldProps={fieldProps} {...props} />;
}

export type { Props as SelectInputProps };
