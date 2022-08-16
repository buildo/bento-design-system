import { Children, Columns } from "..";
import { useBentoConfig } from "../BentoConfigProvider";

type Props = {
  children: Children;
};

export function FormRow({ children }: Props) {
  const config = useBentoConfig().formLayout.row;
  return <Columns space={config.rowSpacing} collapseBelow="tablet" children={children} />;
}

export type { Props as FormRowProps };
