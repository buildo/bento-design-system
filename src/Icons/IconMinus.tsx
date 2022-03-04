import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconMinus(props: IconProps) {
  return (
    <svg viewBox="0 0 24 18" {...svgIconProps(props)}>
      <path d="M22.286 13.43H1.714a1.714 1.714 0 0 1 0-3.43h20.572a1.714 1.714 0 0 1 0 3.43Z" />
    </svg>
  );
}
