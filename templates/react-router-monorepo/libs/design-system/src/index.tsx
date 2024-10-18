import "@buildo/bento-design-system/index.css";
import "@buildo/bento-design-system/defaultTheme.css";
import { type Icon as PhosphorIcon } from "@phosphor-icons/react";
import { Children, IconProps, svgIconProps } from "@buildo/bento-design-system";

export * from "@buildo/bento-design-system";

export function phosphorToBento(Icon: PhosphorIcon): (props: IconProps) => Children {
  return (props: IconProps) => {
    const { viewBox, ...svgProps } = svgIconProps(props);
    // @ts-expect-error
    return <Icon width={undefined} height={undefined} {...svgProps} />;
  };
}
