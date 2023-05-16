import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconPlus(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="M21.997 12a.75.75 0 0 1-.75.75h-7.5v7.5a.75.75 0 1 1-1.5 0v-7.5h-7.5a.75.75 0 1 1 0-1.5h7.5v-7.5a.75.75 0 1 1 1.5 0v7.5h7.5a.75.75 0 0 1 .75.75Z" />
    </svg>
  );
}
