import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconSpinner(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="M8 1.5A6.5 6.5 0 0 0 1.5 8 .75.75 0 1 1 0 8a8 8 0 1 1 8 8 .75.75 0 1 1 0-1.5 6.5 6.5 0 1 0 0-13Z" />
    </svg>
  );
}
