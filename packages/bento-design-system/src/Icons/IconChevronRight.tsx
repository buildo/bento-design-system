import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconChevronRight(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="m17.03 12.53-7.5 7.5a.75.75 0 1 1-1.06-1.06L15.44 12 8.47 5.03a.75.75 0 1 1 1.06-1.06l7.5 7.5a.75.75 0 0 1 0 1.06Z" />
    </svg>
  );
}
