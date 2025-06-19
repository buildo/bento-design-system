import { LocalizedString, SelectField, SelectFieldProps } from "..";
import { SelectOption } from "./types";

type Props<A> = SelectFieldProps<A> & {
  loadOptions: (inputValue: string) => Promise<Array<SelectOption<A>>>;
  loadingMessage?: LocalizedString;
};

export type { Props as AsyncSelectFieldProps };

export function AsyncSelectField<A>(props: Props<A>) {
  return <SelectField {...props} />;
}
