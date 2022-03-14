import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconPlaceholder(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24Z" />
    </svg>
  );
}
