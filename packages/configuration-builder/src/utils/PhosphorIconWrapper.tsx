import { IconProps, svgIconProps } from "@buildo/bento-design-system";
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

export function phosphorToBento(Icon: PhosphorIcon) {
  return (props: IconProps) => {
    const { viewBox, ...svgProps } = svgIconProps(props);
    return <Icon width={undefined} height={undefined} {...svgProps} />;
  };
}
