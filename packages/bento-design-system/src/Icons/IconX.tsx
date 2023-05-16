import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconX(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="M20.277 18.22a.75.75 0 1 1-1.061 1.06l-6.22-6.22-6.219 6.22a.75.75 0 1 1-1.061-1.06l6.22-6.22-6.22-6.22a.75.75 0 1 1 1.061-1.06l6.22 6.22 6.219-6.22a.75.75 0 0 1 1.061 1.06L14.057 12l6.22 6.22Z" />
    </svg>
  );
}
