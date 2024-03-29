import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconNegative(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="M22.2 17.633 14.002 3.396a2.322 2.322 0 0 0-4.004 0L1.8 17.633a2.204 2.204 0 0 0 0 2.224A2.283 2.283 0 0 0 3.802 21h16.396a2.283 2.283 0 0 0 2-1.143 2.204 2.204 0 0 0 .002-2.224Zm-1.3 1.473a.797.797 0 0 1-.701.394H3.802a.797.797 0 0 1-.702-.394.711.711 0 0 1 0-.724L11.3 4.146a.82.82 0 0 1 1.406 0l8.199 14.238a.713.713 0 0 1-.004.723ZM11.25 13.5V9.75a.75.75 0 1 1 1.5 0v3.75a.75.75 0 1 1-1.5 0Zm1.875 3.375a1.125 1.125 0 1 1-2.25 0 1.125 1.125 0 0 1 2.25 0Z" />
    </svg>
  );
}
