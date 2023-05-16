import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconChevronLeft(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="M15.53 18.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.749.749 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L8.56 12l6.97 6.97Z" />
    </svg>
  );
}
