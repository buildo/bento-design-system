import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconMenu(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="M15 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM15 21a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  );
}
