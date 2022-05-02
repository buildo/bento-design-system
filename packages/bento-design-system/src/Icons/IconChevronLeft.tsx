import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconChevronLeft(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="M18.515.628a2.14 2.14 0 0 0-3.029 0l-9.858 9.858a2.14 2.14 0 0 0 0 3.029l9.858 9.858a2.14 2.14 0 0 0 3.656-1.514 2.141 2.141 0 0 0-.627-1.515L10.18 11.99l8.334-8.334a2.158 2.158 0 0 0 0-3.028Z" />
    </svg>
  );
}
