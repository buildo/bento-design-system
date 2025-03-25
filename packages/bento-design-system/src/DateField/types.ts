import { LocalizedString } from "../util/ConfigurableTypes";

export type DateProps = {
  minDate?: Date;
  maxDate?: Date;
  shouldDisableDate?: (date: Date) => boolean;
  isReadOnly?: boolean;
  /** @deprecated Use `isReadOnly` instead. */
  readOnly?: boolean;
};

export type ShortcutProps<V> = {
  label: LocalizedString;
  value: V;
};
