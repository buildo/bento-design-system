import { IconProps } from "./IconProps";
import { svgIconProps } from "./svgIconProps";

export function IconPlaceholder(props: IconProps) {
  return (
    <svg {...svgIconProps(props)}>
      <path d="M19.5 3h-15A1.5 1.5 0 0 0 3 4.5v15A1.5 1.5 0 0 0 4.5 21h15a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 19.5 3Zm-15 16.5V5.56L18.44 19.5H4.5Zm1.06-15H19.5v13.94L5.56 4.5Z" />
    </svg>
  );
}
