import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconSearch(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...svgIconProps(props)}>
      <path d="m21.53 20.47-4.694-4.694a8.26 8.26 0 1 0-1.06 1.06l4.693 4.695a.75.75 0 0 0 1.062-1.062ZM3.75 10.5a6.75 6.75 0 1 1 6.75 6.75 6.758 6.758 0 0 1-6.75-6.75Z" />
    </svg>
  );
}
