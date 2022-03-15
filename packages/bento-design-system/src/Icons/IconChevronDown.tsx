import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconChevronDown(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="M.699 5.556a2.14 2.14 0 0 0 0 3.029l9.858 9.858a2.14 2.14 0 0 0 3.028 0l9.859-9.858a2.14 2.14 0 1 0-3.029-3.029l-8.354 8.334-8.334-8.334a2.158 2.158 0 0 0-3.028 0Z" />
    </svg>
  );
}
