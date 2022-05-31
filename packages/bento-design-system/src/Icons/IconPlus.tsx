import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconPlus(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 0a2 2 0 0 1 2 2v8h8a2 2 0 1 1 0 4h-8v8a2 2 0 1 1-4 0v-8H2a2 2 0 1 1 0-4h8V2a2 2 0 0 1 2-2Z"
      />
    </svg>
  );
}
