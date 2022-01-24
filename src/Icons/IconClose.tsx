import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconClose(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="M23.468.55a1.812 1.812 0 0 0-2.566 0L12 9.433 3.098.532A1.815 1.815 0 1 0 .532 3.098L9.433 12 .532 20.902a1.815 1.815 0 1 0 2.566 2.566L12 14.567l8.902 8.901a1.815 1.815 0 0 0 2.566-2.566L14.567 12l8.901-8.902a1.824 1.824 0 0 0 0-2.548Z" />
    </svg>
  );
}
