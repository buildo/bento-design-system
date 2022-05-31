import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconInformative(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 12a12 12 0 1 1-24 0 12 12 0 0 1 24 0ZM13.5 6a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm-3 4.5a1.5 1.5 0 1 0 0 3V18a1.5 1.5 0 0 0 1.5 1.5h1.5a1.5 1.5 0 1 0 0-3V12a1.5 1.5 0 0 0-1.5-1.5h-1.5Z"
      />
    </svg>
  );
}
