import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconWarningSolid(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="M12 2.25A9.75 9.75 0 1 0 21.75 12 9.76 9.76 0 0 0 12 2.25Zm-.75 5.25a.75.75 0 1 1 1.5 0v5.25a.75.75 0 1 1-1.5 0V7.5Zm.75 9.75A1.125 1.125 0 1 1 12 15a1.125 1.125 0 0 1 0 2.25Z" />
    </svg>
  );
}
