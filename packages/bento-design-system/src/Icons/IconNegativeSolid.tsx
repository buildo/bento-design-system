import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconNegativeSolid(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="M23.197 17.633 14.998 3.396a2.322 2.322 0 0 0-4.003 0L2.796 17.633a2.204 2.204 0 0 0 0 2.224A2.283 2.283 0 0 0 4.798 21h16.397a2.283 2.283 0 0 0 2-1.143 2.205 2.205 0 0 0 .002-2.224ZM12.247 9.75a.75.75 0 1 1 1.5 0v3.75a.75.75 0 1 1-1.5 0V9.75Zm.75 8.25a1.125 1.125 0 1 1 0-2.25 1.125 1.125 0 0 1 0 2.25Z" />
    </svg>
  );
}
