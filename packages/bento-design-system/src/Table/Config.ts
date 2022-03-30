import { IconProps } from "../Icons";
import { IllustrationProps } from "../Illustrations";

export type TableConfig = {
  headerInfoIcon: (props: IconProps) => JSX.Element;
  emptyIllustration: (props: IllustrationProps) => JSX.Element;
};
