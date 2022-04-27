import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconHelp(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 12a12 12 0 1 1-24 0 12 12 0 0 1 24 0ZM12 7.5a1.5 1.5 0 0 0-1.3.75 1.5 1.5 0 1 1-2.597-1.5 4.5 4.5 0 1 1 5.397 6.495v.255a1.5 1.5 0 1 1-3 0V12a1.5 1.5 0 0 1 1.5-1.5 1.5 1.5 0 1 0 0-3Zm0 12a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
      />
    </svg>
  );
}
