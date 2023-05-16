import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconWarningCircle(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="M12.997 2.25a9.75 9.75 0 1 0 9.75 9.75 9.76 9.76 0 0 0-9.75-9.75Zm0 18a8.25 8.25 0 1 1 8.25-8.25 8.26 8.26 0 0 1-8.25 8.25Zm-.75-7.5V7.5a.75.75 0 1 1 1.5 0v5.25a.75.75 0 1 1-1.5 0Zm1.875 3.375a1.125 1.125 0 1 1-2.25 0 1.125 1.125 0 0 1 2.25 0Z" />
    </svg>
  );
}
