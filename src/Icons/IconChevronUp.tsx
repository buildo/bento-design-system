import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconChevronUp(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="M16.295 12.296a1.427 1.427 0 0 0 0-2.02L9.723 3.706a1.426 1.426 0 0 0-2.019 0l-6.572 6.572a1.428 1.428 0 0 0 2.019 2.019L8.72 6.74l5.555 5.556a1.439 1.439 0 0 0 2.02 0Z" />
    </svg>
  );
}
