import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconX(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="M19.28 18.22a.75.75 0 1 1-1.06 1.06L12 13.06l-6.22 6.22a.75.75 0 1 1-1.06-1.06L10.94 12 4.72 5.78a.75.75 0 0 1 1.06-1.06L12 10.94l6.22-6.22a.75.75 0 1 1 1.06 1.06L13.06 12l6.22 6.22Z" />
    </svg>
  );
}
