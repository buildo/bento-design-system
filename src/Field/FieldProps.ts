import { LocalizedString } from "../util/LocalizedString";
import { TextChildren } from "../util/TextChildren";
import { NonEmptyArray } from "../util/NonEmptyArray";

export type FieldProps<V, VO = V> = {
  name: string;
  value: V;
  onChange: (value: VO) => unknown;
  onBlur: () => unknown;
  label: LocalizedString;
  hint?: LocalizedString;
  issues?: NonEmptyArray<TextChildren>;
  disabled?: boolean;
  assistiveText?: TextChildren;
};
