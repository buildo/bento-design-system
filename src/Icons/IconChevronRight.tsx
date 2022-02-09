import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconChevronRight(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="M5.627 23.372a2.138 2.138 0 0 0 3.029 0l9.858-9.858a2.14 2.14 0 0 0 0-3.029L8.656.627a2.141 2.141 0 0 0-3.029 3.029l8.334 8.354-8.334 8.334a2.158 2.158 0 0 0 0 3.028Z" />
    </svg>
  );
}
