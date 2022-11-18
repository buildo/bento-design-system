import { LocalizedString } from "../util/LocalizedString";
import { Children } from "../util/Children";
import { NonEmptyArray } from "../util/NonEmptyArray";

type Alignment = "start" | "end";
type Side = "top" | "right" | "bottom" | "left";
type AlignedPlacement = `${Side}-${Alignment}`;
export type TooltipPlacement = Side | AlignedPlacement;

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
      hintPlacement?: TooltipPlacement;
    }
  | {
      hint?: never;
      hintPlacement?: never;
    }
);
