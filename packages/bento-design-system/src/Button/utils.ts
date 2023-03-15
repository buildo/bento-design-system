export type AllowedFormButtonKeys =
  | "name"
  | "value"
  | "form"
  | "formAction"
  | "formEncType"
  | "formMethod"
  | "formNoValidate"
  | "formTarget";

export type FormButtonProps = Pick<React.HTMLProps<HTMLButtonElement>, AllowedFormButtonKeys>;

type KeyType = string | number | symbol;

type Entry<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T];

function filterObject<T extends object>(
  obj: T,
  fn: (entry: Entry<T>, i: number, arr: Entry<T>[]) => boolean
) {
  return Object.fromEntries((Object.entries(obj) as Entry<T>[]).filter(fn)) as Partial<T>;
}

export function useFormButtonProps<T extends FormButtonProps>(rawProps: T) {
  const allowed: KeyType[] = [
    "name",
    "value",
    "form",
    "formAction",
    "formEncType",
    "formMethod",
    "formNoValidate",
    "formTarget",
  ];

  const formButtonProps = filterObject(rawProps, ([key]) =>
    allowed.includes(key)
  ) as FormButtonProps;

  return { formButtonProps };
}
