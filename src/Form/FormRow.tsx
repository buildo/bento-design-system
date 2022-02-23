import { Children } from "..";
import { BentoSprinkles, Columns } from "../internal";

type Props = {
  children: Children;
};

export type FormRowConfig = {
  rowSpacing: BentoSprinkles["gap"];
};

export function createFormRow(config: FormRowConfig) {
  return function FormRow({ children }: Props) {
    return <Columns space={config.rowSpacing} collapseBelow="tablet" children={children} />;
  };
}
