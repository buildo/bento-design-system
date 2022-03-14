import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconMinus(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 12a2 2 0 0 1 2-2h20a2 2 0 1 1 0 4H2a2 2 0 0 1-2-2Z"
      />
    </svg>
  );
}
