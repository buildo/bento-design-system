import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconNegativeSolid(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="M22.2 17.633 14.002 3.396a2.322 2.322 0 0 0-4.004 0L1.8 17.633a2.204 2.204 0 0 0 0 2.224A2.283 2.283 0 0 0 3.802 21h16.396a2.283 2.283 0 0 0 2-1.143 2.204 2.204 0 0 0 .002-2.224ZM11.25 9.75a.75.75 0 1 1 1.5 0v3.75a.75.75 0 1 1-1.5 0V9.75ZM12 18a1.125 1.125 0 1 1 0-2.25A1.125 1.125 0 0 1 12 18Z" />
    </svg>
  );
}
