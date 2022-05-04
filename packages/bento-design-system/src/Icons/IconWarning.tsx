import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconWarning(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 12a12 12 0 1 1-24 0 12 12 0 0 1 24 0Zm-10.5 6a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0ZM12 4.5A1.5 1.5 0 0 0 10.5 6v6a1.5 1.5 0 1 0 3 0V6A1.5 1.5 0 0 0 12 4.5Z"
      />
    </svg>
  );
}
