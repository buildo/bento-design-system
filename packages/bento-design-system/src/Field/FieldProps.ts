import { LocalizedString } from "../util/LocalizedString";
import { Children } from "../util/Children";
import { NonEmptyArray } from "../util/NonEmptyArray";

export type FieldProps<V, VO = V> = {
  name: string;
  value: V;
  onChange: (value: VO) => unknown;
  onBlur: () => unknown;
  label: LocalizedString;
  hint?: LocalizedString;
  issues?: NonEmptyArray<Children>;
  disabled?: boolean;
  assistiveText?: Children;
};
