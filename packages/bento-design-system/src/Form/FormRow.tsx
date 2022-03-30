import { Children } from "..";
import { Columns } from "../internal";
import { FormRowConfig } from "./Config";

type Props = {
  children: Children;
};

export function createFormRow(config: FormRowConfig) {
  return function FormRow({ children }: Props) {
    return <Columns space={config.rowSpacing} collapseBelow="tablet" children={children} />;
  };
}

export type { Props as FormRowProps };
