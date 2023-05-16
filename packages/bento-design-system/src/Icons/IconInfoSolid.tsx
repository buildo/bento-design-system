import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconInfoSolid(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="M12 2.25A9.75 9.75 0 1 0 21.75 12 9.76 9.76 0 0 0 12 2.25Zm-.375 4.5a1.125 1.125 0 1 1 0 2.25 1.125 1.125 0 0 1 0-2.25Zm1.125 10.5a1.5 1.5 0 0 1-1.5-1.5V12a.75.75 0 1 1 0-1.5 1.5 1.5 0 0 1 1.5 1.5v3.75a.75.75 0 1 1 0 1.5Z" />
    </svg>
  );
}
