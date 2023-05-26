import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconMinus(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="M21 12a.75.75 0 0 1-.75.75H3.75a.75.75 0 1 1 0-1.5h16.5A.75.75 0 0 1 21 12Z" />
    </svg>
  );
}
