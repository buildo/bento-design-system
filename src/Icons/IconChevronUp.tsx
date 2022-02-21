import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconChevronUp(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="M23.443 18.444a2.138 2.138 0 0 0 0-3.029l-9.858-9.858a2.14 2.14 0 0 0-3.029 0L.698 15.415a2.14 2.14 0 1 0 3.028 3.029l8.355-8.334 8.334 8.334a2.158 2.158 0 0 0 3.028 0Z" />
    </svg>
  );
}
