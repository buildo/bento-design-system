import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconChevronUp(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="M20.03 15.53a.748.748 0 0 1-1.06 0L12 8.56l-6.97 6.97a.75.75 0 1 1-1.06-1.06l7.5-7.5a.749.749 0 0 1 1.06 0l7.5 7.5a.749.749 0 0 1 0 1.06Z" />
    </svg>
  );
}
