import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconChevronDown(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="m20.03 9.53-7.5 7.5a.748.748 0 0 1-1.06 0l-7.5-7.5a.75.75 0 1 1 1.06-1.06L12 15.44l6.97-6.97a.75.75 0 1 1 1.06 1.06Z" />
    </svg>
  );
}
