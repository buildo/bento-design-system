import { LocalizedString } from "../util/LocalizedString";
import { Children } from "../util/Children";
import { NonEmptyArray } from "../util/NonEmptyArray";
import { Placement } from "@floating-ui/core";

export type FieldProps<V, VO = V> = {
  name: string;
  value: V;
  onChange: (value: VO) => unknown;
  onBlur: () => unknown;
  label: LocalizedString;
  issues?: NonEmptyArray<Children>;
  disabled?: boolean;
  assistiveText?: Children;
  autoFocus?: boolean;
} & (
  | {
      hint: LocalizedString;
      hintPlacement?: Placement;
    }
  | {
      hint?: never;
      hintPlacement?: never;
    }
);
