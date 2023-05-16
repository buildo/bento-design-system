import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconVerticalDots(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="M13.125 12a1.125 1.125 0 1 1-2.25 0 1.125 1.125 0 0 1 2.25 0ZM12 6.75a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Zm0 10.5a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z" />
    </svg>
  );
}
