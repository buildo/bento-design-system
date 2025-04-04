import { LocalizedString } from "../util/ConfigurableTypes";

export type DateProps = {
  minDate?: Date;
  maxDate?: Date;
  shouldDisableDate?: (date: Date) => boolean;
  isReadOnly?: boolean;
  /** @deprecated Use `isReadOnly` instead. */
  readOnly?: boolean;
};

type ShortcutProps<V> = {
  label: LocalizedString;
  value: V;
};

export type SingleDateProps = {
  type?: "single";
  shortcuts?: ShortcutProps<Date | null>[];
};

export type RangeDateProps = {
  type: "range";
  shortcuts?: ShortcutProps<[Date, Date] | null>[];
};
