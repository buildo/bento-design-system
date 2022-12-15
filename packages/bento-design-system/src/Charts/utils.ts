export type ValueType = number | string;
export type NameType = number | string;

export type ValueFormatter = (value: ValueType) => string;

export const defaultValueFormatter: ValueFormatter = (value: ValueType) => value.toString();
