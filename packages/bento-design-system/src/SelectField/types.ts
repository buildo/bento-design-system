import { ListItemProps, ListSize } from "..";
import { LocalizedString } from "../util/LocalizedString";
import { Omit } from "../util/Omit";

export type SelectOption<A> = Omit<
  ListItemProps,
  "trailingIcon" | "onPress" | "href" | "isFocused" | "ignoreTabIndex" | "size" | "isSelected"
> & {
  value: A;
};

export type BaseSingleProps = {
  isMulti?: false;
  clearable?: boolean;
};

export type BaseMultiProps = {
  isMulti: true;
  showMultiSelectBulkActions?: boolean;
  selectAllButtonLabel?: LocalizedString;
  clearAllButtonLabel?: LocalizedString;
  clearable?: never;
} & (
  | {
      multiSelectMode?: "summary";
      multiValueMessage?: (numberOfSelectedOptions: number) => LocalizedString;
    }
  | {
      multiSelectMode: "chips";
      multiValueMessage?: never;
    }
);

export type BaseSelectProps<A> = {
  menuSize?: ListSize;
  placeholder?: LocalizedString;
  options: Array<SelectOption<A>>;
  noOptionsMessage?: LocalizedString;
  isReadOnly?: boolean;
  searchable?: boolean;
  openMenuOnFocus?: boolean;
};
