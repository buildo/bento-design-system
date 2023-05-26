import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconWarningCircle(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="M12 2.25A9.75 9.75 0 1 0 21.75 12 9.76 9.76 0 0 0 12 2.25Zm0 18A8.25 8.25 0 1 1 20.25 12 8.26 8.26 0 0 1 12 20.25Zm-.75-7.5V7.5a.75.75 0 1 1 1.5 0v5.25a.75.75 0 1 1-1.5 0Zm1.875 3.375a1.125 1.125 0 1 1-2.25 0 1.125 1.125 0 0 1 2.25 0Z" />
    </svg>
  );
}
