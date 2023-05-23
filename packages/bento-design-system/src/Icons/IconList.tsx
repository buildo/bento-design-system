import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconList(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="M21 12a.75.75 0 0 1-.75.75H3.75a.75.75 0 1 1 0-1.5h16.5A.75.75 0 0 1 21 12ZM3.75 6.75h16.5a.75.75 0 1 0 0-1.5H3.75a.75.75 0 0 0 0 1.5Zm16.5 10.5H3.75a.75.75 0 1 0 0 1.5h16.5a.75.75 0 1 0 0-1.5Z" />
    </svg>
  );
}
