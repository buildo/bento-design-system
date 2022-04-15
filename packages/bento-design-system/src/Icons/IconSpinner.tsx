import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconSpinner(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="M12 2.25A9.75 9.75 0 0 0 2.25 12 1.125 1.125 0 1 1 0 12a12 12 0 1 1 12 12 1.125 1.125 0 1 1 0-2.25 9.75 9.75 0 1 0 0-19.5Z" />
    </svg>
  );
}
