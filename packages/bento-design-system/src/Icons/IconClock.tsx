import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconClock(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="M12 2.25A9.75 9.75 0 1 0 21.75 12 9.76 9.76 0 0 0 12 2.25Zm0 18A8.25 8.25 0 1 1 20.25 12 8.26 8.26 0 0 1 12 20.25ZM18 12a.75.75 0 0 1-.75.75H12a.75.75 0 0 1-.75-.75V6.75a.75.75 0 1 1 1.5 0v4.5h4.5A.75.75 0 0 1 18 12Z" />
    </svg>
  );
}
